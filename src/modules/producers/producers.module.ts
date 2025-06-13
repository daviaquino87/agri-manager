import { Module } from '@nestjs/common';
import { CreateProducerUseCase } from '@/modules/producers/use-cases/create-producer/create-producer.usecase';
import { ProducersController } from '@/modules/producers/controllers/producers.controller';
import { UpdateProducerUseCase } from '@/modules/producers/use-cases/update-producer/update-producer.usecase';
import { GetAllProducersUseCase } from '@/modules/producers/use-cases/get-all-producers/get-all-producers.usecase';
import { GetProducerByIdUseCase } from '@/modules/producers/use-cases/get-producer-by-id/get-producer-by-id.usecase';
import { DeleteProducerUseCase } from '@/modules/producers/use-cases/delete-producer/delete-producer.usecase';

@Module({
  imports: [],
  controllers: [ProducersController],
  providers: [
    CreateProducerUseCase,
    UpdateProducerUseCase,
    GetAllProducersUseCase,
    GetProducerByIdUseCase,
    DeleteProducerUseCase,
  ],
  exports: [],
})
export class ProducersModule {}
