import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { PrismaProducerRepository } from './prisma/repositories/prisma-producer.repository';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { PrismaFarmRepository } from './prisma/repositories/prisma-farm.repository';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { PrismaCropRepository } from './prisma/repositories/prisma-crops.repository';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { PrismaHarvestsRepository } from './prisma/repositories/prisma-harvests.repository';
import { FarmCultureRepository } from '@/modules/farms-cultures/repositories/farm-culture.repository';
import { PrismaFarmsCulturesRepository } from './prisma/repositories/prisma-farms-cultures.repository';

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
    {
      provide: CropRepository,
      useClass: PrismaCropRepository,
    },
    {
      provide: HarvestRepository,
      useClass: PrismaHarvestsRepository,
    },
    {
      provide: FarmCultureRepository,
      useClass: PrismaFarmsCulturesRepository,
    },
  ],
  exports: [
    PrismaService,
    ProducerRepository,
    FarmRepository,
    CropRepository,
    HarvestRepository,
    FarmCultureRepository,
  ],
})
export class DatabaseModule {}
