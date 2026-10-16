const maskMoney = <T extends string>(money: T, visible: boolean) => {
  if (visible) {
    return 'xxxxx';
  }
  return money;
};

export default maskMoney;
