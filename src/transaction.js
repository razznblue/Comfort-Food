export class transaction {
  constructor(bank, account, transactionID) {
    this.bank = bank;
    this.account = account;
    this.transactionID = transactionID;
  }
}

class withdraw extends transaction {
  constructor(bank, account, transactionID, amount) {
    super(bank, account, transactionID);
    this.amount = amount;
  }

  withdraw() {
    accountBalance = account.accountBalance;
    accountBalance = accountBalance - amount;
  }
}

class deposit extends transaction {
  constructor(bank, account, transactionID, amount) {
    super(bank, account, transactionID);
    this.amount = amount;
  }

  deposit() {
    accountBalance = account.accountBalance;
    accountBalance = accountBalance + amount;
  }
}
