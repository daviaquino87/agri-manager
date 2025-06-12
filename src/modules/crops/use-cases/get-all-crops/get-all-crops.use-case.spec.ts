import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GetAllCropsUseCase } from './get-all-crops.use-case'
import { CropRepository } from '../../repositories/crop.repository'
import { BadRequestException } from '@nestjs/common'
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto'
import { ICrop } from '../../entities/crop.entity'
import { validateDTO } from '@/common/utils/validateDto'

vi.mock('@/common/utils/validateDto', () => ({
  validateDTO: vi.fn(),
}))

describe('GetAllCropsUseCase', () => {
  let useCase: GetAllCropsUseCase
  let cropRepository: CropRepository

  beforeEach(() => {
    cropRepository = {
      findAll: vi.fn(),
    } as any

    useCase = new GetAllCropsUseCase(cropRepository)
    vi.clearAllMocks()
  })

  it('should get all crops successfully', async () => {
    const mockPaginatedData: PaginatedOutputDTO<ICrop> = {
      data: [
        { id: '1', name: 'Corn' },
        { id: '2', name: 'Soybeans' },
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

    const getCropsParamsDto = {
      page: 1,
      perPage: 10,
    }

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: getCropsParamsDto,
      error: null,
    })

    vi.spyOn(cropRepository, 'findAll').mockResolvedValue(mockPaginatedData)

    const result = await useCase.execute({ getCropsParamsDto })

    expect(result.data).toEqual(mockPaginatedData)
    expect(cropRepository.findAll).toHaveBeenCalledWith({
      page: getCropsParamsDto.page,
      perPage: getCropsParamsDto.perPage,
    })
  })

  it('should throw BadRequestException when DTO validation fails', async () => {
    const getCropsParamsDto = {
      page: -1,
      perPage: 0,
    }

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: null,
      error: 'Invalid pagination parameters',
    })

    await expect(useCase.execute({ getCropsParamsDto })).rejects.toThrow(
      BadRequestException,
    )
    expect(cropRepository.findAll).not.toHaveBeenCalled()
  })

  it('should propagate repository errors', async () => {
    const getCropsParamsDto = {
      page: 1,
      perPage: 10,
    }

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: getCropsParamsDto,
      error: null,
    })

    const error = new Error('Repository error')
    vi.spyOn(cropRepository, 'findAll').mockRejectedValue(error)

    await expect(useCase.execute({ getCropsParamsDto })).rejects.toThrow(error)
    expect(cropRepository.findAll).toHaveBeenCalledWith({
      page: getCropsParamsDto.page,
      perPage: getCropsParamsDto.perPage,
    })
  })
}) 