export interface StateDistribution {
  state: string;
  count: number;
}

export interface CropDistribution {
  crop: string;
  count: number;
}

export interface LandUseDistribution {
  type: string;
  area: number;
}

export abstract class DashboardRepository {
  abstract getAmountFarms(): Promise<number>;
  abstract getSumOfTotalArea(): Promise<number>;
  abstract getStateDistribution(): Promise<StateDistribution[]>;
  abstract getCropDistribution(): Promise<CropDistribution[]>;
  abstract getLandUseDistribution(): Promise<LandUseDistribution[]>;
}
