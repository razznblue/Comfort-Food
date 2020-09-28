import { functions as Functions } from "./functions.js";

export class transaction {
  constructor(account, transactionID) {
    this.account = account;
    this.transactionID = transactionID;
  }
}

class withdraw extends transaction {
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

class deposit extends transaction {
  constructor(account, transactionID, amount) {
    super(account, transactionID);
    this.amount = amount;
  }

  deposit() {
    accountBalance = account.accountBalance;
    accountBalance = accountBalance + amount;
    let accountHistory = account;
    accountHistory.push(this);
  }

  printTransactionInfo() {
    console.log("Transaction for Account Number " + this.account.accountNumber);
    console.log("Date Processed: " + Functions.getDateToday());
    console.log("Amount Deposited: " + amount);
    console.log("TransactionID: " + this.transactionID);
  }
}
