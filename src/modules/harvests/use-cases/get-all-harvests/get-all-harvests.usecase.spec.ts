import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GetAllHarvestsUseCase } from './get-all-harvests.usecase'
import { HarvestRepository } from '../../repositories/harvest.repository'
import { BadRequestException } from '@nestjs/common'
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto'
import { IHarvest } from '../../entities/harvest.entity'
import * as validateDtoModule from '@/common/utils/validateDto'

describe('GetAllHarvestsUseCase', () => {
  let useCase: GetAllHarvestsUseCase
  let harvestRepository: HarvestRepository

  beforeEach(() => {
    harvestRepository = {
      findAll: vi.fn(),
    } as any

    useCase = new GetAllHarvestsUseCase(harvestRepository)
  })

  it('should get all harvests successfully', async () => {
    const mockPaginatedData: PaginatedOutputDTO<IHarvest> = {
      data: [
        {
          id: '123',
          year: 2024,
        },
        {
          id: '456',
          year: 2023,
        },
      ],
      meta: {
        total: 2,
        lastPage: 1,
        currentPage: 1,
        perPage: 10,
        prev: null,
        next: null,
      },
    }

    const getHarvestsParamsDto = {
      page: 1,
      perPage: 10,
    }

    vi.spyOn(harvestRepository, 'findAll').mockResolvedValue(mockPaginatedData)

    const result = await useCase.execute({ getHarvestsParamsDto })

    expect(result.data).toEqual(mockPaginatedData)
    expect(harvestRepository.findAll).toHaveBeenCalledWith(getHarvestsParamsDto)
  })

  it('should throw BadRequestException when DTO validation fails', async () => {
    const getHarvestsParamsDto = {
      page: -1,
      perPage: 0,
    }

    vi.spyOn(validateDtoModule, 'validateDTO').mockResolvedValue({ dtoValidated: null, error: 'validation error' })

    await expect(useCase.execute({ getHarvestsParamsDto })).rejects.toThrow(
      BadRequestException,
    )
  })

  it('should throw BadRequestException for other errors', async () => {
    const getHarvestsParamsDto = {
      page: 1,
      perPage: 10,
    }

    vi.spyOn(harvestRepository, 'findAll').mockRejectedValue(new Error())

    await expect(useCase.execute({ getHarvestsParamsDto })).rejects.toThrow(
      BadRequestException,
    )
  })
}) 