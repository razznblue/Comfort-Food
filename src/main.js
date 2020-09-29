import { member } from "./member.js";
import { account } from "./account.js";
import { bank } from "./bank.js";
import { memberFactory as MemberFactory } from "./member.js";
import { accountFactory as AccountFactory } from "./account.js";
import { transaction, withdraw, deposit } from "./transaction.js";

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

    const trans = new deposit(account1, 500);
    trans.deposit();

    account1.printAccountInfo();
    trans.printTransactionInfo();

    const withd = new withdraw(account1, 50.74);
    withd.withdraw();

    account1.printAccountInfo();
    withd.printTransactionInfo();
  },
};

main.init();
