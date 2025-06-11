import { Body, Controller, Post } from '@nestjs/common';
import { CreateProducerUseCase } from '../use-cases/create-producer/create-producer.usecase';
import { CreateProducerDTO } from '../dtos/create-producer.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('producers')
export class ProducersController {
  constructor(private createProducerUseCase: CreateProducerUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Cria um produtor' })
  async create(@Body() createProducerDto: CreateProducerDTO): Promise<void> {
    await this.createProducerUseCase.execute({
      createProducerDto,
    });
  }
}
