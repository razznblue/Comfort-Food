import { functions as Functions } from "./functions.js";

class account {
  //prettier-ignore
  constructor(accountUser, accountType, accountBalance, accountHistory){
        this.accountNumber = Functions.calculateAccountNumber();
        this.accountUser = accountUser;
        this.accountType = accountType
        this.accountBalance = accountBalance;
        this.accountHistory = accountHistory;
        this.accountName = this.returnAccountName();
    }

  printAccountInfo() {
    console.log("\nShowing Account Info For: ");
    console.log("Account Name: " + this.accountName);
    console.log("Account Number: " + this.accountNumber);
    console.log("Account User: " + this.accountUser);
    console.log("Account Type: " + this.accountType);
    console.log("Account Balanace: " + this.accountBalance);
    console.log("Account History: " + this.accountHistory);
  }

  returnAccountName() {
    let firstName = this.accountUser.split(" ")[0];
    return firstName + "-account-" + this.accountType;
  }
  makeAccountName(firstName) {
    return firstName + "-account-" + this.accountType;
  }
}

export const accountFactory = {
  createAccount(member, type) {
    let memberName = member.firstName + " " + member.lastName;
    const newAccount = new account(memberName, type, 0, "no-history");
    newAccount.accountName = newAccount.makeAccountName(member.firstName);
    newAccount.accountNumber = Functions.calculateAccountNumber();
    member.accounts.push(newAccount);
    return newAccount;
  },
};
