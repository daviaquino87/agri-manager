import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IFarmCulture } from '@/modules/farms-cultures/entities/farm-culture.entity';
import { FarmCultureRepository } from '@/modules/farms-cultures/repositories/farm-culture.repository';

interface IExecuteInput {
  id: string;
}

interface IExecuteOutput {
  farmCulture: IFarmCulture;
}

@Injectable()
export class GetFarmCultureByIdUseCase {
  constructor(private readonly farmCultureRepository: FarmCultureRepository) {}

  async execute({ id }: IExecuteInput): Promise<IExecuteOutput> {
    if (!id) {
      throw new BadRequestException(
        'erro ao buscar cultura: o campo id deve ser preenchido',
      );
    }

    const farmCulture = await this.farmCultureRepository.findById(id);

    if (!farmCulture) {
      throw new NotFoundException(
        'erro ao buscar cultura: cultura nao encontrada',
      );
    }

    return {
      farmCulture,
    };
  }
}
