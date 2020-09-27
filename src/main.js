import { memberFactory as MemberFactory } from "./member.js";
import { accountFactory as AccountFactory } from "./account.js";

const main = {
  init() {
    const michelle = MemberFactory.createMember("Michelle", "Marlin");
    AccountFactory.createAccount(michelle, "savings");
    michelle.printInfo();
  },
};

main.init();
