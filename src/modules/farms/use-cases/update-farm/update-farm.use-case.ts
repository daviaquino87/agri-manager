import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { FarmRepository } from '../../repositories/farm.repository';
import { IFarm } from '../../entities/farm.entity';
import { validateDTO } from '@/common/utils/validateDto';
import { UpdateFarmDTO } from '../../dtos/update-farm.dto';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';
import { Prisma } from '@prisma/client';

interface IExecuteInput {
  id: string;
  updateFarmDto: UpdateFarmDTO;
}

interface IExecuteOutput {
  farm: IFarm;
}

@Injectable()
export class UpdateFarmUseCase {
  constructor(private readonly farmRepository: FarmRepository) {}

  async execute({ id, updateFarmDto }: IExecuteInput): Promise<IExecuteOutput> {
    try {
      const { dtoValidated, error } = await validateDTO(
        UpdateFarmDTO,
        updateFarmDto,
      );

      if (error) {
        throw new BadRequestException(error);
      }

      const farm = await this.farmRepository.update(id, dtoValidated!);

      return { farm };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.RECORD_NOT_FOUND) {
          throw new BadRequestException('Fazenda nao encontrada');
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('Erro ao atualizar fazenda');
    }
  }
}
