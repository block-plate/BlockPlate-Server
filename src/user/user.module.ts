import { Module } from '@nestjs/common';
import { UserRepository } from './provider/user.repository';
import { UserService } from './provider/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, UserService],
})
export class UserModule {}
