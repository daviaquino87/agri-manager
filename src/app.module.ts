import { Module } from '@nestjs/common';
import { EnvModule } from '@/infra/env/env.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './infra/env/env-schema';
import { ProducersModule } from './modules/producers/producers.module';
import { FarmModule } from './modules/farms/farm.module';
import { CropsModule } from './modules/crops/crops.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    DatabaseModule,
    ProducersModule,
    FarmModule,
    CropsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
