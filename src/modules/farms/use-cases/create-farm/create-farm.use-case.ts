import { BadRequestException, Injectable } from '@nestjs/common';
import { FarmRepository } from '../../repositories/farm.repository';
import { IFarm } from '../../entities/farm.entity';
import { validateDTO } from '@/common/utils/validateDto';
import { CreateFarmDTO } from '../../dtos/create-farm.dto';
import { randomUUID } from 'crypto';
import { ProducerRepository } from '@/modules/producers/repositories/producer.repository';

interface IExecuteInput {
  createFarmDto: CreateFarmDTO;
}

interface IExecuteOutput {
  farm: IFarm;
}

@Injectable()
export class CreateFarmUseCase {
  constructor(
    private readonly farmRepository: FarmRepository,
    private readonly producerRepository: ProducerRepository,
  ) {}

  private ensureFarmAreaIsValid(createFarmDto: CreateFarmDTO) {
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

  async execute({ createFarmDto }: IExecuteInput): Promise<IExecuteOutput> {
    const { dtoValidated, error } = await validateDTO(
      CreateFarmDTO,
      createFarmDto,
    );

    if (error) {
      throw new BadRequestException(error);
    }

    this.ensureFarmAreaIsValid(dtoValidated!);
    await this.ensureProducerIsValid(dtoValidated!.producerId);

    const farm = await this.farmRepository.create({
      id: randomUUID(),
      name: dtoValidated!.name,
      agricultureAreaInHectares: dtoValidated!.agricultureAreaInHectares,
      city: dtoValidated!.city,
      producerId: dtoValidated!.producerId,
      state: dtoValidated!.state,
      totalAreaInHectares: dtoValidated!.totalAreaInHectares,
      vegetationAreaInHectares: dtoValidated!.vegetationAreaInHectares,
    });

    return { farm };
  }
}
