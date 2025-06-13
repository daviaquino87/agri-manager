import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { IFarmCulture } from '../entities/farm-culture.entity';
import { GetAllFarmsCulturesDTO } from '../dtos/get-all-farms-cultures.dto';

export abstract class FarmCultureRepository {
  abstract create(data: IFarmCulture): Promise<IFarmCulture>;
  abstract update(
    id: string,
    data: IFarmCulture,
    txn?: any,
  ): Promise<IFarmCulture>;
  abstract findAll(
    params: GetAllFarmsCulturesDTO,
  ): Promise<PaginatedOutputDTO<IFarmCulture>>;
  abstract findById(id: string): Promise<IFarmCulture>;
  abstract delete(id: string, txn?: any): Promise<void>;
}
