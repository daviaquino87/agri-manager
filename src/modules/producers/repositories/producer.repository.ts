import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { IProducer } from '../entities/producer.entity';
import { GetProducersParamsDTO } from '../dtos/get-producers-params.dto';

export abstract class ProducerRepository {
  abstract create(createProducerDto: IProducer, txn?: any): Promise<IProducer>;
  abstract update(
    id: string,
    updateProducerDto: Partial<IProducer>,
    txn?: any,
  ): Promise<IProducer>;
  abstract findAll(
    params: GetProducersParamsDTO,
  ): Promise<PaginatedOutputDTO<IProducer>>;
}
