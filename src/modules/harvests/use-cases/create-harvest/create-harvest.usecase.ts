import { BadRequestException, Injectable } from '@nestjs/common';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { CreateHarvestDTO } from '@/modules/harvests/dtos/create-harvest.dto';
import { IHarvest } from '@/modules/harvests/entities/harvest.entity';
import { validateDTO } from '@/common/utils/validateDto';
import { randomUUID } from 'crypto';

interface IExecuteInput {
  createHarvestDto: CreateHarvestDTO;
}

interface IExecuteOutput {
  harvest: IHarvest;
}

@Injectable()
export class CreateHarvestUseCase {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  async execute({ createHarvestDto }: IExecuteInput): Promise<IExecuteOutput> {
    try {
      const { dtoValidated, error } = await validateDTO(
        CreateHarvestDTO,
        createHarvestDto,
      );

      if (error) {
        throw new BadRequestException(error);
      }

      const harvest = await this.harvestRepository.create({
        id: randomUUID(),
        year: dtoValidated!.year,
      });

      return { harvest };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('erro ao criar colheita');
    }
  }
}
