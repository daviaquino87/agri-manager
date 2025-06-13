import { Module } from '@nestjs/common';
import { FarmsCulturesController } from './controllers/farms-cultures.controller';
import { CreateFarmCultureUseCase } from './use-cases/create-farm-culture/create-farm-culture.usecase';
import { UpdateFarmCultureUseCase } from './use-cases/update-farm-culture/update-farm-culture.usecase';
import { DeleteFarmCultureUseCase } from './use-cases/delete-farm-culture/delete-farm-culture.usecase';
import { GetFarmCultureByIdUseCase } from './use-cases/get-farm-culture-by-id/get-farm-culture-by-id.usecase';
import { GetAllFarmsCulturesUseCase } from './use-cases/get-all-farms-cultures/get-all-farms-cultures.usecase';

@Module({
  imports: [],
  controllers: [FarmsCulturesController],
  providers: [
    CreateFarmCultureUseCase,
    UpdateFarmCultureUseCase,
    GetFarmCultureByIdUseCase,
    GetAllFarmsCulturesUseCase,
    DeleteFarmCultureUseCase,
  ],
  exports: [],
})
export class FarmsCulturesModule {}
