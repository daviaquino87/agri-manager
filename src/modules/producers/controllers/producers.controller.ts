import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProducerUseCase } from '../use-cases/create-producer/create-producer.usecase';
import { CreateProducerDTO } from '../dtos/create-producer.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateProducerDTO } from '../dtos/update-producer.dto';
import { UpdateProducerUseCase } from '../use-cases/update-producer/update-producer.usecase';
import { GetAllProducersUseCase } from '../use-cases/get-all-producers/get-all-producers.usecase';
import { ProducerOutputDTO } from '../dtos/producer-output.dto';
import { GetProducersParamsDTO } from '../dtos/get-producers-params.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';

@Controller('producers')
export class ProducersController {
  constructor(
    private createProducerUseCase: CreateProducerUseCase,
    private updateProducerUseCase: UpdateProducerUseCase,
    private getAllProducersUseCase: GetAllProducersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um produtor' })
  async create(
    @Body() createProducerDto: CreateProducerDTO,
  ): Promise<ProducerOutputDTO> {
    const { producer } = await this.createProducerUseCase.execute({
      createProducerDto,
    });

    return ProducerOutputDTO.toHttp(producer);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um produtor' })
  async update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDTO,
  ): Promise<ProducerOutputDTO> {
    const { producer } = await this.updateProducerUseCase.execute({
      id,
      updateProducerDto,
    });

    return ProducerOutputDTO.toHttp(producer);
  }

  @ApiPaginatedResponse(ProducerOutputDTO)
  @Get()
  @ApiOperation({ summary: 'Lista todos os produtores' })
  async findAll(
    @Query() getProducersParamsDto: GetProducersParamsDTO,
  ): Promise<PaginatedOutputDTO<ProducerOutputDTO>> {
    const { producers } = await this.getAllProducersUseCase.execute({
      getProducersParamsDto: {
        page: getProducersParamsDto.page,
        perPage: getProducersParamsDto.perPage,
      },
    });

    return {
      data: producers.data.map(ProducerOutputDTO.toHttp),
      meta: producers.meta,
    };
  }
}
