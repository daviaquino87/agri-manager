import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateFarmCultureUseCase } from './create-farm-culture.usecase';
import { FarmCultureRepository } from '../../repositories/farm-culture.repository';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

describe('CreateFarmCultureUseCase', () => {
  let useCase: CreateFarmCultureUseCase;
  let farmCultureRepository: FarmCultureRepository;
  let farmRepository: FarmRepository;
  let cropRepository: CropRepository;
  let harvestRepository: HarvestRepository;

  beforeEach(() => {
    farmCultureRepository = {
      create: vi.fn(),
      update: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      delete: vi.fn(),
    } as any;

    farmRepository = {
      findById: vi.fn(),
    } as any;

    cropRepository = {
      findById: vi.fn(),
    } as any;

    harvestRepository = {
      findById: vi.fn(),
    } as any;

    useCase = new CreateFarmCultureUseCase(
      farmCultureRepository,
      farmRepository,
      cropRepository,
      harvestRepository,
    );
  });

  it('should create a farm culture successfully', async () => {
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const createFarmCultureDto = {
      farmId,
      cropId,
      harvestId,
    };

    const mockFarm = { id: farmId };
    const mockCrop = { id: cropId };
    const mockHarvest = { id: harvestId };
    const mockFarmCulture = {
      id: randomUUID(),
      farmId,
      cropId,
      harvestId,
      createdAt: new Date(),
    };

    vi.mocked(farmRepository.findById).mockResolvedValue(mockFarm);
    vi.mocked(cropRepository.findById).mockResolvedValue(mockCrop);
    vi.mocked(harvestRepository.findById).mockResolvedValue(mockHarvest);
    vi.mocked(farmCultureRepository.create).mockResolvedValue(mockFarmCulture);

    const result = await useCase.execute({ createFarmCultureDto });

    expect(result.farmCulture).toEqual(mockFarmCulture);
    expect(farmRepository.findById).toHaveBeenCalledWith(farmId);
    expect(cropRepository.findById).toHaveBeenCalledWith(cropId);
    expect(harvestRepository.findById).toHaveBeenCalledWith(harvestId);
    expect(farmCultureRepository.create).toHaveBeenCalled();
  });

  it('should throw BadRequestException when farm is not found', async () => {
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const createFarmCultureDto = {
      farmId,
      cropId,
      harvestId,
    };

    vi.mocked(farmRepository.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ createFarmCultureDto }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when crop is not found', async () => {
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const createFarmCultureDto = {
      farmId,
      cropId,
      harvestId,
    };

    const mockFarm = { id: farmId };

    vi.mocked(farmRepository.findById).mockResolvedValue(mockFarm);
    vi.mocked(cropRepository.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ createFarmCultureDto }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when harvest is not found', async () => {
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const createFarmCultureDto = {
      farmId,
      cropId,
      harvestId,
    };

    const mockFarm = { id: farmId };
    const mockCrop = { id: cropId };

    vi.mocked(farmRepository.findById).mockResolvedValue(mockFarm);
    vi.mocked(cropRepository.findById).mockResolvedValue(mockCrop);
    vi.mocked(harvestRepository.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ createFarmCultureDto }),
    ).rejects.toThrow(BadRequestException);
  });
}); 