import { member } from "./member.js";
import { account } from "./account.js";
import { bank } from "./bank.js";
import { accountFactory as AccountFactory } from "./account.js";

const main = {
  init() {
    const myBank = new bank("Nuson-Bank", "0010F");

    const michelle = new member("Michelle", "Marlin");
    //const account1 = AccountFactory.createAccount(michelle, "savings");
    //const account2 = AccountFactory.createAccount(michelle, "checking");

    //michelle.printInfo();

    myBank.addMember(michelle);
    myBank.addAccount("checking", michelle);
    myBank.addAccount("savings", michelle);

    myBank.printAccounts();
    myBank.printMembers();

    for (const account of myBank.accounts) {
      console.log(account);
    }
    /* const michAccounts = myBank.getAccounts("Michelle Marlin");
    for (var account of michAccounts) {
      console.log(account);
    } */
    console.log("INFORMATION");
    const michAccount = myBank.returnAccount(
      "Michelle Marlin",
      "Michelle-account-checking"
    );
    console.log(michAccount);

    //myBank.printMembers();
    //myBank.printAccounts();

    console.log("\nBank Information: " + myBank.bankName);
    myBank.printAccounts();
    myBank.printMembers();

    michAccount.deposit(300);

    michAccount.showLastTrans();

    //account1.printAccountInfo();
    //trans.printTransactionInfo();

    //account1.withdraw(30.5);

    //account1.printAccountInfo();
    //withd.printTransactionInfo();

    //account1.showLastTrans();
  },
};

main.init();
