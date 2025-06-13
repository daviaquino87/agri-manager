import { Module } from '@nestjs/common';
import { HarvestsController } from '@/modules/harvests/controllers/harvests.controller';
import { CreateHarvestUseCase } from '@/modules/harvests/use-cases/create-harvest/create-harvest.usecase';
import { UpdateHarvestUseCase } from '@/modules/harvests/use-cases/update-harvest/update-harvest.usecase';
import { GetAllHarvestsUseCase } from '@/modules/harvests/use-cases/get-all-harvests/get-all-harvests.usecase';
import { GetHarvestByIdUseCase } from '@/modules/harvests/use-cases/get-harvest-by-id/get-harvest-by-id.usecase';
import { DeleteHarvestUseCase } from '@/modules/harvests/use-cases/delete-harvest/delete-harvest.usecase';

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
