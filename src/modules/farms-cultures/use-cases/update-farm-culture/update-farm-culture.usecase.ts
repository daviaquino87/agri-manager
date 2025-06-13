import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IFarmCulture } from '../../entities/farm-culture.entity';
import { validateDTO } from '@/common/utils/validateDto';
import { FarmCultureRepository } from '../../repositories/farm-culture.repository';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { CropRepository } from '@/modules/crops/repositories/crop.repository';
import { HarvestRepository } from '@/modules/harvests/repositories/harvest.repository';
import { UpdateFarmCultureDTO } from '../../dtos/update-farm-culture.dto';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';

interface IExecuteInput {
  id: string;
  updateFarmCultureDto: UpdateFarmCultureDTO;
}

interface IExecuteOutput {
  farmCulture: IFarmCulture;
}

@Injectable()
export class UpdateFarmCultureUseCase {
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
    id,
    updateFarmCultureDto,
  }: IExecuteInput): Promise<IExecuteOutput> {
    try {
      const { dtoValidated, error } = await validateDTO(
        UpdateFarmCultureDTO,
        updateFarmCultureDto,
      );

      if (error) {
        throw new BadRequestException(error);
      }

      await Promise.all([
        this.ensureFarmIsValid(dtoValidated!.farmId),
        this.ensureCropIsValid(dtoValidated!.cropId),
        this.ensureHarvestIsValid(dtoValidated!.harvestId),
      ]);

      const farmCulture = await this.farmCultureRepository.update(
        id,
        dtoValidated!,
      );

      return {
        farmCulture,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.RECORD_NOT_FOUND) {
          throw new NotFoundException(
            'erro ao atualizar cultura: cultura nao encontrada',
          );
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('erro ao atualizar cultura');
    }
  }
}
