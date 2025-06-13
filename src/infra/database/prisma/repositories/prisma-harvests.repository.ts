import { IHarvest } from '@/modules/harvests/entities/harvest.entity';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { GetHarvestParamsDTO } from '@/modules/harvests/dtos/get-harvest-prams.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { createPaginator } from '../utils/prisma-paginate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaHarvestsRepository implements HarvestRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    data: IHarvest,
    txn?: Prisma.TransactionClient,
  ): Promise<IHarvest> {
    const connection = txn ?? this.prismaService;

    return connection.harvest.create({
      data: {
        id: String(data.id),
        year: data.year,
      },
    });
  }

  async update(
    id: string,
    data: Partial<IHarvest>,
    txn?: Prisma.TransactionClient,
  ): Promise<IHarvest> {
    const connection = txn ?? this.prismaService;

    return connection.harvest.update({
      where: {
        id,
      },
      data: {
        year: data.year,
      },
    });
  }

  async findAll({
    page,
    perPage,
  }: GetHarvestParamsDTO): Promise<PaginatedOutputDTO<IHarvest>> {
    const paginate = createPaginator({ perPage });

    return paginate<IHarvest, Prisma.HarvestFindManyArgs>(
      this.prismaService.harvest,
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

  async findById(id: string): Promise<IHarvest> {
    return this.prismaService.harvest.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string, txn?: Prisma.TransactionClient): Promise<void> {
    const connection = txn ?? this.prismaService;

    await connection.harvest.delete({
      where: {
        id,
      },
    });
  }
}
