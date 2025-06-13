import { IFarmCulture } from '../entities/farm-culture.entity';

export class FarmCultureOutputDTO {
  id: string;
  farmId: string;
  cropId: string;
  harvestId: string;
  createdAt: Date;

  static toHttp(farmCulture: IFarmCulture): FarmCultureOutputDTO {
    return {
      id: String(farmCulture.id),
      farmId: String(farmCulture.farmId),
      cropId: String(farmCulture.cropId),
      harvestId: String(farmCulture.harvestId),
      createdAt: farmCulture.createdAt as Date,
    };
  }
}
