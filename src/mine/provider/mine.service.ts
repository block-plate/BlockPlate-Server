import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { PaymentRepository } from '../../payment/provider/payment.repository';

@Injectable()
export class MineService {
  constructor(
    private httpService: HttpService,
    private paymentRepo: PaymentRepository,
  ) {}

  async checkMine() {
    const url = `http://block.platechain.shop/v1/block/least`;
    try {
      const response = await this.httpService.axiosRef.get(url);
      console.log(response);

      const transactions = response.data.block.data;
      //const transactions = transactionEX; //mock
      await this.paymentRepo.verifyAndUpdatePayments(transactions);
      //console.log(transactions);

      //return transactions;

      /*
      Payment Database(트랜잭션당 payment 전체 조회>>이중 반복문) 에서 
      해당 (tx_id 랑 txOutId)같은 거래가 있는지 비교하고 있다면  */

      /*
      txIns에 txOutId 검사해서 있으면 → txOuts에서 instructor account를 찾고, amount가 강의의 amount와 같은지 확인 
      → 확인 되면 해당 payment DB is_spend 필드를 true 로 변경해준다.

      >>>>repo에서 접근(prisma)
      */
    } catch (error) {
      throw new BadRequestException(baseResponeStatus.MINE_FAILURE);
    }
  }
}
