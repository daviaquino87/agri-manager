import { UUID_VERSION } from '@/common/constants/uuid-version';
import { IsUUID } from 'class-validator';

export class CreateFarmCultureDTO {
  @IsUUID(UUID_VERSION, { message: 'o campo farmId deve ser um UUID válido' })
  farmId: string;

  @IsUUID(UUID_VERSION, { message: 'o campo cropId deve ser um UUID válido' })
  cropId: string;

  @IsUUID(UUID_VERSION, {
    message: 'o campo harvestId deve ser um UUID válido',
  })
  harvestId: string;
}
