import { Module } from '@nestjs/common';
import { CreateProducerUseCase } from './use-cases/create-producer/create-producer.usecase';
import { ProducersController } from './controllers/producers.controller';

@Module({
  imports: [],
  controllers: [ProducersController],
  providers: [CreateProducerUseCase],
  exports: [],
})
export class ProducersModule {}
