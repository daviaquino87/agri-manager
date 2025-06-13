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
import { ApiOperation } from '@nestjs/swagger';
import { CreateFarmCultureUseCase } from '../use-cases/create-farm-culture/create-farm-culture.usecase';
import { UpdateFarmCultureUseCase } from '../use-cases/update-farm-culture/update-farm-culture.usecase';
import { GetAllFarmsCulturesUseCase } from '../use-cases/get-all-farms-cultures/get-all-farms-cultures.usecase';
import { GetFarmCultureByIdUseCase } from '../use-cases/get-farm-culture-by-id/get-farm-culture-by-id.usecase';
import { DeleteFarmCultureUseCase } from '../use-cases/delete-farm-culture/delete-farm-culture.usecase';
import { CreateFarmCultureDTO } from '../dtos/create-farm-culture.dto';
import { UpdateFarmCultureDTO } from '../dtos/update-farm-culture.dto';
import { FarmCultureOutputDTO } from '../dtos/farm-culture-output.dto';
import { GetAllFarmsCulturesDTO } from '../dtos/get-all-farms-cultures.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';

@Controller('farms-cultures')
export class FarmsCulturesController {
  constructor(
    private createFarmCultureUseCase: CreateFarmCultureUseCase,
    private updateFarmCultureUseCase: UpdateFarmCultureUseCase,
    private getAllFarmsCulturesUseCase: GetAllFarmsCulturesUseCase,
    private getFarmCultureByIdUseCase: GetFarmCultureByIdUseCase,
    private deleteFarmCultureUseCase: DeleteFarmCultureUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma cultura de fazenda' })
  async create(
    @Body() createFarmCultureDto: CreateFarmCultureDTO,
  ): Promise<FarmCultureOutputDTO> {
    const { farmCulture } = await this.createFarmCultureUseCase.execute({
      createFarmCultureDto,
    });

    return FarmCultureOutputDTO.toHttp(farmCulture);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma cultura de fazenda' })
  async update(
    @Param('id') id: string,
    @Body() updateFarmCultureDto: UpdateFarmCultureDTO,
  ): Promise<FarmCultureOutputDTO> {
    const { farmCulture } = await this.updateFarmCultureUseCase.execute({
      id,
      updateFarmCultureDto,
    });

    return FarmCultureOutputDTO.toHttp(farmCulture);
  }

  @ApiPaginatedResponse(FarmCultureOutputDTO)
  @Get()
  @ApiOperation({ summary: 'Lista todas as culturas de fazenda' })
  async findAll(
    @Query() getAllFarmsCulturesDto: GetAllFarmsCulturesDTO,
  ): Promise<PaginatedOutputDTO<FarmCultureOutputDTO>> {
    const { data } = await this.getAllFarmsCulturesUseCase.execute({
      getAllFarmsCulturesDto,
    });

    return {
      data: data.data.map(FarmCultureOutputDTO.toHttp),
      meta: data.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma cultura de fazenda por ID' })
  async findById(@Param('id') id: string): Promise<FarmCultureOutputDTO> {
    const { farmCulture } = await this.getFarmCultureByIdUseCase.execute({
      id,
    });

    return FarmCultureOutputDTO.toHttp(farmCulture);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma cultura de fazenda' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteFarmCultureUseCase.execute({ id });
  }
}
