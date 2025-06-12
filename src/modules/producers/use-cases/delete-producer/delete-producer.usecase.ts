import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProducerRepository } from '../../repositories/producer.repository';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

interface IExecuteInput {
  id: string;
}

@Injectable()
export class DeleteProducerUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute({ id }: IExecuteInput): Promise<void> {
    if (!id) {
      throw new NotFoundException('Produtor não encontrado');
    }

    try {
      await this.producerRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.RECORD_NOT_FOUND) {
          throw new NotFoundException('Produtor não encontrado');
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('Erro ao deletar produtor');
    }
  }
}
