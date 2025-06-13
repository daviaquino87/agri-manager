import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getDashboardDataUseCase } from './get-dashboard-data.usecase';
import { DashboardRepository } from '../../repositories/dashboard.repository';

describe('getDashboardDataUseCase', () => {
  let useCase: getDashboardDataUseCase;
  let dashboardRepository: DashboardRepository;

  const mockDashboardData = {
    amountFarms: 10,
    totalArea: 5000,
    stateDistribution: [
      { state: 'SP', count: 5 },
      { state: 'RJ', count: 3 },
      { state: 'MG', count: 2 },
    ],
    cropDistribution: [
      { crop: 'Soja', count: 8 },
      { crop: 'Milho', count: 6 },
      { crop: 'Café', count: 4 },
    ],
    landUseDistribution: [
      { type: 'Agricultural Area', area: 3000 },
      { type: 'Vegetation Area', area: 2000 },
    ],
  };

  beforeEach(() => {
    dashboardRepository = {
      getAmountFarms: vi.fn().mockResolvedValue(mockDashboardData.amountFarms),
      getSumOfTotalArea: vi.fn().mockResolvedValue(mockDashboardData.totalArea),
      getStateDistribution: vi.fn().mockResolvedValue(mockDashboardData.stateDistribution),
      getCropDistribution: vi.fn().mockResolvedValue(mockDashboardData.cropDistribution),
      getLandUseDistribution: vi.fn().mockResolvedValue(mockDashboardData.landUseDistribution),
    };

    useCase = new getDashboardDataUseCase(dashboardRepository);
  });

  it('should return dashboard data successfully', async () => {
    const result = await useCase.execute();

    expect(result).toEqual(mockDashboardData);
    expect(dashboardRepository.getAmountFarms).toHaveBeenCalledTimes(1);
    expect(dashboardRepository.getSumOfTotalArea).toHaveBeenCalledTimes(1);
    expect(dashboardRepository.getStateDistribution).toHaveBeenCalledTimes(1);
    expect(dashboardRepository.getCropDistribution).toHaveBeenCalledTimes(1);
    expect(dashboardRepository.getLandUseDistribution).toHaveBeenCalledTimes(1);
  });

  it('should handle empty data correctly', async () => {
    const emptyData = {
      amountFarms: 0,
      totalArea: 0,
      stateDistribution: [],
      cropDistribution: [],
      landUseDistribution: [],
    };

    vi.mocked(dashboardRepository.getAmountFarms).mockResolvedValueOnce(emptyData.amountFarms);
    vi.mocked(dashboardRepository.getSumOfTotalArea).mockResolvedValueOnce(emptyData.totalArea);
    vi.mocked(dashboardRepository.getStateDistribution).mockResolvedValueOnce(emptyData.stateDistribution);
    vi.mocked(dashboardRepository.getCropDistribution).mockResolvedValueOnce(emptyData.cropDistribution);
    vi.mocked(dashboardRepository.getLandUseDistribution).mockResolvedValueOnce(emptyData.landUseDistribution);

    const result = await useCase.execute();

    expect(result).toEqual(emptyData);
  });

  it('should handle repository errors', async () => {
    const error = new Error('Database error');
    vi.mocked(dashboardRepository.getAmountFarms).mockRejectedValueOnce(error);

    await expect(useCase.execute()).rejects.toThrow('Database error');
  });
}); 