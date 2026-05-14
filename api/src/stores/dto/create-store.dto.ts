import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  street: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  city: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  state: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  zipCode: string;
}
