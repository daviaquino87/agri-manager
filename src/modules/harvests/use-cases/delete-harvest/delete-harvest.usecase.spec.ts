import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeleteHarvestUseCase } from '@/modules/harvests/use-cases/delete-harvest/delete-harvest.usecase';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

describe('DeleteHarvestUseCase', () => {
  let useCase: DeleteHarvestUseCase;
  let harvestRepository: HarvestRepository;

  beforeEach(() => {
    harvestRepository = {
      delete: vi.fn(),
    } as any;

    useCase = new DeleteHarvestUseCase(harvestRepository);
  });

  it('should delete a harvest successfully', async () => {
    vi.spyOn(harvestRepository, 'delete').mockResolvedValue(undefined);

    await useCase.execute({ id: '123' });

    expect(harvestRepository.delete).toHaveBeenCalledWith('123');
  });

  it('should throw BadRequestException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException when harvest is not found', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.RECORD_NOT_FOUND,
      clientVersion: '',
    });

    vi.spyOn(harvestRepository, 'delete').mockRejectedValue(prismaError);

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException for other errors', async () => {
    vi.spyOn(harvestRepository, 'delete').mockRejectedValue(new Error());

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(
      BadRequestException,
    );
  });
});
