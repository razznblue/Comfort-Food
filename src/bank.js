export class bank {
  constructor(bankName, bankID) {
    this.bankName = bankName;
    this.bankID = bankID;
    this.members = [];
    this.accounts = [];
  }

  addMember(member) {
    this.members.push(member);
  }
  addAccount(account) {
    this.accounts.push(account);
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
