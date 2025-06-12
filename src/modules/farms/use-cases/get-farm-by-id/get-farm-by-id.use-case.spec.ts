import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GetFarmByIdUseCase } from './get-farm-by-id.use-case'
import { FarmRepository } from '../../repositories/farm.repository'
import { BadRequestException } from '@nestjs/common'
import { IFarm } from '../../entities/farm.entity'

describe('GetFarmByIdUseCase', () => {
  let useCase: GetFarmByIdUseCase
  let farmRepository: FarmRepository

  const mockFarm: IFarm = {
    id: '1',
    name: 'Test Farm',
    city: 'Test City',
    state: 'Test State',
    totalAreaInHectares: 100,
    agricultureAreaInHectares: 60,
    vegetationAreaInHectares: 40,
    producerId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(() => {
    farmRepository = {
      findById: vi.fn(),
    } as any

    useCase = new GetFarmByIdUseCase(farmRepository)
  })

  it('should be defined', () => {
    expect(useCase).toBeDefined()
  })

  it('should get a farm by id successfully', async () => {
    vi.spyOn(farmRepository, 'findById').mockResolvedValue(mockFarm)

    const result = await useCase.execute({ id: '1' })

    expect(result.farm).toEqual(mockFarm)
    expect(farmRepository.findById).toHaveBeenCalledWith('1')
  })

  it('should throw BadRequestException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(
      BadRequestException,
    )
    expect(farmRepository.findById).not.toHaveBeenCalled()
  })

  it('should throw BadRequestException when farm is not found', async () => {
    vi.spyOn(farmRepository, 'findById').mockResolvedValue(null)

    await expect(useCase.execute({ id: '1' })).rejects.toThrow(
      BadRequestException,
    )
    expect(farmRepository.findById).toHaveBeenCalledWith('1')
  })
}) 