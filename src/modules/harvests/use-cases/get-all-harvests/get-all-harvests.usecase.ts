import { BadRequestException, Injectable } from '@nestjs/common';
import { GetHarvestParamsDTO } from '../../dtos/get-harvest-prams.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { IHarvest } from '../../entities/harvest.entity';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { validateDTO } from '@/common/utils/validateDto';

interface IExecuteInput {
  getHarvestsParamsDto: GetHarvestParamsDTO;
}

interface IExecuteOutput {
  data: PaginatedOutputDTO<IHarvest>;
}

@Injectable()
export class GetAllHarvestsUseCase {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  async execute({
    getHarvestsParamsDto,
  }: IExecuteInput): Promise<IExecuteOutput> {
    const { dtoValidated, error } = await validateDTO(
      GetHarvestParamsDTO,
      getHarvestsParamsDto,
    );

    if (error) {
      throw new BadRequestException(error);
    }

    const data = await this.harvestRepository.findAll(dtoValidated!);

    return {
      data,
    };
  }
}
