import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { PrismaProducerRepository } from '@/infra/database/prisma/repositories/prisma-producer.repository';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { PrismaFarmRepository } from '@/infra/database/prisma/repositories/prisma-farm.repository';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { PrismaCropRepository } from '@/infra/database/prisma/repositories/prisma-crops.repository';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { PrismaHarvestsRepository } from '@/infra/database/prisma/repositories/prisma-harvests.repository';
import { FarmCultureRepository } from '@/modules/farms-cultures/repositories/farm-culture.repository';
import { PrismaFarmsCulturesRepository } from '@/infra/database/prisma/repositories/prisma-farms-cultures.repository';
import { DashboardRepository } from '@/modules/dashboard/repositories/dashboard.repository';
import { PrismaDashboardRepository } from '@/infra/database/prisma/repositories/prisma-dashboard.repository';

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
    {
      provide: DashboardRepository,
      useClass: PrismaDashboardRepository,
    },
  ],
  exports: [
    PrismaService,
    ProducerRepository,
    FarmRepository,
    CropRepository,
    HarvestRepository,
    FarmCultureRepository,
    DashboardRepository,
  ],
})
export class DatabaseModule {}
