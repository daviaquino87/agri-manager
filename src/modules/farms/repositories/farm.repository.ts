import { IFarm } from '@/modules/farms/entities/farm.entity';
import { GetFarmsParamsDTO } from '@/modules/farms/dtos/get-farms-params.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';

export abstract class FarmRepository {
  abstract create(data: IFarm, txn?: any): Promise<IFarm>;
  abstract update(id: string, data: Partial<IFarm>, txn?: any): Promise<IFarm>;
  abstract findById(id: string): Promise<IFarm | null>;
  abstract findAll(
    params: GetFarmsParamsDTO,
  ): Promise<PaginatedOutputDTO<IFarm>>;
  abstract delete(id: string, txn?: any): Promise<void>;
}
