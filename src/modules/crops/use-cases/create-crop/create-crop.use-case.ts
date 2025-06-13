import { BadRequestException, Injectable } from '@nestjs/common';
import { ICrop } from '@/modules/crops/entities/crop.entity';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { CreateCropDTO } from '@/modules/crops/dtos/create-crop.dto';
import { validateDTO } from '@/common/utils/validateDto';
import { randomUUID } from 'crypto';

export interface ICreateCropInput {
  createCropDTO: CreateCropDTO;
}

export interface ICreateCropOutput {
  crop: ICrop;
}

@Injectable()
export class CreateCropUseCase {
  constructor(private readonly cropsRepository: CropRepository) {}

  async execute({
    createCropDTO,
  }: ICreateCropInput): Promise<ICreateCropOutput> {
    const { dtoValidated, error } = await validateDTO(
      CreateCropDTO,
      createCropDTO,
    );

    if (error) {
      throw new BadRequestException(error);
    }

    const crop = await this.cropsRepository.create({
      id: randomUUID(),
      name: dtoValidated!.name,
    });

    return { crop };
  }
}
