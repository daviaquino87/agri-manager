import { PrismaService } from '../prisma.service';
import { GetHarvestParamsDTO } from '@/modules/harvests/dtos/get-harvest-prams.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { createPaginator } from '../utils/prisma-paginate';
import { Injectable } from '@nestjs/common';
import { FarmCultureRepository } from '@/modules/farms-cultures/repositories/farm-culture.repository';
import { Prisma } from '@prisma/client';
import { IFarmCulture } from '@/modules/farms-cultures/entities/farm-culture.entity';
import { GetAllFarmsCulturesDTO } from '@/modules/farms-cultures/dtos/get-all-farms-cultures.dto';

@Injectable()
export class PrismaFarmsCulturesRepository implements FarmCultureRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    data: IFarmCulture,
    txn?: Prisma.TransactionClient,
  ): Promise<IFarmCulture> {
    const connection = txn ?? this.prismaService;

    return connection.farmCulture.create({
      data: {
        id: String(data.id),
        cropId: String(data.cropId),
        farmId: String(data.farmId),
        harvestId: String(data.harvestId),
      },
    });
  }

  async update(
    id: string,
    data: Partial<IFarmCulture>,
    txn?: Prisma.TransactionClient,
  ): Promise<IFarmCulture> {
    const connection = txn ?? this.prismaService;

    return connection.farmCulture.update({
      where: {
        id,
      },
      data: {
        cropId: String(data.cropId),
        farmId: String(data.farmId),
        harvestId: String(data.harvestId),
      },
    });
  }

  async findAll({
    page,
    perPage,
  }: GetAllFarmsCulturesDTO): Promise<PaginatedOutputDTO<IFarmCulture>> {
    const paginate = createPaginator({ perPage });

    return paginate<IFarmCulture, Prisma.FarmCultureFindManyArgs>(
      this.prismaService.farmCulture,
      {
        orderBy: {
          createdAt: 'desc',
        },
      },
      {
        page,
      },
    );
  }

  async findById(id: string): Promise<IFarmCulture> {
    return this.prismaService.farmCulture.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string, txn?: Prisma.TransactionClient): Promise<void> {
    const connection = txn ?? this.prismaService;

    await connection.farmCulture.delete({
      where: {
        id,
      },
    });
  }
}
