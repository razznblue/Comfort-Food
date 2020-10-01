import { functions as Functions } from "./functions.js";
import { account } from "./account.js";

export class bank {
  constructor(bankName, bankID) {
    this.bankName = bankName;
    this.bankID = bankID;
    this.members = [];
    this.accounts = [];
  }

  // <----- ADD METHODS ----->
  addMember(member) {
    let memberName = member.firstName + " " + member.lastName;
    member.joinDate = Functions.getDate();
    this.members.push(member);
    console.log("Added user " + memberName + " to " + this.bankName);
  }
  addAccount(accountType, member) {
    const accounts = this.accounts;
    let memberName = member.firstName + " " + member.lastName;
    const newAccount = new account(memberName, accountType);
    newAccount.accountName = newAccount.setAccountName(member.firstName);
    newAccount.accountNumber = Functions.calculateAccountNumber();
    accounts.push(newAccount);
    member.accounts.push(newAccount);
    console.log("Account created Successfully!");
    console.log("Your account Number is: " + newAccount.accountNumber);
  }

  // <----- GET METHODS ----->
  getMember(memberFirstName, memberLastName) {
    const members = this.members;
    for (const member of members) {
      //prettier-ignore
      if (member.firstName == memberFirstName && member.lastName == memberLastName) {
              return member;
      }
    }
  }
  getAccounts(memberName) {
    const member = this.members.find(
      (member) => member.firstName + " " + member.lastName === memberName
    );
    return member.accounts;
  }
  getAccount(memberName, accountName) {
    const memberAccounts = this.getAccounts(memberName);
    for (var account of memberAccounts) {
      if (account.accountName == accountName) {
        console.log(
          "account located! Now returning your account information..."
        );
        return account;
      }
    }
  }

  // <----- PRINT METHODS ----->
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
}
