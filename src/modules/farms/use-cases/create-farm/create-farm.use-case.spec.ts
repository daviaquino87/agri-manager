import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateFarmUseCase } from '@/modules/farms/use-cases/create-farm/create-farm.use-case';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { BadRequestException } from '@nestjs/common';
import { CreateFarmDTO } from '@/modules/farms/dtos/create-farm.dto';

describe('CreateFarmUseCase', () => {
  let useCase: CreateFarmUseCase;
  let farmRepository: FarmRepository;
  let producerRepository: ProducerRepository;

  beforeEach(() => {
    farmRepository = {
      create: vi.fn(),
    } as any;

    producerRepository = {
      findById: vi.fn(),
    } as any;

    useCase = new CreateFarmUseCase(farmRepository, producerRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a farm successfully', async () => {
    const mockFarm = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Farm 1',
      city: 'City 1',
      state: 'State 1',
      totalAreaInHectares: 100,
      agricultureAreaInHectares: 60,
      vegetationAreaInHectares: 40,
      producerId: '550e8400-e29b-41d4-a716-446655440000',
    };

    const createFarmDto = new CreateFarmDTO();
    createFarmDto.name = 'Farm 1';
    createFarmDto.description = 'Farm description';
    createFarmDto.city = 'City 1';
    createFarmDto.state = 'State 1';
    createFarmDto.totalAreaInHectares = 100;
    createFarmDto.agricultureAreaInHectares = 60;
    createFarmDto.vegetationAreaInHectares = 40;
    createFarmDto.producerId = '550e8400-e29b-41d4-a716-446655440000';

    vi.spyOn(producerRepository, 'findById').mockResolvedValue({
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Producer 1',
      document: '12345678900',
      farms: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    vi.spyOn(farmRepository, 'create').mockResolvedValue(mockFarm);

    const result = await useCase.execute({ createFarmDto });

    expect(result.farm).toEqual(mockFarm);
    expect(farmRepository.create).toHaveBeenCalled();
  });

  it('should throw BadRequestException when farm areas do not match', async () => {
    const createFarmDto = new CreateFarmDTO();
    createFarmDto.name = 'Farm 1';
    createFarmDto.city = 'City 1';
    createFarmDto.state = 'State 1';
    createFarmDto.totalAreaInHectares = 100;
    createFarmDto.agricultureAreaInHectares = 60;
    createFarmDto.vegetationAreaInHectares = 50;
    createFarmDto.producerId = '550e8400-e29b-41d4-a716-446655440000';

    await expect(useCase.execute({ createFarmDto })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException when producer does not exist', async () => {
    const createFarmDto = new CreateFarmDTO();
    createFarmDto.name = 'Farm 1';
    createFarmDto.city = 'City 1';
    createFarmDto.state = 'State 1';
    createFarmDto.totalAreaInHectares = 100;
    createFarmDto.agricultureAreaInHectares = 60;
    createFarmDto.vegetationAreaInHectares = 40;
    createFarmDto.producerId = '550e8400-e29b-41d4-a716-446655440000';

    vi.spyOn(producerRepository, 'findById').mockResolvedValue(null);

    await expect(useCase.execute({ createFarmDto })).rejects.toThrow(
      BadRequestException,
    );
  });
});
