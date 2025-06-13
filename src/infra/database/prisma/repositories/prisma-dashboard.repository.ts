import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import {
  DashboardRepository,
  StateDistribution,
  CropDistribution,
  LandUseDistribution,
} from '@/modules/dashboard/repositories/dashboard.repository';

@Injectable()
export class PrismaDashboardRepository implements DashboardRepository {
  constructor(private prisma: PrismaService) {}

  async getAmountFarms(): Promise<number> {
    return this.prisma.farm.count();
  }

  async getSumOfTotalArea(): Promise<number> {
    const result = await this.prisma.farm.aggregate({
      _sum: {
        totalAreaInHectares: true,
      },
    });
    return result._sum.totalAreaInHectares || 0;
  }

  async getStateDistribution(): Promise<StateDistribution[]> {
    const farms = await this.prisma.farm.groupBy({
      by: ['state'],
      _count: {
        state: true,
      },
    });

    return farms.map((farm) => ({
      state: farm.state,
      count: farm._count.state,
    }));
  }

  async getCropDistribution(): Promise<CropDistribution[]> {
    const crops = await this.prisma.crop.groupBy({
      by: ['name'],
      _count: {
        name: true,
      },
    });

    return crops.map((crop) => ({
      crop: crop.name,
      count: crop._count.name,
    }));
  }

  async getLandUseDistribution(): Promise<LandUseDistribution[]> {
    const farms = await this.prisma.farm.findMany({
      select: {
        agricultureAreaInHectares: true,
        vegetationAreaInHectares: true,
      },
    });

    const totalAgriculturalArea = farms.reduce(
      (sum, farm) => sum + (farm.agricultureAreaInHectares || 0),
      0,
    );
    const totalVegetationArea = farms.reduce(
      (sum, farm) => sum + (farm.vegetationAreaInHectares || 0),
      0,
    );

    return [
      {
        type: 'Agricultural Area',
        area: totalAgriculturalArea,
      },
      {
        type: 'Vegetation Area',
        area: totalVegetationArea,
      },
    ];
  }
}
