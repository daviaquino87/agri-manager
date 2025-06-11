import { IProducer } from '@/modules/producers/entities/producer.entity';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProducerRepository implements ProducerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProducerDto: IProducer): Promise<void> {
    await this.prismaService.producer.create({
      data: {
        id: String(createProducerDto.id),
        name: createProducerDto.name,
        document: createProducerDto.document,
      },
    });
  }
}
