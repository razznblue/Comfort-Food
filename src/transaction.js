import { functions as Functions } from "./functions.js";

export class transaction {
  constructor(account, transactionID) {
    this.account = account;
    this.transactionID = transactionID;
  }
}

export class withdraw extends transaction {
  constructor(account, transactionID, amount) {
    super(account, transactionID);
    this.amount = amount;
  }

  withdraw() {
    accountBalance = account.accountBalance;
    accountBalance = accountBalance - amount;
    let accountHistory = account;
    accountHistory.push(this);
  }

  printTransactionInfo() {
    console.log("Transaction for Account Number " + this.account.accountNumber);
    console.log("Date Processed: " + Functions.getDateToday());
    console.log("Amount withdrawn: " + amount);
    console.log("TransactionID: " + this.transactionID);
  }
}

export class deposit extends transaction {
  constructor(account, transactionID, amount) {
    super(account, transactionID);
    this.amount = amount;
  }

  deposit() {
    let account = this.account;
    account.addToBalance(this.amount);
    let accountHistory = this.account.accountHistory;
    accountHistory.push(this);
  }

  printTransactionInfo() {
    console.log("Transaction for Account Number " + this.account.accountNumber);
    console.log("Date Processed: " + Functions.getDateToday());
    console.log("Amount Deposited: " + this.amount);
    console.log("TransactionID: " + this.transactionID);
  }
}
