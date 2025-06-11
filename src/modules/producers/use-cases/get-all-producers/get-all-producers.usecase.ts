import { BadRequestException, Injectable } from '@nestjs/common';
import { ProducerRepository } from '../../repositories/producer.repository';
import { IProducer } from '../../entities/producer.entity';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { validateDTO } from '@/common/utils/validateDto';
import { GetProducersParamsDTO } from '../../dtos/get-producers-params.dto';

interface IExecuteInput {
  getProducersParamsDto: GetProducersParamsDTO;
}

interface IExecuteOutput {
  producers: PaginatedOutputDTO<IProducer>;
}

@Injectable()
export class GetAllProducersUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute({
    getProducersParamsDto,
  }: IExecuteInput): Promise<IExecuteOutput> {
    const { dtoValidated, error } = await validateDTO(
      GetProducersParamsDTO,
      getProducersParamsDto,
    );

    if (error) {
      throw new BadRequestException(error);
    }

    const data = await this.producerRepository.findAll(dtoValidated!);

    return { producers: data };
  }
}
