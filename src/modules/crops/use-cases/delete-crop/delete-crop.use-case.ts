import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

export interface IDeleteCropInput {
  id: string;
}

@Injectable()
export class DeleteCropUseCase {
  constructor(private readonly cropsRepository: CropRepository) {}

  async execute({ id }: IDeleteCropInput): Promise<void> {
    try {
      if (!id) {
        throw new BadRequestException(
          'erro ao deletar plantação: o campo id deve ser preenchido',
        );
      }

      await this.cropsRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.RECORD_NOT_FOUND) {
          throw new NotFoundException(
            'erro ao deletar plantação: Plantação nao encontrada',
          );
        }

        if (error instanceof HttpException) {
          throw error;
        }

        throw new BadRequestException(
          'erro ao deletar plantação: Erro ao deletar plantação',
        );
      }
    }
  }
}
