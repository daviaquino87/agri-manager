import { CropOutputDTO } from '@/modules/crops/dtos/crop-output.dto';
import { FarmOutputDTO } from '@/modules/farms/dtos/farm-output.dto';
import { HarvestOutputDTO } from '@/modules/harvests/dtos/harvest-output.dto';
import { ProducerWithRelations } from '@/modules/producers/entities/producer.entity';
import { ICrop } from '@/modules/crops/entities/crop.entity';
import { IHarvest } from '@/modules/harvests/entities/harvest.entity';

function getCrops(producer: ProducerWithRelations): ICrop[] {
  return (
    producer.farms.flatMap((farm) =>
      farm.farmCultures.map((farmCulture) => farmCulture.crop),
    ) ?? []
  );
}

function getHarvests(producer: ProducerWithRelations): IHarvest[] {
  return (
    producer.farms.flatMap((farm) =>
      farm.farmCultures.map((farmCulture) => farmCulture.harvest),
    ) ?? []
  );
}

export class ProducerDetailsOutputDTO {
  id: string;
  name: string;
  document: string;
  farms: FarmOutputDTO[];
  crops: CropOutputDTO[];
  harvests: HarvestOutputDTO[];
  createdAt: Date;
  updatedAt: Date;

  static toHttp(producer: ProducerWithRelations): ProducerDetailsOutputDTO {
    return {
      id: producer.id,
      name: producer.name,
      document: producer.document,
      farms: producer.farms.map(FarmOutputDTO.toHttp),
      crops: getCrops(producer).map(CropOutputDTO.toHttp),
      harvests: getHarvests(producer).map(HarvestOutputDTO.toHttp),
      createdAt: producer.createdAt,
      updatedAt: producer.updatedAt,
    };
  }
}
