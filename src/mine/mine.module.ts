import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaymentModule } from '../payment/payment.module';
import { MineController } from './mine.controller';
import { MineService } from './provider/mine.service';

@Module({
  imports: [HttpModule, PaymentModule],
  controllers: [MineController],
  providers: [MineService],
})
export class MineModule {}
