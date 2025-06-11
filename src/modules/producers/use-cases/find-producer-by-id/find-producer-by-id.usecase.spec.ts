import { describe, it, expect, beforeEach, vi } from 'vitest'
import { FindProducerByIdUseCase } from './find-producer-by-id.usecase'
import { ProducerRepository } from '../../repositories/producer.repository'
import { NotFoundException } from '@nestjs/common'

describe('FindProducerByIdUseCase', () => {
  let useCase: FindProducerByIdUseCase
  let producerRepository: ProducerRepository

  beforeEach(() => {
    producerRepository = {
      findById: vi.fn(),
    } as any

    useCase = new FindProducerByIdUseCase(producerRepository)
  })

  it('should find a producer by id successfully', async () => {
    const mockProducer = {
      id: '123',
      name: 'John Doe',
      document: '12345678900',
    }

    vi.spyOn(producerRepository, 'findById').mockResolvedValue(mockProducer)

    const result = await useCase.execute({ id: '123' })

    expect(result).toEqual(mockProducer)
    expect(producerRepository.findById).toHaveBeenCalledWith('123')
  })

  it('should throw NotFoundException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(NotFoundException)
  })

  it('should throw NotFoundException when producer is not found', async () => {
    vi.spyOn(producerRepository, 'findById').mockResolvedValue(null)

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(NotFoundException)
  })
}) 