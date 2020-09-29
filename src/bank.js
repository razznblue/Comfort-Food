import { functions as Functions } from "./functions.js";

export class bank {
  constructor(bankName, bankID) {
    this.bankName = bankName;
    this.bankID = bankID;
    this.members = [];
    this.accounts = [];
  }

  addMember(member) {
    member.joinDate = Functions.getDate();
    this.members.push(member);
  }
  addAccount(account) {
    this.accounts.push(account);
  }
  printMembers() {
    console.log("Current Members: ");
    for (const member of this.members) {
      console.log(member.firstName + " " + member.lastName);
    }
  }
  printAccounts() {
    console.log("All Accounts: ");
    //prettier-ignore
    for (const account of this.accounts) {
      console.log(account.accountNumber + " : " + 
                  account.accountType +  " : " + 
                  account.accountUser);
    }
  }

  getMember(memberFirstName, memberLastName) {
    const members = this.members;
    for (const member of members) {
      //prettier-ignore
      if (member.firstName == memberFirstName && member.lastName == memberLastName) {
              return member;
      }
    }
  }

  getAccount(accountNumber) {
    const accounts = this.accounts;
    for (const account of accounts) {
      //prettier-ignore
      if (account.accountNumber == accountNumber) {
              return account;
      }
    }
  }
}
