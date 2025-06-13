import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UpdateFarmUseCase } from '@/modules/farms/use-cases/update-farm/update-farm.use-case';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateFarmDTO } from '@/modules/farms/dtos/update-farm.dto';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';

describe('UpdateFarmUseCase', () => {
  let useCase: UpdateFarmUseCase;
  let farmRepository: FarmRepository;
  let producerRepository: ProducerRepository;

  const mockFarm = {
    id: '1',
    name: 'Updated Farm',
    city: 'Updated City',
    state: 'Updated State',
    totalAreaInHectares: 200,
    agricultureAreaInHectares: 120,
    vegetationAreaInHectares: 80,
    producerId: '7b7d15bb-7785-4ecb-8de3-24088a09c2f4',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    farmRepository = {
      update: vi.fn(),
    } as any;

    producerRepository = {
      findById: vi.fn(),
    } as any;

    useCase = new UpdateFarmUseCase(farmRepository, producerRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a farm successfully', async () => {
    const updateFarmDto: UpdateFarmDTO = {
      description: 'Updated description',
      producerId: '7b7d15bb-7785-4ecb-8de3-24088a09c2f4',
      name: 'Updated Farm',
      city: 'Updated City',
      state: 'Updated State',
      totalAreaInHectares: 200,
      agricultureAreaInHectares: 120,
      vegetationAreaInHectares: 80,
    };

    vi.spyOn(farmRepository, 'update').mockResolvedValue(mockFarm);
    vi.spyOn(producerRepository, 'findById').mockResolvedValue({} as any);

    const result = await useCase.execute({ id: '1', updateFarmDto });

    expect(result.farm).toEqual(mockFarm);
    expect(farmRepository.update).toHaveBeenCalledWith('1', updateFarmDto);
  });

  it('should throw BadRequestException when DTO validation fails', async () => {
    const updateFarmDto = {
      name: '',
      city: '',
      state: '',
      totalAreaInHectares: -1,
      agricultureAreaInHectares: -1,
      vegetationAreaInHectares: -1,
    } as any;

    await expect(useCase.execute({ id: '1', updateFarmDto })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException when farm is not found', async () => {
    const updateFarmDto: UpdateFarmDTO = {
      description: 'Updated description',
      producerId: '7b7d15bb-7785-4ecb-8de3-24088a09c2f4',
      name: 'Updated Farm',
      city: 'Updated City',
      state: 'Updated State',
      totalAreaInHectares: 200,
      agricultureAreaInHectares: 120,
      vegetationAreaInHectares: 80,
    };

    const prismaError = new Prisma.PrismaClientKnownRequestError('', {
      code: PRISMA_ERRORS.RECORD_NOT_FOUND,
      clientVersion: '',
    });

    vi.spyOn(farmRepository, 'update').mockRejectedValue(prismaError);
    vi.spyOn(producerRepository, 'findById').mockResolvedValue({} as any);

    await expect(useCase.execute({ id: '1', updateFarmDto })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException for other errors', async () => {
    const updateFarmDto: UpdateFarmDTO = {
      description: 'Updated description',
      producerId: '7b7d15bb-7785-4ecb-8de3-24088a09c2f4',
      name: 'Updated Farm',
      city: 'Updated City',
      state: 'Updated State',
      totalAreaInHectares: 200,
      agricultureAreaInHectares: 120,
      vegetationAreaInHectares: 80,
    };

    vi.spyOn(farmRepository, 'update').mockRejectedValue(new Error());

    await expect(useCase.execute({ id: '1', updateFarmDto })).rejects.toThrow(
      BadRequestException,
    );
  });
});
