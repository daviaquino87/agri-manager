import { BadRequestException, Injectable } from '@nestjs/common';
import { GetAllFarmsCulturesDTO } from '@/modules/farms-cultures/dtos/get-all-farms-cultures.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { IFarmCulture } from '@/modules/farms-cultures/entities/farm-culture.entity';
import { FarmCultureRepository } from '@/modules/farms-cultures/repositories/farm-culture.repository';
import { validateDTO } from '@/common/utils/validateDto';

interface IExecuteInput {
  getAllFarmsCulturesDto: GetAllFarmsCulturesDTO;
}

interface IExecuteOutput {
  data: PaginatedOutputDTO<IFarmCulture>;
}

@Injectable()
export class GetAllFarmsCulturesUseCase {
  constructor(private readonly farmCultureRepository: FarmCultureRepository) {}

  async execute({
    getAllFarmsCulturesDto,
  }: IExecuteInput): Promise<IExecuteOutput> {
    const { dtoValidated, error } = await validateDTO(
      GetAllFarmsCulturesDTO,
      getAllFarmsCulturesDto,
    );

    if (error) {
      throw new BadRequestException(error);
    }

    const data = await this.farmCultureRepository.findAll({
      page: dtoValidated.page,
      perPage: dtoValidated.perPage,
    });

    return {
      data,
    };
  }
}
