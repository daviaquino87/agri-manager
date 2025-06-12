import { Injectable, NotFoundException } from '@nestjs/common';
import { ProducerRepository } from '../../repositories/producer.repository';
import { IProducer } from '../../entities/producer.entity';

interface IExecuteInput {
  id: string;
}

interface IExecuteOutput {
  producer: IProducer;
}

@Injectable()
export class GetProducerByIdUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute({ id }: IExecuteInput): Promise<IExecuteOutput> {
    if (!id) {
      throw new NotFoundException('Produtor nao encontrado');
    }

    const producer = await this.producerRepository.findById(id);

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado');
    }

    return { producer };
  }
}
