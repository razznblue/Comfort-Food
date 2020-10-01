import { functions as Functions } from "./functions.js";
import { withdraw, deposit } from "./transaction.js";

export class account {
  //prettier-ignore
  constructor(accountUser, accountType){
        this.accountNumber = Functions.calculateAccountNumber();
        this.accountUser = accountUser;
        this.accountType = accountType
        this.accountBalance = 0;
        this.accountHistory = [];
        this.accountName = this.returnAccountName();
    }

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
  addToBalance(amount) {
    this.accountBalance += amount;
  }
  deleteFromBalance(amount) {
    this.accountBalance -= amount;
  }

  returnAccountName() {
    let firstName = this.accountUser.split(" ")[0];
    return firstName + "-account-" + this.accountType;
  }
  setAccountName(firstName) {
    return firstName + "-account-" + this.accountType;
  }

  withdraw(amount) {
    const withDraw = new withdraw(this, amount);
    withDraw.withdraw();
  }
  deposit(amount) {
    const depoSit = new deposit(this, amount);
    depoSit.deposit();
  }

  showLastTrans() {
    const transactions = this.accountHistory;
    const transaction = transactions[transactions.length - 1];
    transaction.printTransactionInfo();
  }
}

export const accountFactory = {
  createAccount(member, type) {
    let memberName = member.firstName + " " + member.lastName;
    const newAccount = new account(memberName, type);
    newAccount.accountName = newAccount.setAccountName(member.firstName);
    newAccount.accountNumber = Functions.calculateAccountNumber();
    member.accounts.push(newAccount);
    return newAccount;
  },
};
