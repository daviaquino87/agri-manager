import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UpdateProducerUseCase } from './update-producer.usecase'
import { ProducerRepository } from '../../repositories/producer.repository'
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros'

describe('UpdateProducerUseCase', () => {
  let useCase: UpdateProducerUseCase
  let producerRepository: ProducerRepository

  beforeEach(() => {
    producerRepository = {
      update: vi.fn(),
    } as any

    useCase = new UpdateProducerUseCase(producerRepository)
  })

  it('should update a producer successfully', async () => {
    const mockProducer = {
      id: '123',
      name: 'John Doe Updated',
      document: '123.456.789-09',
    }

    const updateProducerDto = {
      name: 'John Doe Updated',
      document: '123.456.789-09',
    }

    vi.spyOn(producerRepository, 'update').mockResolvedValue(mockProducer)

    const result = await useCase.execute({
      id: '123',
      updateProducerDto,
    })

    expect(result.producer).toEqual(mockProducer)
    expect(producerRepository.update).toHaveBeenCalledWith('123', updateProducerDto)
  })

  it('should throw BadRequestException when DTO validation fails', async () => {
    const updateProducerDto = {
      name: '',
      document: '',
    }

    await expect(
      useCase.execute({
        id: '123',
        updateProducerDto,
      }),
    ).rejects.toThrow(BadRequestException)
  })

  it('should throw ConflictException when document already exists', async () => {
    const updateProducerDto = {
      name: 'John Doe',
      document: '123.456.789-09',
    }

    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.UNIQUE_CONSTRAINT_FAILED,
      clientVersion: '',
    })

    vi.spyOn(producerRepository, 'update').mockRejectedValue(prismaError)

    await expect(
      useCase.execute({
        id: '123',
        updateProducerDto,
      }),
    ).rejects.toThrow(ConflictException)
  })

  it('should throw NotFoundException when producer is not found', async () => {
    const updateProducerDto = {
      name: 'John Doe',
      document: '123.456.789-09',
    }

    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.RECORD_NOT_FOUND,
      clientVersion: '',
    })

    vi.spyOn(producerRepository, 'update').mockRejectedValue(prismaError)

    await expect(
      useCase.execute({
        id: '123',
        updateProducerDto,
      }),
    ).rejects.toThrow(NotFoundException)
  })

  it('should throw BadRequestException for other errors', async () => {
    const updateProducerDto = {
      name: 'John Doe',
      document: '123.456.789-09',
    }

    vi.spyOn(producerRepository, 'update').mockRejectedValue(new Error())

    await expect(
      useCase.execute({
        id: '123',
        updateProducerDto,
      }),
    ).rejects.toThrow(BadRequestException)
  })
}) 