import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { InventoryStatus } from 'src/enums/inventoryStatus.enum';
import { PaginationDto } from '../../dtos/pagination.dto';

export class FilterInventoryDto extends PaginationDto {
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsEnum(InventoryStatus, { each: true })
  @IsOptional()
  status?: InventoryStatus[];

  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsOptional()
  location?: string[];
}
