import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeleteFarmCultureUseCase } from '@/modules/farms-cultures/use-cases/delete-farm-culture/delete-farm-culture.usecase';
import { FarmCultureRepository } from '@/modules/farms-cultures/repositories/farm-culture.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '@prisma/client';

describe('DeleteFarmCultureUseCase', () => {
  let useCase: DeleteFarmCultureUseCase;
  let farmCultureRepository: FarmCultureRepository;

  beforeEach(() => {
    farmCultureRepository = {
      create: vi.fn(),
      update: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      delete: vi.fn(),
    } as any;

    useCase = new DeleteFarmCultureUseCase(farmCultureRepository);
  });

  it('should delete a farm culture successfully', async () => {
    const id = randomUUID();

    vi.mocked(farmCultureRepository.delete).mockResolvedValue();

    await useCase.execute({ id });

    expect(farmCultureRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw BadRequestException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(
      BadRequestException,
    );
    expect(farmCultureRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException when farm culture is not found', async () => {
    const id = randomUUID();

    vi.mocked(farmCultureRepository.delete).mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Record not found', {
        code: 'P2025',
        clientVersion: '1.0.0',
      }),
    );

    await expect(useCase.execute({ id })).rejects.toThrow(NotFoundException);
    expect(farmCultureRepository.delete).toHaveBeenCalledWith(id);
  });
});
