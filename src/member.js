import { functions as Functions } from "./functions.js";

export class member {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.memberID = Functions.calculateMemberID();
    this.accounts = [];
  }

  printInfo() {
    console.log("\nShowing info for member: ");
    console.log("Name: " + this.firstName + " " + this.lastName);
    console.log("MemberID: " + this.getMemberID());
    const allAccounts = this.getAccounts();
    console.log("Accounts: (" + allAccounts.length + ")");
    for (let i = 0; i < allAccounts.length; i++) {
      console.log("Account Name: " + allAccounts[i].accountName);
    }
    this.printAccountInfo();
  }

  printAccountInfo() {
    const accounts = this.accounts;
    for (const account of accounts) {
      account.printAccountInfo();
    }
  }

  getMemberID() {
    return this.memberID;
  }

  getAccounts() {
    return this.accounts;
  }

  addAccount(account) {
    const accounts = this.accounts;
    if (accounts) {
      this.accounts.push(account);
    } else {
      let memberAccounts = [];
      memberAccounts.push(account);
    }
    console.log("Account added successfuly!");
  }
}

export const memberFactory = {
    createMember(firstName, lastName) {
        const newMember = new member(firstName, lastName);
        return newMember;
    }
};

//prettier-ignore
/* const michelle = new member("Michelle", "Marlin");
const newAccount = AccountFactory.createAccount(michelle, "checking");
michelle.addAccount(newAccount);
michelle.printInfo();
michelle.printAccountInfo(); */
