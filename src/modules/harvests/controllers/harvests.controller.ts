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
import { CreateHarvestUseCase } from '@/modules/harvests/use-cases/create-harvest/create-harvest.usecase';
import { UpdateHarvestUseCase } from '@/modules/harvests/use-cases/update-harvest/update-harvest.usecase';
import { GetAllHarvestsUseCase } from '@/modules/harvests/use-cases/get-all-harvests/get-all-harvests.usecase';
import { GetHarvestByIdUseCase } from '@/modules/harvests/use-cases/get-harvest-by-id/get-harvest-by-id.usecase';
import { DeleteHarvestUseCase } from '@/modules/harvests/use-cases/delete-harvest/delete-harvest.usecase';
import { CreateHarvestDTO } from '@/modules/harvests/dtos/create-harvest.dto';
import { HarvestOutputDTO } from '@/modules/harvests/dtos/harvest-output.dto';
import { ApiOperation } from '@nestjs/swagger';
import { GetHarvestParamsDTO } from '@/modules/harvests/dtos/get-harvest-prams.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { IHarvest } from '@/modules/harvests/entities/harvest.entity';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';

@Controller('harvests')
export class HarvestsController {
  constructor(
    private readonly createHarvestUseCase: CreateHarvestUseCase,
    private readonly updateHarvestUseCase: UpdateHarvestUseCase,
    private readonly getAllHarvestsUseCase: GetAllHarvestsUseCase,
    private readonly getHarvestByIdUseCase: GetHarvestByIdUseCase,
    private readonly deleteHarvestUseCase: DeleteHarvestUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova colheita' })
  async create(
    @Body() createHarvestDto: CreateHarvestDTO,
  ): Promise<HarvestOutputDTO> {
    const { harvest } = await this.createHarvestUseCase.execute({
      createHarvestDto,
    });

    return HarvestOutputDTO.toHttp(harvest);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma colheita' })
  async update(
    @Param('id') id: string,
    @Body() updateHarvestDto: CreateHarvestDTO,
  ): Promise<HarvestOutputDTO> {
    const { harvest } = await this.updateHarvestUseCase.execute({
      id,
      updateHarvestDto,
    });

    return HarvestOutputDTO.toHttp(harvest);
  }

  @ApiPaginatedResponse(HarvestOutputDTO)
  @Get()
  @ApiOperation({ summary: 'Busca todas as colheitas' })
  async getAll(
    @Query() getHarvestsParamsDto: GetHarvestParamsDTO,
  ): Promise<PaginatedOutputDTO<IHarvest>> {
    const { data } = await this.getAllHarvestsUseCase.execute({
      getHarvestsParamsDto,
    });

    return {
      data: data.data.map((harvest) => HarvestOutputDTO.toHttp(harvest)),
      meta: data.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma colheita pelo id' })
  async getById(@Param('id') id: string): Promise<HarvestOutputDTO> {
    const { harvest } = await this.getHarvestByIdUseCase.execute({ id });

    return HarvestOutputDTO.toHttp(harvest);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma colheita' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteHarvestUseCase.execute({ id });
  }
}
