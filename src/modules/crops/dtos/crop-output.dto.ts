import { ICrop } from '../entities/crop.entity';

export class CropOutputDTO {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  static toHttp(crop: ICrop): CropOutputDTO {
    const dto = new CropOutputDTO();
    dto.id = crop.id;
    dto.name = crop.name;
    dto.createdAt = crop.createdAt;
    dto.updatedAt = crop.updatedAt;
    return dto;
  }
} 