import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { AuthService } from '../provider/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('validate start');
    super({
      usernameField: 'email',
      passwordField: 'pwd',
      passReqToCallback: false,
    });
  }

  async validate(email: string, pwd: string) {
    const user = await this.authService.validateUser({ email, pwd });
    if (!user)
      throw new BadRequestException(baseResponeStatus.AUTH_VALIDATE_FAILURE);
    return user;
  }
}
