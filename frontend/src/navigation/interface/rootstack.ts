export enum EnumScreen {
  HOME = 'Home',
  TRANSACTION = 'Transaction',
  TRANSACTION_DETAIL = 'TransactionDetail',
  WELCOME = 'Welcome',
  SETTING = 'Setting',
}

export type RootStackParamList = {
  [EnumScreen.HOME]: undefined;
  [EnumScreen.TRANSACTION]: undefined;
  [EnumScreen.TRANSACTION_DETAIL]: {
    transaction: TransactionDetailData;
  };
  [EnumScreen.WELCOME]: undefined;
  [EnumScreen.SETTING]: undefined;
};

export type TransactionDetailData = {
  refId: string;
  transferDate: string;
  recipientName: string;
  transferName: string;
  amount: number;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
