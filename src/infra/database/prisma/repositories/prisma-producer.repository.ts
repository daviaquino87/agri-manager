import { IProducer } from '@/modules/producers/entities/producer.entity';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

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
}
