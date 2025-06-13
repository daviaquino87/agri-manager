import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IHarvest } from '../../entities/harvest.entity';
import { HarvestRepository } from '../../repositories/harvest.repository';

interface IExecuteInput {
  id: string;
}

interface IExecuteOutput {
  harvest: IHarvest;
}

@Injectable()
export class GetHarvestByIdUseCase {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  async execute({ id }: IExecuteInput): Promise<IExecuteOutput> {
    if (!id) {
      throw new BadRequestException(
        'erro ao buscar colheita: o campo id deve ser preenchido',
      );
    }
    const harvest = await this.harvestRepository.findById(id);

    if (!harvest) {
      throw new NotFoundException(
        'erro ao buscar colheita: Colheita nao encontrada',
      );
    }

    return {
      harvest,
    };
  }
}
