import { IHarvest } from '@/modules/harvests/entities/harvest.entity';

export class HarvestOutputDTO {
  id: string;
  year: number;
  createdAt: Date;
  updateAt: Date;

  static toHttp(harvest: IHarvest): HarvestOutputDTO {
    return {
      id: harvest.id,
      year: harvest.year,
      createdAt: harvest.createdAt,
      updateAt: harvest.updatedAt,
    };
  }
}
