import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFarmCultureDTO } from '../../dtos/create-farm-culture.dto';
import { IFarmCulture } from '../../entities/farm-culture.entity';
import { validateDTO } from '@/common/utils/validateDto';
import { FarmCultureRepository } from '../../repositories/farm-culture.repository';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { randomUUID } from 'node:crypto';

interface IExecuteInput {
  createFarmCultureDto: CreateFarmCultureDTO;
}

interface IExecuteOutput {
  farmCulture: IFarmCulture;
}

@Injectable()
export class CreateFarmCultureUseCase {
  constructor(
    private readonly farmCultureRepository: FarmCultureRepository,
    private readonly farmRepository: FarmRepository,
    private readonly cropRepository: CropRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  private async ensureFarmIsValid(farmId: string) {
    const farm = await this.farmRepository.findById(farmId);

    if (!farm) {
      throw new BadRequestException(
        'erro ao criar cultura: fazenda nao encontrada',
      );
    }
  }

  private async ensureCropIsValid(cropId: string) {
    const crop = await this.cropRepository.findById(cropId);

    if (!crop) {
      throw new BadRequestException(
        'erro ao criar cultura: cultivo nao encontrado',
      );
    }
  }

  private async ensureHarvestIsValid(harvestId: string) {
    const harvest = await this.harvestRepository.findById(harvestId);

    if (!harvest) {
      throw new BadRequestException(
        'erro ao criar cultura: colheita nao encontrada',
      );
    }
  }

  async execute({
    createFarmCultureDto,
  }: IExecuteInput): Promise<IExecuteOutput> {
    const { dtoValidated, error } = await validateDTO(
      CreateFarmCultureDTO,
      createFarmCultureDto,
    );

    if (error) {
      throw new BadRequestException(error);
    }

    await Promise.all([
      this.ensureFarmIsValid(dtoValidated!.farmId),
      this.ensureCropIsValid(dtoValidated!.cropId),
      this.ensureHarvestIsValid(dtoValidated!.harvestId),
    ]);

    const farmCulture = await this.farmCultureRepository.create({
      id: randomUUID(),
      cropId: dtoValidated!.cropId,
      farmId: dtoValidated!.farmId,
      harvestId: dtoValidated!.harvestId,
    });

    return {
      farmCulture,
    };
  }
}
