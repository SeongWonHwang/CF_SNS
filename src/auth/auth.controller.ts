import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/email')
  loginEmail(
    @Body('email') email: string, 
    @Body('password') password: string
    ) {
    return this.authService.loginWithEmail({
      email,
      password,
    });
  }

  @Post('register/email')
  registerEmail(
    @Body('nickName') nickName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.registerWithEmail({
      nickName,
      email,
      password,
    });
  }
}
