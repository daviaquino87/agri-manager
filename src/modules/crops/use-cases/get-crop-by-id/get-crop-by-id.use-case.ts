import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICrop } from '../../entities/crop.entity';
import { CropRepository } from '../../repositories/crop.repository';

export interface IGetCropByIdInput {
  id: string;
}

export interface IGetCropByIdOutput {
  crop: ICrop;
}

@Injectable()
export class GetCropByIdUseCase {
  constructor(private readonly cropsRepository: CropRepository) {}

  async execute({ id }: IGetCropByIdInput): Promise<IGetCropByIdOutput> {
    if (!id) {
      throw new BadRequestException(
        `erro ao buscar plantação: o campo id deve ser preenchido`,
      );
    }

    const crop = await this.cropsRepository.findById(id);

    if (!crop) {
      throw new NotFoundException(
        `erro ao buscar plantação: Plantação nao encontrada`,
      );
    }

    return { crop };
  }
}
