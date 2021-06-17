import { Member } from "./classes/member.js";
import { Bank } from "./classes/bank.js";

const main = {
  init() {
    const myBank = new Bank("Nuson-Bank", "0010F");

    const michelle = new Member("Michelle", "Marlin");

    //michelle.printInfo();

    myBank.addMember(michelle);
    myBank.addAccount("checking", michelle);
    myBank.addAccount("savings", michelle);

    myBank.printAccounts();
    myBank.printMembers();

    for (const account of myBank.accounts) {
      console.log(account);
    }

    console.log("INFORMATION");
    const checkingAc = myBank.getAccount(
      "Michelle Marlin",
      "Michelle-account-checking"
    );
    const savingsAc = myBank.getAccount(
      "Michelle Marlin",
      "Michelle-account-savings"
    );

    checkingAc.deposit(300);
    savingsAc.deposit(300);

    //michAccount.showLastTrans();
    //michAccount.printAccountInfo();

    checkingAc.transfer(savingsAc, 120);

    for (const account of myBank.accounts) {
      console.log(account);
    }

    //michAccount.withdraw(30.5);
    //michAccount.printAccountInfo();
    //michAccount.showLastTrans();
  },
};

//main.init();

const form = document.querySelector(".form");
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    form.style.opacity = "1";
  }, 400);
});

const btn1 = document.querySelector(".button1");
if (btn1) {
  btn1.addEventListener("click", () => {
    location.href = "/about";
  });
}
const btn2 = document.querySelector(".button2");
if (btn2) {
  btn2.addEventListener("click", () => {
    location.href = "/signup";
  });
}
