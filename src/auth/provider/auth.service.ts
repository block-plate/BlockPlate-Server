import { Injectable } from '@nestjs/common';
import { UserCreateInputDTO } from '../../user/dto/create_user.dto';
import { UserRepository } from '../../user/provider/user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async createUser(info: UserCreateInputDTO) {
    return await this.userRepo.createUser(info);
  }
}
