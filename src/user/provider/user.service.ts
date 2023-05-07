import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { UserCreateInputDTO } from '../dto/create_user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly config: ConfigService,
  ) {}

  async createUser(info: UserCreateInputDTO) {
    const { pwd, email } = info;
    if (!this.userRepo.uniqueEmail(email))
      throw new BadRequestException(baseResponeStatus.USER_EMAIL_EXIST);
    info = {
      ...info,
      pwd: await this.transformPassword(pwd),
    };
    const newUser = await this.userRepo.createUser(info);
    return newUser;
  }

  async getUserList() {
    const users = await this.userRepo.getUserList();
    return users;
  }

  /**** hash ****/

  async transformPassword(password: string) {
    const hashed_password = await bcrypt.hash(
      password,
      Number(this.config.get('HASH_SALT')),
    );
    return hashed_password;
  }

  async comparePassword({
    password,
    hashed_password,
  }: {
    password: string;
    hashed_password: string;
  }): Promise<boolean> {
    return await bcrypt.compare(password, hashed_password);
  }
}
