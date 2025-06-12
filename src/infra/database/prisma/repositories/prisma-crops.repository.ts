import { ICrop } from '@/modules/crops/entities/crop.entity';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { GetCropsParamsDTO } from '@/modules/crops/dtos/get-crops-params.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { createPaginator } from '../utils/prisma-paginate';

@Injectable()
export class PrismaCropRepository implements CropRepository {
  constructor(private prismaService: PrismaService) {}

  async create(crop: ICrop, txn?: Prisma.TransactionClient): Promise<ICrop> {
    const connection = txn ?? this.prismaService;

    return connection.crop.create({
      data: {
        id: String(crop.id),
        name: crop.name,
      },
    });
  }

  async update(
    id: string,
    crop: Partial<ICrop>,
    txn?: Prisma.TransactionClient,
  ): Promise<ICrop> {
    const connection = txn ?? this.prismaService;

    return connection.crop.update({
      where: {
        id,
      },
      data: {
        name: crop.name,
      },
    });
  }

  async findAll({
    page,
    perPage,
  }: GetCropsParamsDTO): Promise<PaginatedOutputDTO<ICrop>> {
    const paginate = createPaginator({ perPage });

    return paginate<ICrop, Prisma.CropFindManyArgs>(
      this.prismaService.crop,
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

  async findById(id: string): Promise<ICrop> {
    return this.prismaService.crop.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string, txn?: Prisma.TransactionClient): Promise<void> {
    const connection = txn ?? this.prismaService;

    await connection.crop.delete({
      where: {
        id,
      },
    });
  }
}
