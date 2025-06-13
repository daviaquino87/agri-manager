import { Controller, Get } from '@nestjs/common';
import { getDashboardDataUseCase } from '../use-cases/get-dashboard-data/get-dashboard-data.usecase';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardResponseDTO } from '../dtos/dashboard-response.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getDashboardDataUseCase: getDashboardDataUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obter o conteudo do dashboard' })
  @ApiResponse({
    status: 200,
    description:
      'Retorna um objeto com os dados do dashboard, sendo eles: amountFarms, totalArea, stateDistribution, cropDistribution, landUseDistribution',
    type: DashboardResponseDTO,
  })
  async getDashboardData(): Promise<DashboardResponseDTO> {
    return this.getDashboardDataUseCase.execute();
  }
}
