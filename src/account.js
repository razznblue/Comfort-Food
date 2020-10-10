import { functions as Functions } from "./functions.js";
import { Withdraw, Deposit, Transfer } from "./transaction.js";

export class Account {
  //prettier-ignore
  constructor(accountUser, accountType){
        this.accountNumber = Functions.calculateAccountNumber();
        this.accountUser = accountUser;
        this.accountType = accountType
        this.accountBalance = 0;
        this.accountHistory = [];
        this.accountName = this.returnAccountName();
    }

  // <----- ADD + REMOVE METHODS ----->
  addToBalance(amount) {
    this.accountBalance += amount;
  }
  removeFromBalance(amount) {
    this.accountBalance -= amount;
  }

  // <----- PRINT METHODS ----->
  printAccountInfo() {
    console.log("\nShowing Account Info For: ");
    console.log("Account Name: " + this.accountName);
    console.log("Account Number: " + this.accountNumber);
    console.log("Account User: " + this.accountUser);
    console.log("Account Type: " + this.accountType);
    console.log("Account Balance: " + this.accountBalance);
    console.log("Account History: " + this.accountHistory);
  }
  printAccountHistory() {
    accountHistory = this.accountHistory;
  }
  deleteFromBalance(amount) {
    this.accountBalance -= amount;
  }

  returnAccountName() {
    let firstName = this.accountUser.split(" ")[0];
    return firstName + "-account-" + this.accountType;
  }
  returnBalance() {
    return this.accountBalance;
  }
  setAccountName(firstName) {
    return firstName + "-account-" + this.accountType;
  }

  withdraw(amount) {
    const withDraw = new Withdraw(this, amount);
    withDraw.withdraw();
  }
  deposit(amount) {
    const depoSit = new Deposit(this, amount);
    depoSit.deposit();
  }
  transfer(targetedAccount, amount) {
    const transfer = new Transfer(this, targetedAccount, amount);
    transfer.transfer();
  }

  showLastTrans() {
    const transactions = this.accountHistory;
    const transaction = transactions[transactions.length - 1];
    transaction.printTransactionInfo();
  }
}
