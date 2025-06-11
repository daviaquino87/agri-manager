import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { PrismaProducerRepository } from './prisma/repositories/prisma-producer.repository';

@Global()
@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: ProducerRepository,
      useClass: PrismaProducerRepository,
    },
  ],
  exports: [PrismaService, ProducerRepository],
})
export class DatabaseModule {}
