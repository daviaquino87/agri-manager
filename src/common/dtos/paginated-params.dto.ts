import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginatedParamsDTO {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => {
    if (value) {
      return Number(value);
    }
  })
  page?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => {
    if (value) {
      return Number(value);
    }
  })
  perPage?: number;
}
