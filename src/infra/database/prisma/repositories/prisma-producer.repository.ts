import { IProducer } from '@/modules/producers/entities/producer.entity';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { GetProducersParamsDTO } from '@/modules/producers/dtos/get-producers-params.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { createPaginator } from '../utils/prisma-paginate';

@Injectable()
export class PrismaProducerRepository implements ProducerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProducerDto: IProducer,
    txn?: Prisma.TransactionClient,
  ): Promise<IProducer> {
    const connection = txn ?? this.prismaService;

    return connection.producer.create({
      data: {
        id: String(createProducerDto.id),
        name: createProducerDto.name,
        document: createProducerDto.document,
      },
    });
  }

  async update(
    id: string,
    updateProducerDto: Partial<IProducer>,
    txn?: Prisma.TransactionClient,
  ): Promise<IProducer> {
    const connection = txn ?? this.prismaService;

    return connection.producer.update({
      where: {
        id,
      },
      data: {
        name: updateProducerDto.name,
        document: updateProducerDto.document,
      },
    });
  }

  async findAll({
    page,
    perPage,
  }: GetProducersParamsDTO): Promise<PaginatedOutputDTO<IProducer>> {
    const paginate = createPaginator({ perPage });

    return paginate<IProducer, Prisma.ProducerFindManyArgs>(
      this.prismaService.producer,
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

  async findById(id: string): Promise<IProducer | null> {
    return this.prismaService.producer.findUnique({
      where: {
        id,
      },
    });
  }
}
