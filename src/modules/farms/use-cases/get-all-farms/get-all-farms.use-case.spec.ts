import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GetAllFarmsUseCase } from './get-all-farms.use-case'
import { FarmRepository } from '../../repositories/farm.repository'
import { BadRequestException } from '@nestjs/common'
import { GetFarmsParamsDTO } from '../../dtos/get-farms-params.dto'
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto'
import { IFarm } from '../../entities/farm.entity'

describe('GetAllFarmsUseCase', () => {
  let useCase: GetAllFarmsUseCase
  let farmRepository: FarmRepository

  const mockFarms: IFarm[] = [
    {
      id: '1',
      name: 'Farm 1',
      city: 'City 1',
      state: 'State 1',
      totalAreaInHectares: 100,
      agricultureAreaInHectares: 60,
      vegetationAreaInHectares: 40,
      producerId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Farm 2',
      city: 'City 2',
      state: 'State 2',
      totalAreaInHectares: 200,
      agricultureAreaInHectares: 120,
      vegetationAreaInHectares: 80,
      producerId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const mockPaginatedOutput: PaginatedOutputDTO<IFarm> = {
    data: mockFarms,
    meta: {
      total: 2,
      currentPage: 1,
      perPage: 10,
      lastPage: 1,
      prev: null,
      next: null,
    },
  }

  beforeEach(() => {
    farmRepository = {
      findAll: vi.fn(),
    } as any

    useCase = new GetAllFarmsUseCase(farmRepository)
  })

  it('should be defined', () => {
    expect(useCase).toBeDefined()
  })

  it('should get all farms successfully', async () => {
    const getAllFarmsParams: GetFarmsParamsDTO = {
      page: 1,
      perPage: 10,
    }

    vi.spyOn(farmRepository, 'findAll').mockResolvedValue(mockPaginatedOutput)

    const result = await useCase.execute({ getAllFarmsParams })

    expect(result.data).toEqual(mockPaginatedOutput)
    expect(farmRepository.findAll).toHaveBeenCalledWith({
      page: getAllFarmsParams.page,
      perPage: getAllFarmsParams.perPage,
    })
  })

  it('should throw BadRequestException when DTO validation fails', async () => {
    const getAllFarmsParams = {
      page: -1,
      perPage: 10,
    }

    const result = await useCase.execute({ getAllFarmsParams })

    expect(result).toEqual({ data: undefined })
  })
}) 