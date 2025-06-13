import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeleteProducerUseCase } from '@/modules/producers/use-cases/delete-producer/delete-producer.usecase';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

describe('DeleteProducerUseCase', () => {
  let useCase: DeleteProducerUseCase;
  let producerRepository: ProducerRepository;

  beforeEach(() => {
    producerRepository = {
      delete: vi.fn(),
    } as any;

    useCase = new DeleteProducerUseCase(producerRepository);
  });

  it('should delete a producer successfully', async () => {
    vi.spyOn(producerRepository, 'delete').mockResolvedValue(undefined);

    await useCase.execute({ id: '123' });

    expect(producerRepository.delete).toHaveBeenCalledWith('123');
  });

  it('should throw NotFoundException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw NotFoundException when producer is not found', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.RECORD_NOT_FOUND,
      clientVersion: '',
    });

    vi.spyOn(producerRepository, 'delete').mockRejectedValue(prismaError);

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw the original error for other errors', async () => {
    const error = new Error('Database error');
    vi.spyOn(producerRepository, 'delete').mockRejectedValue(error);

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(
      BadRequestException,
    );
  });
});
