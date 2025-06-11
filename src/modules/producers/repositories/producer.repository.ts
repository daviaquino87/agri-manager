import { IProducer } from '../entities/producer.entity';

export abstract class ProducerRepository {
  abstract create(createProducerDto: IProducer): Promise<void>;
}
