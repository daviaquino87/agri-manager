import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FarmRepository } from '../../repositories/farm.repository';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

interface IExecuteInput {
  id: string;
}

@Injectable()
export class DeleteFarmUseCase {
  constructor(private readonly farmRepository: FarmRepository) {}

  async execute({ id }: IExecuteInput): Promise<void> {
    try {
      if (!id) {
        throw new BadRequestException(
          'erro ao deletar fazenda: o campo id deve ser preenchido',
        );
      }

      await this.farmRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.RECORD_NOT_FOUND) {
          throw new NotFoundException(
            'erro ao deletar fazenda: Fazenda nao encontrada',
          );
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('erro ao deletar fazenda');
    }
  }
}
