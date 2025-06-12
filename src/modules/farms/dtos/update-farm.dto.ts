import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateFarmDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsNumber()
  @IsOptional()
  totalAreaInHectares?: number;

  @IsNumber()
  @IsOptional()
  agricultureAreaInHectares?: number;

  @IsNumber()
  @IsOptional()
  vegetationAreaInHectares?: number;

  @IsUUID()
  @IsOptional()
  producerId?: string;
} 