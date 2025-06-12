import { Module } from '@nestjs/common';
import { CropsController } from './controllers/crops.controller';
import { CreateCropUseCase } from './use-cases/create-crop/create-crop.use-case';
import { DeleteCropUseCase } from './use-cases/delete-crop/delete-crop.use-case';
import { GetAllCropsUseCase } from './use-cases/get-all-crops/get-all-crops.use-case';
import { GetCropByIdUseCase } from './use-cases/get-crop-by-id/get-crop-by-id.use-case';
import { UpdateCropUseCase } from './use-cases/update-crop/update-crop.use-case';

@Module({
  imports: [],
  controllers: [CropsController],
  providers: [
    CreateCropUseCase,
    DeleteCropUseCase,
    GetAllCropsUseCase,
    GetCropByIdUseCase,
    UpdateCropUseCase,
  ],
})
export class CropsModule {}
