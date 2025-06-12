import { IFarm } from '../entities/farm.entity';

export class FarmOutputDTO {
  id: string;
  name: string;
  city: string;
  state: string;
  totalAreaInHectares: number;
  agricultureAreaInHectares: number;
  vegetationAreaInHectares: number;
  producerId: string;
  createdAt: Date;
  updatedAt: Date;

  static toHttp(farm: IFarm): FarmOutputDTO {
    return {
      id: String(farm.id),
      name: farm.name,
      city: farm.city,
      state: farm.state,
      totalAreaInHectares: farm.totalAreaInHectares,
      agricultureAreaInHectares: farm.agricultureAreaInHectares,
      vegetationAreaInHectares: farm.vegetationAreaInHectares,
      producerId: farm.producerId,
      createdAt: farm.createdAt as Date,
      updatedAt: farm.updatedAt as Date,
    };
  }
} 