import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { UserCreateInputDTO } from '../../user/dto/create_user.dto';
import { LoginInputDTO } from '../../user/dto/login_user.dto';
import { UserRepository } from '../../user/provider/user.repository';
import { UserService } from '../../user/provider/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(info: UserCreateInputDTO) {
    //회원가입
    return await this.userService.createUser(info);
  }

  async validateUser(info: LoginInputDTO) {
    //password 가 맞는지 확인, 나머지 부분 반환

    const { email, pwd } = info;
    const findUser = await this.userRepo.findUserByEmail({ email });
    const password = pwd;
    const hashed_password = findUser.pwd;

    if (
      findUser &&
      this.userService.comparePassword({ password, hashed_password })
    ) {

      const { pwd, ...result } = findUser;
      return result;
    }
    throw new BadRequestException(baseResponeStatus.AUTH_VALIDATE_FAILURE);
  }

  /*

 

  async login(info: LoginInputDTO) {
    const { email } = info;
    const user_id = await (
      await this.userRepo.findUserByEmail({ email })
    ).user_id;
    const payload = { email: email, id: user_id };
    const token = this.jwtService.sign(payload); //유저 정보 -> jwt 토큰 생성
    return token;
  }

  getCookieWithJwtAccessToken(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });

    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge:
        Number(this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME')) * 1000,
    };
  }
  getCookiesForLogOut() {
    return {
      accessOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
  */
}
