import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { InventoryStatus } from 'src/enums/inventoryStatus.enum';

export class FilterInventoryStatusDto {
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsEnum(InventoryStatus, { each: true })
  @IsOptional()
  status?: InventoryStatus[];
}
