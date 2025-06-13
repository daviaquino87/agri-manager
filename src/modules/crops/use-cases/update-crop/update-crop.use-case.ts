import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICrop } from '@/modules/crops/entities/crop.entity';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { UpdateCropDTO } from '@/modules/crops/dtos/update-crop.dto';
import { validateDTO } from '@/common/utils/validateDto';

export interface IUpdateCropInput {
  id: string;
  updateCropDto: UpdateCropDTO;
}

export interface IUpdateCropOutput {
  crop: ICrop;
}

@Injectable()
export class UpdateCropUseCase {
  constructor(private readonly cropsRepository: CropRepository) {}

  async execute({
    id,
    updateCropDto,
  }: IUpdateCropInput): Promise<IUpdateCropOutput> {
    const { dtoValidated, error } = await validateDTO(
      UpdateCropDTO,
      updateCropDto,
    );

    if (error) {
      throw new BadRequestException(error);
    }

    const cropExists = await this.cropsRepository.findById(id);

    if (!cropExists) {
      throw new NotFoundException(
        `erro ao atualizar plantação: Plantação nao encontrada`,
      );
    }

    const updatedCrop = await this.cropsRepository.update(id, dtoValidated!);

    return { crop: updatedCrop };
  }
}
