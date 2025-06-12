import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeleteCropUseCase } from './delete-crop.use-case';
import { CropRepository } from '../../repositories/crop.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

describe('DeleteCropUseCase', () => {
  let useCase: DeleteCropUseCase;
  let cropRepository: CropRepository;

  beforeEach(() => {
    cropRepository = {
      delete: vi.fn(),
    } as any;

    useCase = new DeleteCropUseCase(cropRepository);
    vi.clearAllMocks();
  });

  it('should delete a crop successfully', async () => {
    vi.spyOn(cropRepository, 'delete').mockResolvedValue(undefined);

    await useCase.execute({ id: '123' });

    expect(cropRepository.delete).toHaveBeenCalledWith('123');
  });

  it('should throw NotFoundException when crop is not found', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.RECORD_NOT_FOUND,
      clientVersion: '',
    });

    vi.spyOn(cropRepository, 'delete').mockRejectedValue(prismaError);

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(
      new NotFoundException(
        'erro ao deletar plantação: Plantação nao encontrada',
      ),
    );
    expect(cropRepository.delete).toHaveBeenCalledWith('123');
  });

  it('should throw BadRequestException for other Prisma errors', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: 'P2002',
      clientVersion: '',
    });

    vi.spyOn(cropRepository, 'delete').mockRejectedValue(prismaError);

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(
      new BadRequestException(
        'erro ao deletar plantação: Erro ao deletar plantação',
      ),
    );
    expect(cropRepository.delete).toHaveBeenCalledWith('123');
  });
});
