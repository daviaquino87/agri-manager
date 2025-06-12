import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetProducerByIdUseCase } from './get-producer-by-id.usecase';
import { ProducerRepository } from '../../repositories/producer.repository';
import { NotFoundException } from '@nestjs/common';

describe('GetProducerByIdUseCase', () => {
  let useCase: GetProducerByIdUseCase;
  let producerRepository: ProducerRepository;

  beforeEach(() => {
    producerRepository = {
      findById: vi.fn(),
    } as any;

    useCase = new GetProducerByIdUseCase(producerRepository);
  });

  it('should find a producer by id successfully', async () => {
    const mockProducer = {
      id: '123',
      name: 'John Doe',
      document: '12345678900',
    };

    vi.spyOn(producerRepository, 'findById').mockResolvedValue(mockProducer);

    const result = await useCase.execute({ id: '123' });

    expect(result).toEqual({ producer: mockProducer });
    expect(producerRepository.findById).toHaveBeenCalledWith('123');
  });

  it('should throw NotFoundException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw NotFoundException when producer is not found', async () => {
    vi.spyOn(producerRepository, 'findById').mockResolvedValue(null);

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(
      NotFoundException,
    );
  });
});
