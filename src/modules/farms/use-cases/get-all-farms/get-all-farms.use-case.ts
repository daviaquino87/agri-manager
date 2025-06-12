import { FarmRepository } from '../../repositories/farm.repository';
import { IFarm } from '../../entities/farm.entity';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { GetFarmsParamsDTO } from '../../dtos/get-farms-params.dto';
import { validateDTO } from '@/common/utils/validateDto';
import { BadRequestException, Injectable } from '@nestjs/common';

interface IExecuteInput {
  getAllFarmsParams: GetFarmsParamsDTO;
}

interface IExecuteOutput {
  data: PaginatedOutputDTO<IFarm>;
}

@Injectable()
export class GetAllFarmsUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute({ getAllFarmsParams }: IExecuteInput): Promise<IExecuteOutput> {
    const { dtoValidated, error } = await validateDTO(
      GetFarmsParamsDTO,
      getAllFarmsParams,
    );

    if (error) {
      throw new BadRequestException(error);
    }

    const data = await this.farmRepository.findAll({
      page: dtoValidated.page,
      perPage: dtoValidated.perPage,
    });

    return {
      data,
    };
  }
}
