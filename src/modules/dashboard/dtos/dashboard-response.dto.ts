import { ApiProperty } from '@nestjs/swagger';

class StateDistributionDto {
  @ApiProperty({
    description: 'Estado da fazenda',
    example: 'São Paulo',
  })
  state: string;

  @ApiProperty({
    description: 'Quantidade de fazendas no estado',
    example: 5,
  })
  count: number;
}

class CropDistributionDto {
  @ApiProperty({
    description: 'Nome da cultura',
    example: 'Soja',
  })
  crop: string;

  @ApiProperty({
    description: 'Quantidade de culturas',
    example: 10,
  })
  count: number;
}

class LandUseDistributionDto {
  @ApiProperty({
    description: 'Tipo de uso do solo',
    example: 'Área Agrícola',
  })
  type: string;

  @ApiProperty({
    description: 'Área total em hectares',
    example: 1500.5,
  })
  area: number;
}

export class DashboardResponseDTO {
  @ApiProperty({
    description: 'Quantidade total de fazendas',
    example: 25,
  })
  amountFarms: number;

  @ApiProperty({
    description: 'Soma total de área em hectares',
    example: 5000.75,
  })
  totalArea: number;

  @ApiProperty({
    description: 'Distribuição de fazendas por estado',
    type: [StateDistributionDto],
  })
  stateDistribution: StateDistributionDto[];

  @ApiProperty({
    description: 'Distribuição de culturas',
    type: [CropDistributionDto],
  })
  cropDistribution: CropDistributionDto[];

  @ApiProperty({
    description: 'Distribuição de uso do solo',
    type: [LandUseDistributionDto],
  })
  landUseDistribution: LandUseDistributionDto[];
}
