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
import { CreateCropUseCase } from '../use-cases/create-crop/create-crop.use-case';
import { UpdateCropUseCase } from '../use-cases/update-crop/update-crop.use-case';
import { GetAllCropsUseCase } from '../use-cases/get-all-crops/get-all-crops.use-case';
import { GetCropByIdUseCase } from '../use-cases/get-crop-by-id/get-crop-by-id.use-case';
import { DeleteCropUseCase } from '../use-cases/delete-crop/delete-crop.use-case';
import { CreateCropDTO } from '../dtos/create-crop.dto';
import { UpdateCropDTO } from '../dtos/update-crop.dto';
import { GetCropsParamsDTO } from '../dtos/get-crops-params.dto';
import { CropOutputDTO } from '../dtos/crop-output.dto';
import { PaginatedOutputDTO } from '@/common/dtos/paginated.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';

@Controller('crops')
export class CropsController {
  constructor(
    private readonly createCropUseCase: CreateCropUseCase,
    private readonly updateCropUseCase: UpdateCropUseCase,
    private readonly getAllCropsUseCase: GetAllCropsUseCase,
    private readonly getCropByIdUseCase: GetCropByIdUseCase,
    private readonly deleteCropUseCase: DeleteCropUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova cultura' })
  async create(@Body() createCropDTO: CreateCropDTO): Promise<CropOutputDTO> {
    const { crop } = await this.createCropUseCase.execute({ createCropDTO });
    return CropOutputDTO.toHttp(crop);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma cultura' })
  async update(
    @Param('id') id: string,
    @Body() updateCropDto: UpdateCropDTO,
  ): Promise<CropOutputDTO> {
    const { crop } = await this.updateCropUseCase.execute({
      id,
      updateCropDto,
    });
    return CropOutputDTO.toHttp(crop);
  }

  @ApiPaginatedResponse(CropOutputDTO)
  @Get()
  @ApiOperation({ summary: 'Busca todas as culturas' })
  async findAll(
    @Query() params: GetCropsParamsDTO,
  ): Promise<PaginatedOutputDTO<CropOutputDTO>> {
    const { data } = await this.getAllCropsUseCase.execute({
      getCropsParamsDto: params,
    });

    return {
      data: data.data.map((crop) => CropOutputDTO.toHttp(crop)),
      meta: data.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma cultura pelo id' })
  async findOne(@Param('id') id: string): Promise<CropOutputDTO> {
    const { crop } = await this.getCropByIdUseCase.execute({ id });
    return CropOutputDTO.toHttp(crop);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma cultura pelo id' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteCropUseCase.execute({ id });
  }
}
