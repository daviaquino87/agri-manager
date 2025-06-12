import { Module } from '@nestjs/common';
import { FarmController } from './controllers/farm.controller';
import { CreateFarmUseCase } from './use-cases/create-farm/create-farm.use-case';
import { UpdateFarmUseCase } from './use-cases/update-farm/update-farm.use-case';
import { GetAllFarmsUseCase } from './use-cases/get-all-farms/get-all-farms.use-case';
import { GetFarmByIdUseCase } from './use-cases/get-farm-by-id/get-farm-by-id.use-case';
import { DeleteFarmUseCase } from './use-cases/delete-farm/delete-farm.use-case';
import { FarmRepository } from './repositories/farm.repository';
import { PrismaFarmRepository } from '@/infra/database/prisma/repositories/prisma-farm.repository';

@Module({
  imports: [],
  controllers: [FarmController],
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
export class FarmModule {}
