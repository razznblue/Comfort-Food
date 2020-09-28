import { member } from "./member.js";
import { account } from "./account.js";
import { bank } from "./bank.js";
import { memberFactory as MemberFactory } from "./member.js";
import { accountFactory as AccountFactory } from "./account.js";

const main = {
  init() {
    const myBank = new bank("Nuson", "0010F");

    const michelle = new member("Michelle", "Marlin");
    AccountFactory.createAccount(michelle, "savings");
    AccountFactory.createAccount(michelle, "checking");
    michelle.printInfo();
  },
};

main.init();
