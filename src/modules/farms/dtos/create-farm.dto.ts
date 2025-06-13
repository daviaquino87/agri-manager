import { UUID_VERSION } from '@/common/constants/uuid-version';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateFarmDTO {
  @IsString({
    message: 'o campo name deve ser uma string',
  })
  @IsNotEmpty({
    message: 'o campo name deve ser preenchido',
  })
  name: string;

  @IsString({
    message: 'o campo description deve ser uma string',
  })
  @IsNotEmpty({
    message: 'o campo description deve ser preenchido',
  })
  description: string;

  @IsString({
    message: 'o campo city deve ser uma string',
  })
  @IsNotEmpty({
    message: 'o campo city deve ser preenchido',
  })
  city: string;

  @IsString({
    message: 'o campo state deve ser uma string',
  })
  @IsNotEmpty({
    message: 'o campo state deve ser preenchido',
  })
  state: string;

  @IsPositive({
    message: 'o campo totalAreaInHectares deve ser maior que zero',
  })
  @IsNumber(
    {},
    {
      message: 'o campo totalAreaInHectares deve ser um número',
    },
  )
  totalAreaInHectares: number;

  @IsPositive({
    message: 'o campo agricultureAreaInHectares deve ser maior que zero',
  })
  @IsNumber(
    {},
    {
      message: 'o campo agricultureAreaInHectares deve ser um número',
    },
  )
  agricultureAreaInHectares: number;

  @IsPositive({
    message: 'o campo vegetationAreaInHectares deve ser maior que zero',
  })
  @IsNumber(
    {},
    {
      message: 'o campo vegetationAreaInHectares deve ser um número',
    },
  )
  vegetationAreaInHectares: number;

  @IsUUID(UUID_VERSION, {
    message: 'o campo producerId deve ser um UUID válido',
  })
  producerId: string;
}
