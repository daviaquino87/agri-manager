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
import { CreateFarmUseCase } from '../use-cases/create-farm/create-farm.use-case';
import { UpdateFarmUseCase } from '../use-cases/update-farm/update-farm.use-case';
import { GetAllFarmsUseCase } from '../use-cases/get-all-farms/get-all-farms.use-case';
import { GetFarmByIdUseCase } from '../use-cases/get-farm-by-id/get-farm-by-id.use-case';
import { DeleteFarmUseCase } from '../use-cases/delete-farm/delete-farm.use-case';
import { CreateFarmDTO } from '../dtos/create-farm.dto';
import { UpdateFarmDTO } from '../dtos/update-farm.dto';
import { GetFarmsParamsDTO } from '../dtos/get-farms-params.dto';
import { FarmOutputDTO } from '../dtos/farm-output.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';

@Controller('farms')
export class FarmController {
  constructor(
    private readonly createFarmUseCase: CreateFarmUseCase,
    private readonly updateFarmUseCase: UpdateFarmUseCase,
    private readonly getAllFarmsUseCase: GetAllFarmsUseCase,
    private readonly getFarmByIdUseCase: GetFarmByIdUseCase,
    private readonly deleteFarmUseCase: DeleteFarmUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova fazenda' })
  async create(@Body() createFarmDto: CreateFarmDTO): Promise<FarmOutputDTO> {
    const { farm } = await this.createFarmUseCase.execute({ createFarmDto });
    return FarmOutputDTO.toHttp(farm);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma fazenda' })
  async update(
    @Param('id') id: string,
    @Body() updateFarmDto: UpdateFarmDTO,
  ): Promise<FarmOutputDTO> {
    const { farm } = await this.updateFarmUseCase.execute({
      id,
      updateFarmDto,
    });
    return FarmOutputDTO.toHttp(farm);
  }

  @ApiPaginatedResponse(FarmOutputDTO)
  @Get()
  @ApiOperation({ summary: 'Busca todas as fazendas' })
  async findAll(
    @Query() params: GetFarmsParamsDTO,
  ): Promise<PaginatedOutputDTO<FarmOutputDTO>> {
    const { data } = await this.getAllFarmsUseCase.execute({
      getAllFarmsParams: params,
    });

    return {
      data: data.data.map((farm) => FarmOutputDTO.toHttp(farm)),
      meta: data.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma fazenda pelo id' })
  async findOne(@Param('id') id: string): Promise<FarmOutputDTO> {
    const { farm } = await this.getFarmByIdUseCase.execute({ id });
    return FarmOutputDTO.toHttp(farm);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma fazenda pelo id' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteFarmUseCase.execute({ id });
  }
}
