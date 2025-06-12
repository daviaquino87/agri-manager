import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateProducerDTO } from '../../dtos/create-producer.dto';
import { ProducerRepository } from '../../repositories/producer.repository';
import { randomUUID } from 'node:crypto';
import { validateDTO } from '@/common/utils/validateDto';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';
import { IProducer } from '../../entities/producer.entity';

interface IExecuteInput {
  createProducerDto: CreateProducerDTO;
}

interface IExecuteOutput {
  producer: IProducer;
}

@Injectable()
export class CreateProducerUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute({ createProducerDto }: IExecuteInput): Promise<IExecuteOutput> {
    try {
      const { dtoValidated, error } = await validateDTO(
        CreateProducerDTO,
        createProducerDto,
      );

      if (error) {
        throw new BadRequestException(error);
      }

      const producer = await this.producerRepository.create({
        id: randomUUID(),
        name: dtoValidated!.name,
        document: dtoValidated!.document,
      });

      return { producer };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.UNIQUE_CONSTRAINT_FAILED) {
          throw new ConflictException(
            'erro ao criar produtor: Ja existe um produtor com esse documento',
          );
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('erro ao criar produtor');
    }
  }
}
