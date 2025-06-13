import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { IHarvest } from '../entities/harvest.entity';
import { GetHarvestParamsDTO } from '../dtos/get-harvest-prams.dto';

export abstract class HarvestRepository {
  abstract findAll(
    params: GetHarvestParamsDTO,
  ): Promise<PaginatedOutputDTO<IHarvest>>;
  abstract findById(id: string): Promise<IHarvest>;
  abstract create(data: IHarvest, txn?: any): Promise<IHarvest>;
  abstract update(id: string, data: IHarvest, txn?: any): Promise<IHarvest>;
  abstract delete(id: string, txn?: any): Promise<void>;
}
