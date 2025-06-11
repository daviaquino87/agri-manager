import { IProducer } from '../entities/producer.entity';

export class ProducerOutputDTO {
  id: string;
  name: string;
  document: string;
  createdAt: Date;
  updatedAt: Date;

  static toHttp(producer: IProducer): ProducerOutputDTO {
    return {
      id: String(producer.id),
      name: producer.name,
      document: producer.document,
      createdAt: producer.createdAt as Date,
      updatedAt: producer.updatedAt as Date,
    };
  }
}
