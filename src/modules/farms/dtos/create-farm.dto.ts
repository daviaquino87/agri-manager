import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateFarmDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsPositive()
  @IsNumber()
  totalAreaInHectares: number;

  @IsPositive()
  @IsNumber()
  agricultureAreaInHectares: number;

  @IsPositive()
  @IsNumber()
  vegetationAreaInHectares: number;

  @IsUUID()
  producerId: string;
}
