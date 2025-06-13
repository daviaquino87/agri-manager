import { Module } from '@nestjs/common';
import { FarmsController } from '@/modules/farms/controllers/farms.controller';
import { CreateFarmUseCase } from '@/modules/farms/use-cases/create-farm/create-farm.use-case';
import { UpdateFarmUseCase } from '@/modules/farms/use-cases/update-farm/update-farm.use-case';
import { GetAllFarmsUseCase } from '@/modules/farms/use-cases/get-all-farms/get-all-farms.use-case';
import { GetFarmByIdUseCase } from '@/modules/farms/use-cases/get-farm-by-id/get-farm-by-id.use-case';
import { DeleteFarmUseCase } from '@/modules/farms/use-cases/delete-farm/delete-farm.use-case';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { PrismaFarmRepository } from '@/infra/database/prisma/repositories/prisma-farm.repository';

@Module({
  imports: [],
  controllers: [FarmsController],
  providers: [
    CreateFarmUseCase,
    UpdateFarmUseCase,
    GetAllFarmsUseCase,
    GetFarmByIdUseCase,
    DeleteFarmUseCase,
    {
      provide: FarmRepository,
      useClass: PrismaFarmRepository,
    },
  ],
  exports: [],
})
export class FarmsModule {}
