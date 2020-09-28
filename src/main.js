import { member } from "./member.js";
import { account } from "./account.js";
import { bank } from "./bank.js";
import { memberFactory as MemberFactory } from "./member.js";
import { accountFactory as AccountFactory } from "./account.js";

const main = {
  init() {
    const myBank = new bank("Nuson", "0010F");

    const michelle = new member("Michelle", "Marlin");
    const account1 = AccountFactory.createAccount(michelle, "savings");
    const account2 = AccountFactory.createAccount(michelle, "checking");

    michelle.printInfo();

    myBank.addMember(michelle);
    myBank.addAccount(account1);
    myBank.addAccount(account2);
    myBank.printMembers();
    myBank.printAccounts();
  },
};

main.init();
