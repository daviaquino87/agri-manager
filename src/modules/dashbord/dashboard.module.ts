import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';
import { getDashboardDataUseCase } from './use-cases/get-dashboard-data/get-dashboard-data.usecase';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [getDashboardDataUseCase],
})
export class DashboardModule {}
