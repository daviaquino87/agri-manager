import { Injectable, NotFoundException } from '@nestjs/common';
import { ProducerRepository } from '../../repositories/producer.repository';
import { IProducer } from '../../entities/producer.entity';

interface IExecuteInput {
  id: string;
}

@Injectable()
export class FindProducerByIdUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute({ id }: IExecuteInput): Promise<IProducer> {
    if (!id) {
      throw new NotFoundException('Produtor nao encontrado');
    }

    const producer = await this.producerRepository.findById(id);

    if (!producer) {
      throw new NotFoundException('Produtor não encontrado');
    }

    return producer;
  }
}
