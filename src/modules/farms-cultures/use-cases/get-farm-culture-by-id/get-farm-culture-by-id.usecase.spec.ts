import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetFarmCultureByIdUseCase } from './get-farm-culture-by-id.usecase';
import { FarmCultureRepository } from '../../repositories/farm-culture.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

describe('GetFarmCultureByIdUseCase', () => {
  let useCase: GetFarmCultureByIdUseCase;
  let farmCultureRepository: FarmCultureRepository;

  beforeEach(() => {
    farmCultureRepository = {
      create: vi.fn(),
      update: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      delete: vi.fn(),
    } as any;

    useCase = new GetFarmCultureByIdUseCase(farmCultureRepository);
  });

  it('should get a farm culture by id successfully', async () => {
    const id = randomUUID();
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const mockFarmCulture = {
      id,
      farmId,
      cropId,
      harvestId,
      createdAt: new Date(),
    };

    vi.mocked(farmCultureRepository.findById).mockResolvedValue(mockFarmCulture);

    const result = await useCase.execute({ id });

    expect(result.farmCulture).toEqual(mockFarmCulture);
    expect(farmCultureRepository.findById).toHaveBeenCalledWith(id);
  });

  it('should throw BadRequestException when id is not provided', async () => {
    await expect(useCase.execute({ id: '' })).rejects.toThrow(BadRequestException);
    expect(farmCultureRepository.findById).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException when farm culture is not found', async () => {
    const id = randomUUID();

    vi.mocked(farmCultureRepository.findById).mockResolvedValue(null);

    await expect(useCase.execute({ id })).rejects.toThrow(NotFoundException);
    expect(farmCultureRepository.findById).toHaveBeenCalledWith(id);
  });
}); 