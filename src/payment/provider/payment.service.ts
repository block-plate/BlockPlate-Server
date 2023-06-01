import { Injectable } from '@nestjs/common';
import { paymentData } from '../interface/paymentData.interface';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(private paymentRepo: PaymentRepository) {}

  async createPayment(info: paymentData) {
    return await this.paymentRepo.createPayment(info);
  }

  async getPayments(user_id: string) {
    return await this.paymentRepo.getPaymentsByUser(user_id);
  }
}
