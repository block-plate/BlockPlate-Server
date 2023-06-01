import { Injectable } from '@nestjs/common';
import { paymentData } from '../interface/paymentData.interface';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(private paymentRepo: PaymentRepository) {}

  async createPayment(info: paymentData) {
    return await this.paymentRepo.createPayment(info);
  }
}
