import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Throttle } from '@nestjs/throttler';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ auth: {} })
  signIn(@Body() loginDto: SignInDto): any {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}
