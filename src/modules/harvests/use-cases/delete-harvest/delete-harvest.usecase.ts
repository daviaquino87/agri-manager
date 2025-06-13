import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

interface IExecuteInput {
  id: string;
}

@Injectable()
export class DeleteHarvestUseCase {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  async execute({ id }: IExecuteInput): Promise<void> {
    try {
      if (!id) {
        throw new BadRequestException(
          'erro ao deletar colheita: o campo id deve ser preenchido',
        );
      }

      await this.harvestRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.RECORD_NOT_FOUND) {
          throw new NotFoundException(
            'erro ao deletar colheita: Colheita nao encontrada',
          );
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('erro ao deletar colheita');
    }
  }
}
