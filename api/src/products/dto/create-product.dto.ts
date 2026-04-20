import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;
  @IsString()
  @IsOptional()
  @MaxLength(100)
  brand?: string;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredients: string[];
  @IsInt()
  @IsPositive()
  categoryId: number;
}
