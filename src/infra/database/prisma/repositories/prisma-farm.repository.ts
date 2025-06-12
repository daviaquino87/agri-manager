import { IFarm } from '@/modules/farms/entities/farm.entity';
import { PrismaService } from '../prisma.service';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { Prisma } from '@prisma/client';
import { GetFarmsParamsDTO } from '@/modules/farms/dtos/get-farms-params.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { createPaginator } from '../utils/prisma-paginate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaFarmRepository implements FarmRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: any, txn?: any): Promise<any> {
    const connection = txn || this.prismaService;

    return connection.farm.create({
      data: {
        id: data.id,
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

  async update(
    id: string,
    updateProducerDto: Partial<IFarm>,
    txn?: Prisma.TransactionClient,
  ): Promise<IFarm> {
    const connection = txn ?? this.prismaService;

    return connection.farm.update({
      where: {
        id,
      },
      data: {
        name: updateProducerDto.name,
        city: updateProducerDto.city,
        state: updateProducerDto.state,
        totalAreaInHectares: updateProducerDto.totalAreaInHectares,
        agricultureAreaInHectares: updateProducerDto.agricultureAreaInHectares,
        vegetationAreaInHectares: updateProducerDto.vegetationAreaInHectares,
        producerId: updateProducerDto.producerId,
      },
    });
  }

  async findAll({
    page,
    perPage,
  }: GetFarmsParamsDTO): Promise<PaginatedOutputDTO<IFarm>> {
    const paginate = createPaginator({ perPage });

    return paginate<IFarm, Prisma.FarmFindManyArgs>(
      this.prismaService.farm,
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

  async findById(id: string): Promise<IFarm> {
    return this.prismaService.farm.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string, txn?: Prisma.TransactionClient): Promise<void> {
    const connection = txn ?? this.prismaService;

    await connection.farm.delete({
      where: {
        id,
      },
    });
  }
}
