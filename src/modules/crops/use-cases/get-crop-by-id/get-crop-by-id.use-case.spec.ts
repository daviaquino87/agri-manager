import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GetCropByIdUseCase } from './get-crop-by-id.use-case'
import { CropRepository } from '../../repositories/crop.repository'
import { BadRequestException, NotFoundException } from '@nestjs/common'

describe('GetCropByIdUseCase', () => {
  let useCase: GetCropByIdUseCase
  let cropRepository: CropRepository

  beforeEach(() => {
    cropRepository = {
      findById: vi.fn(),
    } as any

    useCase = new GetCropByIdUseCase(cropRepository)
    vi.clearAllMocks()
  })

  it('should get a crop by id successfully', async () => {
    const mockCrop = {
      id: '123',
      name: 'Corn',
    }

    vi.spyOn(cropRepository, 'findById').mockResolvedValue(mockCrop)

    const result = await useCase.execute({ id: '123' })

    expect(result.crop).toEqual(mockCrop)
    expect(cropRepository.findById).toHaveBeenCalledWith('123')
  })

  it('should throw BadRequestException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(
      BadRequestException,
    )
    expect(cropRepository.findById).not.toHaveBeenCalled()
  })

  it('should throw NotFoundException when crop is not found', async () => {
    vi.spyOn(cropRepository, 'findById').mockResolvedValue(null)

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(
      NotFoundException,
    )
    expect(cropRepository.findById).toHaveBeenCalledWith('123')
  })

  it('should propagate repository errors', async () => {
    const error = new Error('Repository error')
    vi.spyOn(cropRepository, 'findById').mockRejectedValue(error)

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(error)
    expect(cropRepository.findById).toHaveBeenCalledWith('123')
  })
}) 