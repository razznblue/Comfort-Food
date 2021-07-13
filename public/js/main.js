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


const pass1 = document.querySelector(".password");
const pass2 = document.querySelector(".confirm-password");
const errorMsg = document.querySelector(".error-msg");
const formErrorMsg = document.querySelector(".form-error-msg");
const signupButton = document.querySelector("#signup-button");
const backBtn = document.querySelector(".back-btn");

const valuesAreEmpty = (pass1, pass2) => {
  pass1.value.length > 0 || pass2.value.length > 0 ? false : true;
}
const greaterThanSeven = (pass) => {
  console.log("pass: " + pass.value.length);
  if (pass.value.length > 7) { return true; } else { return false;}
}
const hasNumber = (string) => {
  return /\d/.test(string);
}

const toggleErrorMsg = () => {
  if (pass1.value === pass2.value || valuesAreEmpty(pass1, pass2)) {
    errorMsg.innerHTML = "";
    signupButton.style.pointerEvents = "all";
    signupButton.tabIndex = "0";
  } 
  if (pass1.value !== pass2.value) {
    errorMsg.innerHTML = "Passwords Do Not Match";
    signupButton.style.pointerEvents = "none";
    signupButton.tabIndex = "-1";
  }
}



let counter = 0;
const timer = {
  start() {
    setInterval(() => {
      counter++;
      toggleErrorMsg();
      if (counter === -1) {
        alert("Your Session has timed out. Click OK to refresh the page.");
        counter = 0; 
        location.reload();
      }
    }, 1000);
  },
}
if (document.URL.includes("signup")) {
  timer.start();
}

const homeLink = document.querySelector("#home");
if (homeLink.classList.contains("active")) {
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
}


if (document.URL.includes("signup") || document.URL.includes("login") || document.URL.includes("update")) {
  const form = document.querySelector(".form");
  form.elements[0].focus();

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      form.style.opacity = "1";
    }, 400);
  });

  form.addEventListener("submit", (e) => {
    if (!greaterThanSeven(pass1) || !greaterThanSeven(pass2)) {
      e.preventDefault();
      formErrorMsg.innerHTML = "Password must be longer than 7 characters";
    } else if (!hasNumber(pass1.value) || !hasNumber(pass2.value)) {
      e.preventDefault();
      formErrorMsg.innerHTML = "Password must contain at least 1 number";
    }
     
    console.log("form ready!");
    e.returnValue = true;
  });
}

if (backBtn) {
  backBtn.addEventListener("click", () => {
    location.href = "/profile";
  });
}
