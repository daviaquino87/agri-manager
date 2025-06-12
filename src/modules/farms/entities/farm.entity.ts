export interface IFarm {
  id?: string;
  name: string;
  city: string;
  state: string;
  totalAreaInHectares: number;
  agricultureAreaInHectares: number;
  vegetationAreaInHectares: number;
  producerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
