import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../../repositories/dashboard.repository';
import { DashboardResponseDTO } from '../../dtos/dashboard-response.dto';

@Injectable()
export class getDashboardDataUseCase {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async execute(): Promise<DashboardResponseDTO> {
    const [
      amountFarms,
      totalArea,
      stateDistribution,
      cropDistribution,
      landUseDistribution,
    ] = await Promise.all([
      this.dashboardRepository.getAmountFarms(),
      this.dashboardRepository.getSumOfTotalArea(),
      this.dashboardRepository.getStateDistribution(),
      this.dashboardRepository.getCropDistribution(),
      this.dashboardRepository.getLandUseDistribution(),
    ]);

    return {
      amountFarms,
      totalArea,
      stateDistribution,
      cropDistribution,
      landUseDistribution,
    };
  }
}
