import { Module } from '@nestjs/common';
import { HarvestsController } from './controllers/harvests.controller';
import { CreateHarvestUseCase } from './use-cases/create-harvest/create-harvest.usecase';
import { UpdateHarvestUseCase } from './use-cases/update-harvest/update-harvest.usecase';
import { GetAllHarvestsUseCase } from './use-cases/get-all-harvests/get-all-harvests.usecase';
import { GetHarvestByIdUseCase } from './use-cases/get-harvest-by-id/get-harvest-by-id.usecase';
import { DeleteHarvestUseCase } from './use-cases/delete-harvest/delete-harvest.usecase';

@Module({
  imports: [],
  controllers: [HarvestsController],
  providers: [
    CreateHarvestUseCase,
    UpdateHarvestUseCase,
    GetAllHarvestsUseCase,
    GetHarvestByIdUseCase,
    DeleteHarvestUseCase,
  ],
  exports: [],
})
export class HarvestsModule {}
