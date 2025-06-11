import { IsCPFOrCNPJ } from '@/common/decorators/validade-cpf-or-cnpj.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProducerDTO {
  @IsString({
    message: 'o campo nome deve ser uma string',
  })
  @IsNotEmpty({
    message: 'o campo nome deve ser preenchido',
  })
  name: string;

  @IsCPFOrCNPJ()
  @IsString({
    message: 'o campo document deve ser uma string',
  })
  @IsNotEmpty({
    message: 'o campo document deve ser preenchido',
  })
  document: string;
}
