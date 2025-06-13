import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetHarvestByIdUseCase } from '@/modules/harvests/use-cases/get-harvest-by-id/get-harvest-by-id.usecase';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('GetHarvestByIdUseCase', () => {
  let useCase: GetHarvestByIdUseCase;
  let harvestRepository: HarvestRepository;

  beforeEach(() => {
    harvestRepository = {
      findById: vi.fn(),
    } as any;

    useCase = new GetHarvestByIdUseCase(harvestRepository);
  });

  it('should get a harvest by id successfully', async () => {
    const mockHarvest = {
      id: '123',
      year: 2024,
    };

    vi.spyOn(harvestRepository, 'findById').mockResolvedValue(mockHarvest);

    const result = await useCase.execute({ id: '123' });

    expect(result.harvest).toEqual(mockHarvest);
    expect(harvestRepository.findById).toHaveBeenCalledWith('123');
  });

  it('should throw BadRequestException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException when harvest is not found', async () => {
    vi.spyOn(harvestRepository, 'findById').mockResolvedValue(null);

    await expect(useCase.execute({ id: '123' })).rejects.toThrow(
      NotFoundException,
    );
  });
});
