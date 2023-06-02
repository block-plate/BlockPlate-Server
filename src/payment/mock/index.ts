export const transactionEX = [
  //해당 유저 채굴에 대한 보상 TX
  {
    txIns: [
      {
        txOutId: '',
        txOutIndex: 0,
      },
    ],
    txOuts: [
      {
        account: 'b351d83937dcf6a1407857b446d1d63208d79049',
        amount: 50,
      },
    ],
    hash: '8cd36d02eac329b0b181e7e9dfa2ed0c8e34a0e1a4443b9c90a7488c74af6fc5',
  },
  // 대기중이던 거래에 대한 TX
  {
    txIns: [
      {
        txOutId:
          '8cd36d02eac329b0b181e7e9dfa2ed0c8e34a0e1a4443b9c90a7488c74af6fc5',
        txOutIndex: 0,
        sigature: {
          r: 'b2d4537d26da22644ebbe7bfcb9aa9e7abf2060fc72b7ba5878586c86a6eaa93',
          s: '39ede899d5f771591e1ba51890f660c55c6cc50e24827cb76a9a536bb5c7ea7d',
          recoveryParam: 0,
        },
      },
    ],
    txOuts: [
      //66 계정은 30PTC 를 받음
      {
        account: '770d31d68e308d8b32a64431eddd5611c704f366',
        amount: 30,
      },
      //49 계정은 50PTC UTXO 를 소진해서 20PTC 를 얻음
      {
        account: 'b351d83937dcf6a1407857b446d1d63208d79049',
        amount: 20,
      },
    ],
    hash: 'c339b1f584b71cf594d24be0c1899bfb38eeafcc20861bda6889f7aa516020c5',
  },
];
