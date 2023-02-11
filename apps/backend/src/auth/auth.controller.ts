import { Controller, HttpStatus, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './auth.dto';
import { InvalidRequestError } from './auth.commons';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() req: LoginRequest, @Res({ passthrough: true }) res) {
    let resBody: LoginResponse;
    let statusCode = HttpStatus.OK;
    try {
      resBody = this.authService.login(req);
    } catch (e) {
      if (e instanceof InvalidRequestError) {
        statusCode = HttpStatus.BAD_REQUEST;
      } else {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }
    return res.status(statusCode).send(resBody);
  }

  @Post('/sign-out')
  signOut() {}
}
