import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UpdateCropUseCase } from './update-crop.use-case'
import { CropRepository } from '../../repositories/crop.repository'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { validateDTO } from '@/common/utils/validateDto'

vi.mock('@/common/utils/validateDto', () => ({
  validateDTO: vi.fn(),
}))

describe('UpdateCropUseCase', () => {
  let useCase: UpdateCropUseCase
  let cropRepository: CropRepository

  beforeEach(() => {
    cropRepository = {
      findById: vi.fn(),
      update: vi.fn(),
    } as any

    useCase = new UpdateCropUseCase(cropRepository)
    vi.clearAllMocks()
  })

  it('should update a crop successfully', async () => {
    const mockCrop = {
      id: '123',
      name: 'Updated Corn',
    }

    const updateCropDto = {
      name: 'Updated Corn',
    }

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: updateCropDto,
      error: null,
    })

    vi.spyOn(cropRepository, 'findById').mockResolvedValue({ id: '123', name: 'Corn' })
    vi.spyOn(cropRepository, 'update').mockResolvedValue(mockCrop)

    const result = await useCase.execute({ id: '123', updateCropDto })

    expect(result.crop).toEqual(mockCrop)
    expect(cropRepository.update).toHaveBeenCalledWith('123', updateCropDto)
  })

  it('should throw BadRequestException when DTO validation fails', async () => {
    const updateCropDto = {
      name: '',
    }

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: null,
      error: 'Name is required',
    })

    await expect(useCase.execute({ id: '123', updateCropDto })).rejects.toThrow(
      BadRequestException,
    )
    expect(cropRepository.findById).not.toHaveBeenCalled()
    expect(cropRepository.update).not.toHaveBeenCalled()
  })

  it('should throw NotFoundException when crop is not found', async () => {
    const updateCropDto = {
      name: 'Updated Corn',
    }

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: updateCropDto,
      error: null,
    })

    vi.spyOn(cropRepository, 'findById').mockResolvedValue(null)

    await expect(useCase.execute({ id: '123', updateCropDto })).rejects.toThrow(
      NotFoundException,
    )
    expect(cropRepository.findById).toHaveBeenCalledWith('123')
    expect(cropRepository.update).not.toHaveBeenCalled()
  })

  it('should propagate repository errors', async () => {
    const updateCropDto = {
      name: 'Updated Corn',
    }

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: updateCropDto,
      error: null,
    })

    vi.spyOn(cropRepository, 'findById').mockResolvedValue({ id: '123', name: 'Corn' })
    const error = new Error('Repository error')
    vi.spyOn(cropRepository, 'update').mockRejectedValue(error)

    await expect(useCase.execute({ id: '123', updateCropDto })).rejects.toThrow(error)
    expect(cropRepository.findById).toHaveBeenCalledWith('123')
    expect(cropRepository.update).toHaveBeenCalledWith('123', updateCropDto)
  })
}) 