import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetAllFarmsCulturesUseCase } from './get-all-farms-cultures.usecase';
import { FarmCultureRepository } from '../../repositories/farm-culture.repository';
import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

describe('GetAllFarmsCulturesUseCase', () => {
  let useCase: GetAllFarmsCulturesUseCase;
  let farmCultureRepository: FarmCultureRepository;

  beforeEach(() => {
    farmCultureRepository = {
      create: vi.fn(),
      update: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      delete: vi.fn(),
    } as any;

    useCase = new GetAllFarmsCulturesUseCase(farmCultureRepository);
  });

  it('should get all farm cultures successfully', async () => {
    const page = 1;
    const perPage = 10;

    const getAllFarmsCulturesDto = {
      page,
      perPage,
    };

    const mockFarmCultures = {
      data: [
        {
          id: randomUUID(),
          farmId: randomUUID(),
          cropId: randomUUID(),
          harvestId: randomUUID(),
          createdAt: new Date(),
        },
        {
          id: randomUUID(),
          farmId: randomUUID(),
          cropId: randomUUID(),
          harvestId: randomUUID(),
          createdAt: new Date(),
        },
      ],
      meta: {
        total: 2,
        lastPage: 1,
        currentPage: page,
        perPage,
        prev: null,
        next: null,
      },
    };

    vi.mocked(farmCultureRepository.findAll).mockResolvedValue(
      mockFarmCultures,
    );

    const result = await useCase.execute({ getAllFarmsCulturesDto });

    expect(result.data).toEqual(mockFarmCultures);
    expect(farmCultureRepository.findAll).toHaveBeenCalledWith({
      page,
      perPage,
    });
  });

  it('should throw BadRequestException when dto is invalid', async () => {
    const getAllFarmsCulturesDto = {
      page: 'invalid' as any,
      perPage: 0,
    };

    await expect(useCase.execute({ getAllFarmsCulturesDto })).rejects.toThrow(
      BadRequestException,
    );
    expect(farmCultureRepository.findAll).not.toHaveBeenCalled();
  });
});
