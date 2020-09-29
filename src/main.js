import { member } from "./member.js";
import { account } from "./account.js";
import { bank } from "./bank.js";
import { memberFactory as MemberFactory } from "./member.js";
import { accountFactory as AccountFactory } from "./account.js";

const main = {
  init() {
    const myBank = new bank("Nuson-Bank", "0010F");

    const michelle = new member("Michelle", "Marlin");
    const account1 = AccountFactory.createAccount(michelle, "savings");
    const account2 = AccountFactory.createAccount(michelle, "checking");

    //michelle.printInfo();

    myBank.addMember(michelle);
    myBank.addAccount(account1);
    myBank.addAccount(account2);
    //myBank.printMembers();
    //myBank.printAccounts();

    console.log("Bank Information: " + myBank.bankName);
    myBank.printAccounts();
    myBank.printMembers();

    account1.deposit(300);

    account1.showLastTrans();

    account1.printAccountInfo();
    //trans.printTransactionInfo();

    account1.withdraw(30.5);

    account1.printAccountInfo();
    //withd.printTransactionInfo();

    account1.showLastTrans();
  },
};

main.init();
