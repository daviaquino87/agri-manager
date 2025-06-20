import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { ProducerWithRelations } from '@/modules/producers/entities/producer.entity';

interface IExecuteInput {
  id: string;
}

interface IExecuteOutput {
  producer: ProducerWithRelations;
}

@Injectable()
export class GetProducerByIdUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute({ id }: IExecuteInput): Promise<IExecuteOutput> {
    if (!id) {
      throw new BadRequestException(
        'erro ao buscar produtor: O campo id deve ser preenchido',
      );
    }

    const producer = await this.producerRepository.findById(id);

    if (!producer) {
      throw new NotFoundException(
        'erro ao buscar produtor: Produtor não encontrado',
      );
    }

    return { producer };
  }
}
