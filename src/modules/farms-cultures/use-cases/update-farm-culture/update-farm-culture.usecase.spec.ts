import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UpdateFarmCultureUseCase } from './update-farm-culture.usecase';
import { FarmCultureRepository } from '../../repositories/farm-culture.repository';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '@prisma/client';

describe('UpdateFarmCultureUseCase', () => {
  let useCase: UpdateFarmCultureUseCase;
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

    useCase = new UpdateFarmCultureUseCase(
      farmCultureRepository,
      farmRepository,
      cropRepository,
      harvestRepository,
    );
  });

  it('should update a farm culture successfully', async () => {
    const id = randomUUID();
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const updateFarmCultureDto = {
      farmId,
      cropId,
      harvestId,
    };

    const mockFarm = {
      id: farmId,
      name: 'Test Farm',
      city: 'Test City',
      state: 'Test State',
      totalAreaInHectares: 100,
      cultivableAreaInHectares: 80,
      vegetationAreaInHectares: 20,
      agricultureAreaInHectares: 60,
      producerId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockCrop = {
      id: cropId,
      name: 'Test Crop',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockHarvest = {
      id: harvestId,
      year: 2024,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockFarmCulture = {
      id,
      farmId,
      cropId,
      harvestId,
      createdAt: new Date(),
    };

    vi.mocked(farmRepository.findById).mockResolvedValue(mockFarm);
    vi.mocked(cropRepository.findById).mockResolvedValue(mockCrop);
    vi.mocked(harvestRepository.findById).mockResolvedValue(mockHarvest);
    vi.mocked(farmCultureRepository.update).mockResolvedValue(mockFarmCulture);

    const result = await useCase.execute({ id, updateFarmCultureDto });

    expect(result.farmCulture).toEqual(mockFarmCulture);
    expect(farmRepository.findById).toHaveBeenCalledWith(farmId);
    expect(cropRepository.findById).toHaveBeenCalledWith(cropId);
    expect(harvestRepository.findById).toHaveBeenCalledWith(harvestId);
    expect(farmCultureRepository.update).toHaveBeenCalledWith(id, updateFarmCultureDto);
  });

  it('should throw BadRequestException when farm is not found', async () => {
    const id = randomUUID();
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const updateFarmCultureDto = {
      farmId,
      cropId,
      harvestId,
    };

    vi.mocked(farmRepository.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ id, updateFarmCultureDto }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when crop is not found', async () => {
    const id = randomUUID();
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const updateFarmCultureDto = {
      farmId,
      cropId,
      harvestId,
    };

    const mockFarm = {
      id: farmId,
      name: 'Test Farm',
      city: 'Test City',
      state: 'Test State',
      totalAreaInHectares: 100,
      cultivableAreaInHectares: 80,
      vegetationAreaInHectares: 20,
      agricultureAreaInHectares: 60,
      producerId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(farmRepository.findById).mockResolvedValue(mockFarm);
    vi.mocked(cropRepository.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ id, updateFarmCultureDto }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when harvest is not found', async () => {
    const id = randomUUID();
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const updateFarmCultureDto = {
      farmId,
      cropId,
      harvestId,
    };

    const mockFarm = {
      id: farmId,
      name: 'Test Farm',
      city: 'Test City',
      state: 'Test State',
      totalAreaInHectares: 100,
      cultivableAreaInHectares: 80,
      vegetationAreaInHectares: 20,
      agricultureAreaInHectares: 60,
      producerId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockCrop = {
      id: cropId,
      name: 'Test Crop',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(farmRepository.findById).mockResolvedValue(mockFarm);
    vi.mocked(cropRepository.findById).mockResolvedValue(mockCrop);
    vi.mocked(harvestRepository.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ id, updateFarmCultureDto }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException when farm culture is not found', async () => {
    const id = randomUUID();
    const farmId = randomUUID();
    const cropId = randomUUID();
    const harvestId = randomUUID();

    const updateFarmCultureDto = {
      farmId,
      cropId,
      harvestId,
    };

    const mockFarm = {
      id: farmId,
      name: 'Test Farm',
      city: 'Test City',
      state: 'Test State',
      totalAreaInHectares: 100,
      cultivableAreaInHectares: 80,
      vegetationAreaInHectares: 20,
      agricultureAreaInHectares: 60,
      producerId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockCrop = {
      id: cropId,
      name: 'Test Crop',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockHarvest = {
      id: harvestId,
      year: 2024,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(farmRepository.findById).mockResolvedValue(mockFarm);
    vi.mocked(cropRepository.findById).mockResolvedValue(mockCrop);
    vi.mocked(harvestRepository.findById).mockResolvedValue(mockHarvest);
    vi.mocked(farmCultureRepository.update).mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Record not found', {
        code: 'P2025',
        clientVersion: '1.0.0',
      }),
    );

    await expect(
      useCase.execute({ id, updateFarmCultureDto }),
    ).rejects.toThrow(NotFoundException);
  });
}); 