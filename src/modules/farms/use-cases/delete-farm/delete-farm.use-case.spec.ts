import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeleteFarmUseCase } from '@/modules/farms/use-cases/delete-farm/delete-farm.use-case';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

describe('DeleteFarmUseCase', () => {
  let useCase: DeleteFarmUseCase;
  let farmRepository: FarmRepository;

  beforeEach(() => {
    farmRepository = {
      delete: vi.fn(),
    } as any;

    useCase = new DeleteFarmUseCase(farmRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a farm successfully', async () => {
    vi.spyOn(farmRepository, 'delete').mockResolvedValue();

    await useCase.execute({ id: '1' });

    expect(farmRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should throw BadRequestException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(
      BadRequestException,
    );
    expect(farmRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException when farm is not found', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.RECORD_NOT_FOUND,
      clientVersion: '',
    });

    vi.spyOn(farmRepository, 'delete').mockRejectedValue(prismaError);

    await expect(useCase.execute({ id: '1' })).rejects.toThrow(
      NotFoundException,
    );
    expect(farmRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should throw BadRequestException for other errors', async () => {
    vi.spyOn(farmRepository, 'delete').mockRejectedValue(new Error());

    await expect(useCase.execute({ id: '1' })).rejects.toThrow(
      BadRequestException,
    );
    expect(farmRepository.delete).toHaveBeenCalledWith('1');
  });
});
