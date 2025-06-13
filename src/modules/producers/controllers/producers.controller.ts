import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { GetProducerByIdUseCase } from '../use-cases/get-producer-by-id/get-producer-by-id.usecase';
import { DeleteProducerUseCase } from '../use-cases/delete-producer/delete-producer.usecase';
import { ProducerDetailsOutputDTO } from '../dtos/producer-details.output.dto';

@Controller('producers')
export class ProducersController {
  constructor(
    private createProducerUseCase: CreateProducerUseCase,
    private updateProducerUseCase: UpdateProducerUseCase,
    private getAllProducersUseCase: GetAllProducersUseCase,
    private getProducerByIdUseCase: GetProducerByIdUseCase,
    private deleteProducerUseCase: DeleteProducerUseCase,
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

  @Put(':id')
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

  @Get(':id')
  @ApiOperation({ summary: 'Busca um produtor por ID' })
  async findById(@Param('id') id: string): Promise<ProducerDetailsOutputDTO> {
    const { producer } = await this.getProducerByIdUseCase.execute({ id });

    return ProducerDetailsOutputDTO.toHttp(producer);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um produtor' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteProducerUseCase.execute({ id });
  }
}
