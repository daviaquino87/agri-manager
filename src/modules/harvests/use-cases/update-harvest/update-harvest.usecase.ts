import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IHarvest } from '../../entities/harvest.entity';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { UpdateHarvestDTO } from '../../dtos/update-harvest.dto';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

interface IExecuteInput {
  id: string;
  updateHarvestDto: UpdateHarvestDTO;
}

interface IExecuteOutput {
  harvest: IHarvest;
}

@Injectable()
export class UpdateHarvestUseCase {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  async execute({
    id,
    updateHarvestDto,
  }: IExecuteInput): Promise<IExecuteOutput> {
    try {
      if (!id) {
        throw new BadRequestException(
          'erro ao atualizar colheita: o campo id deve ser preenchido',
        );
      }

      const harvest = await this.harvestRepository.update(id, updateHarvestDto);

      return { harvest };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.RECORD_NOT_FOUND) {
          throw new NotFoundException(
            'erro ao atualizar colheita: Colheita nao encontrada',
          );
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('erro ao atualizar colheita');
    }
  }
}
