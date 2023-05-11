import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../provider/auth.service';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, pwd: string) {
    const user = await this.authService.validateUser({ email, pwd });

    if (!user) throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);
    return user;
  }
}
