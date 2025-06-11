import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateProducerUseCase } from '../use-cases/create-producer/create-producer.usecase';
import { CreateProducerDTO } from '../dtos/create-producer.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateProducerDTO } from '../dtos/update-producer.dto';
import { UpdateProducerUseCase } from '../use-cases/update-producer/update-producer.usecase';

@Controller('producers')
export class ProducersController {
  constructor(
    private createProducerUseCase: CreateProducerUseCase,
    private updateProducerUseCase: UpdateProducerUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um produtor' })
  async create(@Body() createProducerDto: CreateProducerDTO): Promise<void> {
    await this.createProducerUseCase.execute({
      createProducerDto,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um produtor' })
  async update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDTO,
  ): Promise<void> {
    await this.updateProducerUseCase.execute({
      id,
      updateProducerDto,
    });
  }
}
