import { Controller, Post } from '@nestjs/common';
import { MineService } from './provider/mine.service';

@Controller('mine')
export class MineController {
  constructor(private readonly mineService: MineService) {}

  @Post('/') //송금여부 확인
  async checkMine() {
    await this.mineService.checkMine();
  }
}
