import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
