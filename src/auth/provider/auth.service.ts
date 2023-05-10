import { BadRequestException, Injectable } from '@nestjs/common';
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
  ) {}

  async createUser(info: UserCreateInputDTO) {
    return await this.userService.createUser(info);
  }

  async validateUser(info: LoginInputDTO) {
    const { email, pwd } = info;
    const findUser = await this.userRepo.findUserByEmail({ email });
    const password = pwd;
    const hashed_password = findUser.pwd;
    if (
      findUser &&
      (await this.userService.comparePassword({ password, hashed_password }))
    ) {
      const { pwd, ...result } = findUser;
      return result;
    }
    throw new BadRequestException(baseResponeStatus.AUTH_VALIDATE_FAILURE);
  }

  async login(info: LoginInputDTO) {
    const { email, pwd } = info;
    const user_id = await (
      await this.userRepo.findUserByEmail({ email })
    ).user_id;
    const payload = { email: email, sub: user_id };
    return {
      access_token: this.jwtService.sign(payload), //jwt 토큰 생성ㅁ
    };
  }
}
