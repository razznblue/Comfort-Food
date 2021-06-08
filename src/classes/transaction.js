import { functions as Functions } from "../functions.js";

export class Transaction {
  constructor(account) {
    this.account = account;
    this.transactionID = Functions.calculateTransactionID();
  }

  addToAccountHistory() {
    this.dateExecuted = Functions.getDate();
    this.timeExecuted = Functions.getTime();
    let accountHistory = this.account.accountHistory;
    accountHistory.push(this);
    console.log("Added to Account History!");
  }
}

export class Withdraw extends Transaction {
  constructor(account, amount) {
    super(account);
    this.amount = amount;
  }

  withdraw() {
    let account = this.account;
    account.deleteFromBalance(this.amount);
    console.log("\nTransaction completed!");
    console.log("Withdrew $" + this.amount);
    this.addToAccountHistory();
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

export class Deposit extends Transaction {
  constructor(account, amount) {
    super(account);
    this.amount = amount;
  }

  deposit() {
    let account = this.account;
    account.addToBalance(this.amount);
    console.log("\nTransaction completed!");
    console.log("Deposited $" + this.amount);
    this.addToAccountHistory();
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

export class Transfer extends Transaction {
  constructor(account, toAccount, amount) {
    super(account, amount);
    this.amount = amount;
    this.toAccount = toAccount;
  }

  transfer() {
    let account = this.account;
    let toAccount = this.toAccount;
    let amount = this.amount;
    let accountHistory = account.accountHistory;
    let toAccountHistory = toAccount.accountHistory;
    this.dateExecuted = Functions.getDate();
    this.timeExecuted = Functions.getTime();
    account.removeFromBalance(amount);
    toAccount.addToBalance(amount);
    console.log("Transfer " + this.transactionID + " complete.");
    console.log("Removed " + amount + " from account " + account.accountNumber);
    console.log("Added " + amount + " to account " + toAccount.accountNumber);
    accountHistory.push(this);
    toAccountHistory.push(this);
    console.log("Added to Both Accounts Historyʻs!");
  }
}
