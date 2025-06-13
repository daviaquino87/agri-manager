import { Module } from '@nestjs/common';
import { DashboardController } from '@/modules/dashboard/controllers/dashboard.controller';
import { getDashboardDataUseCase } from '@/modules/dashboard/use-cases/get-dashboard-data/get-dashboard-data.usecase';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [getDashboardDataUseCase],
})
export class DashboardModule {}
