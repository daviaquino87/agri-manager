import { IsCPFOrCNPJ } from '@/common/decorators/validade-cpf-or-cnpj.decorator';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProducerDTO {
  @IsString({
    message: 'o campo nome deve ser uma string',
  })
  @IsOptional()
  name?: string;

  @IsCPFOrCNPJ()
  @IsString({
    message: 'o campo document deve ser uma string',
  })
  @IsOptional()
  document?: string;
} 