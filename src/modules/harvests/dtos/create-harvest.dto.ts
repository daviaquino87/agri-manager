import { IsNumber, IsPositive } from 'class-validator';

export class CreateHarvestDTO {
  @IsPositive({
    message: 'O ano deve ser maior que zero',
  })
  @IsNumber(
    {},
    {
      message: 'O ano deve ser um número',
    },
  )
  year: number;
}
