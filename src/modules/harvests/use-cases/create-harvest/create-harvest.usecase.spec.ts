import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateHarvestUseCase } from '@/modules/harvests/use-cases/create-harvest/create-harvest.usecase';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { BadRequestException } from '@nestjs/common';

describe('CreateHarvestUseCase', () => {
  let useCase: CreateHarvestUseCase;
  let harvestRepository: HarvestRepository;

  beforeEach(() => {
    harvestRepository = {
      create: vi.fn(),
    } as any;

    useCase = new CreateHarvestUseCase(harvestRepository);
  });

  it('should create a harvest successfully', async () => {
    const mockHarvest = {
      id: '123',
      year: 2024,
    };

    const createHarvestDto = {
      year: 2024,
    };

    vi.spyOn(harvestRepository, 'create').mockResolvedValue(mockHarvest);

    const result = await useCase.execute({ createHarvestDto });

    expect(result.harvest).toEqual(mockHarvest);
    expect(harvestRepository.create).toHaveBeenCalledWith({
      id: expect.any(String),
      year: createHarvestDto.year,
    });
  });

  it('should throw BadRequestException when DTO validation fails', async () => {
    const createHarvestDto = {
      year: null,
    };

    await expect(useCase.execute({ createHarvestDto })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException for other errors', async () => {
    const createHarvestDto = {
      year: 2024,
    };

    vi.spyOn(harvestRepository, 'create').mockRejectedValue(new Error());

    await expect(useCase.execute({ createHarvestDto })).rejects.toThrow(
      BadRequestException,
    );
  });
});
