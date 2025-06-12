import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCropDTO {
  @IsString({
    message: 'o campo name deve ser uma string',
  })
  @IsNotEmpty({
    message: 'o campo name deve ser preenchido',
  })
  name: string;
}
