import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProducerDTO } from '../../dtos/update-producer.dto';
import { ProducerRepository } from '../../repositories/producer.repository';
import { validateDTO } from '@/common/utils/validateDto';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';
import { IProducer } from '../../entities/producer.entity';

interface IExecuteInput {
  id: string;
  updateProducerDto: UpdateProducerDTO;
}

interface IExecuteOutput {
  producer: IProducer;
}

@Injectable()
export class UpdateProducerUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute({
    id,
    updateProducerDto,
  }: IExecuteInput): Promise<IExecuteOutput> {
    try {
      const { dtoValidated, error } = await validateDTO(
        UpdateProducerDTO,
        updateProducerDto,
      );

      if (error) {
        throw new BadRequestException(error);
      }

      const producer = await this.producerRepository.update(id, dtoValidated!);

      return { producer };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.UNIQUE_CONSTRAINT_FAILED) {
          throw new ConflictException(
            'erro ao atualizar produtor: Ja existe um produtor com esse documento',
          );
        }
        if (error.code === PRISMA_ERRORS.RECORD_NOT_FOUND) {
          throw new NotFoundException('Produtor não encontrado');
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('Erro ao atualizar produtor');
    }
  }
}
