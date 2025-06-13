import { BadRequestException, Injectable } from '@nestjs/common';
import { ICrop } from '@/modules/crops/entities/crop.entity';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { GetCropsParamsDTO } from '@/modules/crops/dtos/get-crops-params.dto';
import { validateDTO } from '@/common/utils/validateDto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';

export interface IListCropsInput {
  getCropsParamsDto: GetCropsParamsDTO;
}

export interface IListCropsOutput {
  data: PaginatedOutputDTO<ICrop>;
}

@Injectable()
export class GetAllCropsUseCase {
  constructor(private readonly cropsRepository: CropRepository) {}

  async execute({
    getCropsParamsDto,
  }: IListCropsInput): Promise<IListCropsOutput> {
    const { dtoValidated, error } = await validateDTO(
      GetCropsParamsDTO,
      getCropsParamsDto,
    );

    if (error) {
      throw new BadRequestException(error);
    }

    const data = await this.cropsRepository.findAll({
      page: dtoValidated.page,
      perPage: dtoValidated.perPage,
    });

    return { data };
  }
}
