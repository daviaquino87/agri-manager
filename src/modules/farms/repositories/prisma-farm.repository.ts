import { Injectable } from '@nestjs/common';
import { FarmRepository } from './farm.repository';
import { IFarm } from '../entities/farm.entity';
import { GetFarmsParamsDTO } from '../dtos/get-farms-params.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaFarmRepository implements FarmRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: IFarm, txn?: any): Promise<IFarm> {
    const prisma = txn || this.prisma;
    return prisma.farm.create({
      data: {
        name: data.name,
        city: data.city,
        state: data.state,
        totalAreaInHectares: data.totalAreaInHectares,
        agricultureAreaInHectares: data.agricultureAreaInHectares,
        vegetationAreaInHectares: data.vegetationAreaInHectares,
        producerId: data.producerId,
      },
    });
  }

  async update(id: string, data: Partial<IFarm>, txn?: any): Promise<IFarm> {
    const prisma = txn || this.prisma;
    return prisma.farm.update({
      where: { id },
      data,
    });
  }

  async findById(id: string): Promise<IFarm | null> {
    return this.prisma.farm.findUnique({
      where: { id },
    });
  }

  async findAll(params: GetFarmsParamsDTO): Promise<PaginatedOutputDTO<IFarm>> {
    const { page = 1, perPage = 10 } = params;
    const skip = (page - 1) * perPage;

    const [total, data] = await Promise.all([
      this.prisma.farm.count(),
      this.prisma.farm.findMany({
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  }

  async delete(id: string, txn?: any): Promise<void> {
    const prisma = txn || this.prisma;
    await prisma.farm.delete({
      where: { id },
    });
  }

  async findByProducerId(producerId: string): Promise<IFarm[]> {
    return this.prisma.farm.findMany({
      where: { producerId },
    });
  }
}
