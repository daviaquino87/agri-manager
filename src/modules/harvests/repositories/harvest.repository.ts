import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { IHarvest } from '@/modules/harvests/entities/harvest.entity';
import { GetHarvestParamsDTO } from '@/modules/harvests/dtos/get-harvest-prams.dto';

export abstract class HarvestRepository {
  abstract findAll(
    params: GetHarvestParamsDTO,
  ): Promise<PaginatedOutputDTO<IHarvest>>;
  abstract findById(id: string): Promise<IHarvest>;
  abstract create(data: IHarvest, txn?: any): Promise<IHarvest>;
  abstract update(id: string, data: IHarvest, txn?: any): Promise<IHarvest>;
  abstract delete(id: string, txn?: any): Promise<void>;
}
