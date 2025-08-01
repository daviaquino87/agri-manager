import { Module } from '@nestjs/common';
import { EnvModule } from '@/infra/env/env.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@/infra/env/env-schema';
import { ProducersModule } from '@//modules/producers/producers.module';
import { FarmsModule } from '@/modules/farms/farms.module';
import { CropsModule } from '@/modules/crops/crops.module';
import { HarvestsModule } from '@/modules/harvests/harvests.modulo';
import { FarmsCulturesModule } from '@/modules/farms-cultures/farms-cultures.module';
import { DashboardModule } from '@/modules/dashboard/dashboard.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    DashboardModule,
    DatabaseModule,
    ProducersModule,
    FarmsModule,
    CropsModule,
    HarvestsModule,
    FarmsCulturesModule,
    HealthCheckModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
