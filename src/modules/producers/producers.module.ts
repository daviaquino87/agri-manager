import { Module } from '@nestjs/common';
import { CreateProducerUseCase } from './use-cases/create-producer/create-producer.usecase';
import { ProducersController } from './controllers/producers.controller';
import { UpdateProducerUseCase } from './use-cases/update-producer/update-producer.usecase';
import { GetAllProducersUseCase } from './use-cases/get-all-producers/get-all-producers.usecase';
import { FindProducerByIdUseCase } from './use-cases/find-producer-by-id/find-producer-by-id.usecase';

@Module({
  imports: [],
  controllers: [ProducersController],
  providers: [
    CreateProducerUseCase,
    UpdateProducerUseCase,
    GetAllProducersUseCase,
    FindProducerByIdUseCase,
  ],
  exports: [],
})
export class ProducersModule {}
