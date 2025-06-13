import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FarmCultureRepository } from '@/modules/farms-cultures/repositories/farm-culture.repository';
import { Prisma } from '@prisma/client';

interface IExecuteInput {
  id: string;
}

@Injectable()
export class DeleteFarmCultureUseCase {
  constructor(private readonly farmCultureRepository: FarmCultureRepository) {}

  async execute({ id }: IExecuteInput): Promise<void> {
    try {
      if (!id) {
        throw new BadRequestException(
          'erro ao deletar cultura: o campo id deve ser preenchido',
        );
      }

      await this.farmCultureRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(
          'erro ao deletar cultura: cultura nao encontrada',
        );
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('erro ao deletar cultura');
    }
  }
}
