import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GetAllProducersUseCase } from './get-all-producers.usecase'
import { ProducerRepository } from '../../repositories/producer.repository'
import { BadRequestException } from '@nestjs/common'
import { GetProducersParamsDTO } from '../../dtos/get-producers-params.dto'
import { validateDTO } from '@/common/utils/validateDto'

vi.mock('@/common/utils/validateDto', () => ({
  validateDTO: vi.fn(),
}))

describe('GetAllProducersUseCase', () => {
  let useCase: GetAllProducersUseCase
  let producerRepository: ProducerRepository

  beforeEach(() => {
    producerRepository = {
      findAll: vi.fn(),
    } as any

    useCase = new GetAllProducersUseCase(producerRepository)
  })

  it('should get all producers successfully', async () => {
    const mockProducers = {
      data: [
        {
          id: '1',
          name: 'John Doe',
          document: '123.456.789-09',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      meta: {
        total: 1,
        page: 1,
        perPage: 10,
      },
    }

    const getProducersParamsDto = new GetProducersParamsDTO()
    getProducersParamsDto.page = 1
    getProducersParamsDto.perPage = 10

    vi.mocked(validateDTO).mockResolvedValueOnce({
      dtoValidated: getProducersParamsDto,
      error: undefined,
    })

    producerRepository.findAll = vi.fn().mockResolvedValueOnce(mockProducers)

    const result = await useCase.execute({ getProducersParamsDto })

    expect(result).toEqual({ producers: mockProducers })
    expect(producerRepository.findAll).toHaveBeenCalledWith(getProducersParamsDto)
  })

  it('should throw BadRequestException when DTO validation fails', async () => {
    const getProducersParamsDto = new GetProducersParamsDTO()
    getProducersParamsDto.page = -1 // Invalid page number
    getProducersParamsDto.perPage = 10

    vi.mocked(validateDTO).mockResolvedValueOnce({
      dtoValidated: null,
      error: 'Invalid page number',
    })

    await expect(
      useCase.execute({ getProducersParamsDto }),
    ).rejects.toThrow(BadRequestException)
  })
}) 