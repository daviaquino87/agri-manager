import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { PrismaProducerRepository } from './prisma/repositories/prisma-producer.repository';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { PrismaFarmRepository } from './prisma/repositories/prisma-farm.repository';

@Global()
@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: ProducerRepository,
      useClass: PrismaProducerRepository,
    },
    {
      provide: FarmRepository,
      useClass: PrismaFarmRepository,
    },
  ],
  exports: [PrismaService, ProducerRepository, FarmRepository],
})
export class DatabaseModule {}
