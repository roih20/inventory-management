import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class SearchInventoryDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  product: string;
}
