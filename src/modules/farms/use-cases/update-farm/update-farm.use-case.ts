import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FarmRepository } from '@/modules/farms/repositories/farm.repository';
import { IFarm } from '@/modules/farms/entities/farm.entity';
import { validateDTO } from '@/common/utils/validateDto';
import { UpdateFarmDTO } from '@/modules/farms/dtos/update-farm.dto';
import { PRISMA_ERRORS } from '@/common/constants/prisma-erros';
import { Prisma } from '@prisma/client';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';

interface IExecuteInput {
  id: string;
  updateFarmDto: UpdateFarmDTO;
}

interface IExecuteOutput {
  farm: IFarm;
}

@Injectable()
export class UpdateFarmUseCase {
  constructor(
    private readonly farmRepository: FarmRepository,
    private readonly producerRepository: ProducerRepository,
  ) {}

  private ensureFarmAreaIsValid(createFarmDto: UpdateFarmDTO) {
    if (
      createFarmDto.totalAreaInHectares !==
      createFarmDto.agricultureAreaInHectares +
        createFarmDto.vegetationAreaInHectares
    ) {
      throw new BadRequestException(
        'erro ao criar fazenda: A area total da fazenda deve ser igual a soma das areas de agricultura e vegetacao',
      );
    }
  }

  private async ensureProducerIsValid(producerId: string) {
    const producer = await this.producerRepository.findById(producerId);

    if (!producer) {
      throw new BadRequestException(
        'erro ao criar fazenda: O produtor informado nao existe',
      );
    }
  }

  async execute({ id, updateFarmDto }: IExecuteInput): Promise<IExecuteOutput> {
    try {
      const { dtoValidated, error } = await validateDTO(
        UpdateFarmDTO,
        updateFarmDto,
      );

      if (error) {
        throw new BadRequestException(error);
      }

      this.ensureFarmAreaIsValid(dtoValidated!);
      await this.ensureProducerIsValid(dtoValidated!.producerId);

      const farm = await this.farmRepository.update(id, dtoValidated!);

      return { farm };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERRORS.RECORD_NOT_FOUND) {
          throw new NotFoundException(
            'erro ao atualizar fazenda: Fazenda nao encontrada',
          );
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('erro ao atualizar fazenda');
    }
  }
}
