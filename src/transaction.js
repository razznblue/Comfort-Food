import { functions as Functions } from "./functions.js";

export class transaction {
  constructor(account) {
    this.account = account;
    this.transactionID = Functions.calculateTransactionID();
  }
}

export class withdraw extends transaction {
  constructor(account, amount) {
    super(account);
    this.amount = amount;
  }

  withdraw() {
    let account = this.account;
    account.deleteFromBalance(this.amount);
    console.log("\nTransaction completed!");
    this.dateExecuted = Functions.getDate();
    this.timeExecuted = Functions.getTime();
    let accountHistory = this.account.accountHistory;
    accountHistory.push(this);
    console.log("Added to Account History!");
  }

  printTransactionInfo() {
    console.log(
      "\nTransaction Info for Account Number " + this.account.accountNumber
    );
    console.log("TransactionID: " + this.transactionID);
    console.log(
      "Date Processed: " + this.dateExecuted + " @ " + this.timeExecuted
    );
    console.log("Amount withdrawn: " + this.amount);
  }
}

export class deposit extends transaction {
  constructor(account, amount) {
    super(account);
    this.amount = amount;
  }

  deposit() {
    let account = this.account;
    account.addToBalance(this.amount);
    console.log("\nTransaction completed!");
    this.dateExecuted = Functions.getDate();
    this.timeExecuted = Functions.getTime();
    let accountHistory = this.account.accountHistory;
    accountHistory.push(this);
    console.log("Added to Account History!");
  }

  printTransactionInfo() {
    console.log(
      "\nTransaction Info for Account Number " + this.account.accountNumber
    );
    console.log("TransactionID: " + this.transactionID);
    console.log(
      "Date Processed: " + this.dateExecuted + " @ " + this.timeExecuted
    );
    console.log("Amount Deposited: " + this.amount);
  }
}
