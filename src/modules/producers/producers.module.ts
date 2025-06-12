import { Module } from '@nestjs/common';
import { CreateProducerUseCase } from './use-cases/create-producer/create-producer.usecase';
import { ProducersController } from './controllers/producers.controller';
import { UpdateProducerUseCase } from './use-cases/update-producer/update-producer.usecase';
import { GetAllProducersUseCase } from './use-cases/get-all-producers/get-all-producers.usecase';
import { GetProducerByIdUseCase } from './use-cases/get-producer-by-id/get-producer-by-id.usecase';
import { DeleteProducerUseCase } from './use-cases/delete-producer/delete-producer.usecase';

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
