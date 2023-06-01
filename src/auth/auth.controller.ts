import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../common/decorator/skip-auth.decorator';
import { BaseResponse } from '../common/util/res/BaseResponse';
import { baseResponeStatus } from '../common/util/res/baseStatusResponse';
import { UserCreateInputDTO } from '../user/dto/create_user.dto';
import { LocalAuthGuard } from './guard/localAuth.guard';
import { AuthService } from './provider/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login') //로그인
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.body);
    res.cookie('Authentication', token, {
      //반환된 토큰을 쿠키에 저장
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
  }

  @Public()
  @Post('/signup') //회원가입
  async createUser(@Body() userInputDTO: UserCreateInputDTO) {
    const result = await this.authService.createUser(userInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Public()
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }
  /*
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login') //로그인
  async login(
    @Body() loginInputDTO: LoginInputDTO,
    @Res({ passthrough: true }) res: express.Response, //Response 오류
  ) {
    const token = await this.authService.login(loginInputDTO);
    res.cookie('Authentication', token, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
  }

  
  @Public()
  @Post('logout') //로그아웃
  async logOut(@Res({ passthrough: true }) res: express.Response) {
    const { token, ...option } = await this.authService.logOut();
    res.cookie('Authentication', token, option);
  }
  */
}
