import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { InventoryStatus } from 'src/enums/inventoryStatus.enum';
import { OrderOptions } from 'src/enums/orderOptions.enum';
import { SortOptions } from 'src/enums/sortOptions.enum';

export class InventoryParamsDto {
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsEnum(InventoryStatus, { each: true })
  @IsOptional()
  status?: InventoryStatus[];

  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsOptional()
  location?: string[];

  @IsEnum(SortOptions)
  @IsOptional()
  sort?: SortOptions;

  @IsEnum(OrderOptions)
  @IsOptional()
  order?: OrderOptions;
}
