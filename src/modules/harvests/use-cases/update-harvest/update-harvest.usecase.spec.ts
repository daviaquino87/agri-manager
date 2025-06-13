import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UpdateHarvestUseCase } from './update-harvest.usecase'
import { HarvestRepository } from '../../repositories/harvest.repository'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros'

describe('UpdateHarvestUseCase', () => {
  let useCase: UpdateHarvestUseCase
  let harvestRepository: HarvestRepository

  beforeEach(() => {
    harvestRepository = {
      update: vi.fn(),
    } as any

    useCase = new UpdateHarvestUseCase(harvestRepository)
  })

  it('should update a harvest successfully', async () => {
    const mockHarvest = {
      id: '123',
      year: 2024,
    }

    const updateHarvestDto = {
      year: 2024,
    }

    vi.spyOn(harvestRepository, 'update').mockResolvedValue(mockHarvest)

    const result = await useCase.execute({ id: '123', updateHarvestDto })

    expect(result.harvest).toEqual(mockHarvest)
    expect(harvestRepository.update).toHaveBeenCalledWith('123', updateHarvestDto)
  })

  it('should throw BadRequestException when id is not provided', async () => {
    const updateHarvestDto = {
      year: 2024,
    }

    await expect(useCase.execute({ id: '', updateHarvestDto })).rejects.toThrow(
      BadRequestException,
    )
  })

  it('should throw NotFoundException when harvest is not found', async () => {
    const updateHarvestDto = {
      year: 2024,
    }

    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.RECORD_NOT_FOUND,
      clientVersion: '',
    })

    vi.spyOn(harvestRepository, 'update').mockRejectedValue(prismaError)

    await expect(useCase.execute({ id: '123', updateHarvestDto })).rejects.toThrow(
      NotFoundException,
    )
  })

  it('should throw BadRequestException for other errors', async () => {
    const updateHarvestDto = {
      year: 2024,
    }

    vi.spyOn(harvestRepository, 'update').mockRejectedValue(new Error())

    await expect(useCase.execute({ id: '123', updateHarvestDto })).rejects.toThrow(
      BadRequestException,
    )
  })
}) 