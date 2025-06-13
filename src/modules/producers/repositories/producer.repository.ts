import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import {
  IProducer,
  ProducerWithRelations,
} from '@/modules/producers/entities/producer.entity';
import { GetProducersParamsDTO } from '@/modules/producers/dtos/get-producers-params.dto';

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
  abstract findById(id: string): Promise<ProducerWithRelations>;
  abstract delete(id: string, txn?: any): Promise<void>;
}
