import { Module } from '@nestjs/common';
import { CropsController } from '@/modules/crops/controllers/crops.controller';
import { CreateCropUseCase } from '@/modules/crops/use-cases/create-crop/create-crop.use-case';
import { DeleteCropUseCase } from '@/modules/crops/use-cases/delete-crop/delete-crop.use-case';
import { GetAllCropsUseCase } from '@/modules/crops/use-cases/get-all-crops/get-all-crops.use-case';
import { GetCropByIdUseCase } from '@/modules/crops/use-cases/get-crop-by-id/get-crop-by-id.use-case';
import { UpdateCropUseCase } from '@/modules/crops/use-cases/update-crop/update-crop.use-case';

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
