import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { ICrop } from '../entities/crop.entity';
import { GetCropsParamsDTO } from '../dtos/get-crops-params.dto';

export abstract class CropRepository {
  abstract create(data: ICrop, txn?: any): Promise<ICrop>;
  abstract findAll(
    params: GetCropsParamsDTO,
  ): Promise<PaginatedOutputDTO<ICrop>>;
  abstract findById(id: string): Promise<ICrop>;
  abstract update(id: string, data: ICrop, txn?: any): Promise<ICrop>;
  abstract delete(id: string, txn?: any): Promise<void>;
}
