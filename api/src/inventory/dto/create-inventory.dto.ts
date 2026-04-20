import { IsInt, IsPositive, Min } from 'class-validator';
export class CreateInventoryDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;
  @IsInt()
  @IsPositive()
  productId: number;
  @IsInt()
  @IsPositive()
  storeId: number;
}
