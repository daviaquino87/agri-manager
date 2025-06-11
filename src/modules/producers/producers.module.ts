import { Module } from '@nestjs/common';
import { CreateProducerUseCase } from './use-cases/create-producer/create-producer.usecase';
import { ProducersController } from './controllers/producers.controller';
import { UpdateProducerUseCase } from './use-cases/update-producer/update-producer.usecase';

@Module({
  imports: [],
  controllers: [ProducersController],
  providers: [CreateProducerUseCase, UpdateProducerUseCase],
  exports: [],
})
export class ProducersModule {}
