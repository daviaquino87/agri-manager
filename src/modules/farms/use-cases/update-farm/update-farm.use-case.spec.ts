import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UpdateFarmUseCase } from './update-farm.use-case'
import { FarmRepository } from '../../repositories/farm.repository'
import { BadRequestException } from '@nestjs/common'
import { UpdateFarmDTO } from '../../dtos/update-farm.dto'
import { Prisma } from '@prisma/client'
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros'

describe('UpdateFarmUseCase', () => {
  let useCase: UpdateFarmUseCase
  let farmRepository: FarmRepository

  const mockFarm = {
    id: '1',
    name: 'Updated Farm',
    city: 'Updated City',
    state: 'Updated State',
    totalAreaInHectares: 200,
    agricultureAreaInHectares: 120,
    vegetationAreaInHectares: 80,
    producerId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(() => {
    farmRepository = {
      update: vi.fn(),
    } as any

    useCase = new UpdateFarmUseCase(farmRepository)
  })

  it('should be defined', () => {
    expect(useCase).toBeDefined()
  })

  it('should update a farm successfully', async () => {
    const updateFarmDto: UpdateFarmDTO = {
      name: 'Updated Farm',
      city: 'Updated City',
      state: 'Updated State',
      totalAreaInHectares: 200,
      agricultureAreaInHectares: 120,
      vegetationAreaInHectares: 80,
    }

    vi.spyOn(farmRepository, 'update').mockResolvedValue(mockFarm)

    const result = await useCase.execute({ id: '1', updateFarmDto })

    expect(result.farm).toEqual(mockFarm)
    expect(farmRepository.update).toHaveBeenCalledWith('1', updateFarmDto)
  })

  it('should throw BadRequestException when DTO validation fails', async () => {
    const updateFarmDto = {
      name: '',
      city: '',
      state: '',
      totalAreaInHectares: -1,
      agricultureAreaInHectares: -1,
      vegetationAreaInHectares: -1,
    }

    const result = await useCase.execute({ id: '1', updateFarmDto })

    expect(result).toEqual({ farm: undefined })
  })

  it('should throw BadRequestException when farm is not found', async () => {
    const updateFarmDto: UpdateFarmDTO = {
      name: 'Updated Farm',
      city: 'Updated City',
      state: 'Updated State',
      totalAreaInHectares: 200,
      agricultureAreaInHectares: 120,
      vegetationAreaInHectares: 80,
    }

    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.RECORD_NOT_FOUND,
      clientVersion: '',
    })

    vi.spyOn(farmRepository, 'update').mockRejectedValue(prismaError)

    await expect(useCase.execute({ id: '1', updateFarmDto })).rejects.toThrow(
      BadRequestException,
    )
  })

  it('should throw BadRequestException for other errors', async () => {
    const updateFarmDto: UpdateFarmDTO = {
      name: 'Updated Farm',
      city: 'Updated City',
      state: 'Updated State',
      totalAreaInHectares: 200,
      agricultureAreaInHectares: 120,
      vegetationAreaInHectares: 80,
    }

    vi.spyOn(farmRepository, 'update').mockRejectedValue(new Error())

    await expect(useCase.execute({ id: '1', updateFarmDto })).rejects.toThrow(
      BadRequestException,
    )
  })
}) 