import { BadRequestException, Injectable } from '@nestjs/common';
import { GetAllFarmsCulturesDTO } from '../../dtos/get-all-farms-cultures.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { IFarmCulture } from '../../entities/farm-culture.entity';
import { FarmCultureRepository } from '../../repositories/farm-culture.repository';
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
