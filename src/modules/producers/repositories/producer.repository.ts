import { IProducer } from '../entities/producer.entity';

export abstract class ProducerRepository {
  abstract create(createProducerDto: IProducer, txn?: any): Promise<IProducer>;
  abstract update(
    id: string,
    updateProducerDto: Partial<IProducer>,
    txn?: any,
  ): Promise<IProducer>;
}
