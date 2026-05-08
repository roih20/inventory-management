import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PaginationDto } from 'src/dtos/pagination.dto';

export class SearchProductDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  product: string;
}
