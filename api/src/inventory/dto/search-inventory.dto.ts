import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SearchInventoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  product: string;
}
