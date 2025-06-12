import { BadRequestException, Injectable } from '@nestjs/common';
import { FarmRepository } from '../../repositories/farm.repository';
import { IFarm } from '../../entities/farm.entity';

interface IExecuteInput {
  id: string;
}

interface IExecuteOutput {
  farm: IFarm;
}

@Injectable()
export class GetFarmByIdUseCase {
  constructor(private readonly farmRepository: FarmRepository) {}

  async execute({ id }: IExecuteInput): Promise<IExecuteOutput> {
    if (!id) {
      throw new BadRequestException('o campo id deve ser preenchido');
    }

    const farm = await this.farmRepository.findById(id);

    if (!farm) {
      throw new BadRequestException('farm nao encontrado');
    }

    return { farm };
  }
}
