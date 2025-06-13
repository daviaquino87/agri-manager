import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateCropUseCase } from '@/modules/crops/use-cases/create-crop/create-crop.use-case';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { BadRequestException } from '@nestjs/common';
import { validateDTO } from '@/common/utils/validateDto';

vi.mock('@/common/utils/validateDto', () => ({
  validateDTO: vi.fn(),
}));

describe('CreateCropUseCase', () => {
  let useCase: CreateCropUseCase;
  let cropRepository: CropRepository;

  beforeEach(() => {
    cropRepository = {
      create: vi.fn(),
    } as any;

    useCase = new CreateCropUseCase(cropRepository);
    vi.clearAllMocks();
  });

  it('should create a crop successfully', async () => {
    const mockCrop = {
      id: '123',
      name: 'Corn',
    };

    const createCropDTO = {
      name: 'Corn',
    };

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: createCropDTO,
      error: null,
    });

    vi.spyOn(cropRepository, 'create').mockResolvedValue(mockCrop);

    const result = await useCase.execute({ createCropDTO });

    expect(result.crop).toEqual(mockCrop);
    expect(cropRepository.create).toHaveBeenCalledWith({
      id: expect.any(String),
      name: createCropDTO.name,
    });
  });

  it('should throw BadRequestException when DTO validation fails', async () => {
    const createCropDTO = {
      name: '',
    };

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: null,
      error: 'Name is required',
    });

    await expect(useCase.execute({ createCropDTO })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should propagate repository errors', async () => {
    const createCropDTO = {
      name: 'Corn',
    };

    vi.mocked(validateDTO).mockResolvedValue({
      dtoValidated: createCropDTO,
      error: null,
    });

    const error = new Error('Repository error');
    vi.spyOn(cropRepository, 'create').mockRejectedValue(error);

    await expect(useCase.execute({ createCropDTO })).rejects.toThrow(error);
  });
});
