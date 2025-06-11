import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CreateProducerUseCase } from './create-producer.usecase'
import { ProducerRepository } from '../../repositories/producer.repository'
import { BadRequestException, ConflictException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros'

describe('CreateProducerUseCase', () => {
  let useCase: CreateProducerUseCase
  let producerRepository: ProducerRepository

  beforeEach(() => {
    producerRepository = {
      create: vi.fn(),
    } as any

    useCase = new CreateProducerUseCase(producerRepository)
  })

  it('should create a producer successfully', async () => {
    const mockProducer = {
      id: '123',
      name: 'John Doe',
      document: '478.754.083-18',
    }

    const createProducerDto = {
      name: 'John Doe',
      document: '478.754.083-18',
    }

    vi.spyOn(producerRepository, 'create').mockResolvedValue(mockProducer)

    const result = await useCase.execute({ createProducerDto })

    expect(result.producer).toEqual(mockProducer)
    expect(producerRepository.create).toHaveBeenCalledWith({
      id: expect.any(String),
      name: createProducerDto.name,
      document: createProducerDto.document,
    })
  })

  it('should throw BadRequestException when DTO validation fails', async () => {
    const createProducerDto = {
      name: '',
      document: '',
    }

    await expect(useCase.execute({ createProducerDto })).rejects.toThrow(
      BadRequestException,
    )
  })

  it('should throw ConflictException when document already exists', async () => {
    const createProducerDto = {
      name: 'John Doe',
      document: '123.456.789-09',
    }

    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.UNIQUE_CONSTRAINT_FAILED,
      clientVersion: '',
    })

    vi.spyOn(producerRepository, 'create').mockRejectedValue(prismaError)

    await expect(useCase.execute({ createProducerDto })).rejects.toThrow(
      ConflictException,
    )
  })

  it('should throw BadRequestException for other errors', async () => {
    const createProducerDto = {
      name: 'John Doe',
      document: '123.456.789-09',
    }

    vi.spyOn(producerRepository, 'create').mockRejectedValue(new Error())

    await expect(useCase.execute({ createProducerDto })).rejects.toThrow(
      BadRequestException,
    )
  })
}) 