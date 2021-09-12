"use strict";

// Data
const account1 = {
  owner: "Ahmadreza Mozaffary",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Mohammad Alavi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Bijan mahdavi Tehrani",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sara Nori",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//Elements
const inputUser = document.querySelector(".username");
const inputPass = document.querySelector(".pass");
const firstLoginBtn = document.querySelector(".first-login-btn");
const firstSignupBtn = document.querySelector(".first-signup-btn");
const secondLoginBtn = document.querySelector(".second-login-btn");
const secondSignupBtn = document.querySelector(".second-signup-btn");
const signupSection = document.querySelector(".signup");
const loginPage = document.querySelector(".login-page");
const loginSection = document.querySelector(".login");
const loginHeader = document.querySelector(".loign-header");
const loginMessage = document.querySelector(".in-msg");
const backBtn1 = document.querySelector(".back-btn1");
const backBtn2 = document.querySelector(".back-btn2");

const userPanel = document.querySelector(".panel");
const btnContainer = document.querySelector(".btn-container");
const logoutBtn = document.querySelector(".logout-btn");

const inputID = document.querySelector(".input-id");
const transferInputAmount = document.querySelector(".transfer-input-amount");
const transferBtn = document.querySelector(".btn-tools");

const reqLoanError = document.querySelector(".loan-error");
const reqInputAmount = document.querySelector(".req-input-amount");
const requestBtn = document.querySelector(".request");

const userConfirmInput = document.querySelector(".user-confirm");
const passConfirmInput = document.querySelector(".pass-confirm");
const logoutError = document.querySelector(".logout-error");
const confirmBtn = document.querySelector(".confirm-logout");

const movementsContainer = document.querySelector(".left-history");
const usersName = document.querySelector(".user-name");
const totalBalance = document.querySelector(".right-about");
const lableIncome = document.querySelector(".income");
const lableOut = document.querySelector(".out");
const lableInterest = document.querySelector(".interest");
const sortBtn = document.querySelector(".sort-btn");

const displayMovements = function (movements, sort = false) {
  movementsContainer.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdraw";
    const html = `
      <div class="left-history-content">
          <div class="his-content-left">
            <p>
              <span class="his-num">${i + 1}</span>
              <span class="kind-of-his ${type}">${type}</span>
            </p>
            <p class="his-date">"DATE"</p>
          </div>
          <p class="n-money">${mov}€</p>
      </div>
    `;
    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((temp, mov) => (temp += mov), 0);
  totalBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((temp, deposit) => (temp += deposit));
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((temp, withdraw) => (temp += withdraw), 0);
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((temp, int) => (temp += int), 0);
  lableIncome.textContent = `${income}€`;
  lableOut.textContent = `${Math.abs(out)}€`;
  lableInterest.textContent = `${interest}€`;
};

const accUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
accUsernames(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

const displayMsg = function (target, msg, msgColor, shadowColor = "white") {
  target.style.color = msgColor;
  target.style.textShadow = `0 0 2px ${shadowColor}`;
  target.textContent = msg;
};

const backBtns = function () {
  loginSection.classList.add("hidden");
  signupSection.classList.add("hidden");
  btnContainer.classList.remove("hidden");
  loginMessage.textContent = "Log in ";
};
backBtn1.addEventListener("click", backBtns);
backBtn2.addEventListener("click", backBtns);

firstLoginBtn.addEventListener("click", () => {
  btnContainer.classList.toggle("hidden");
  loginSection.classList.toggle("hidden");
});

firstSignupBtn.addEventListener("click", () => {
  btnContainer.classList.toggle("hidden");
  signupSection.classList.toggle("hidden");
  loginMessage.textContent = "Sign up ";
});

let currentAcc;
secondLoginBtn.addEventListener("click", () => {
  currentAcc = accounts.find(
    (acc) => acc.username === inputUser.value.toLowerCase()
  );
  if (currentAcc?.pin === Number(inputPass.value)) {
    inputUser.value = inputPass.value = "";
    loginPage.classList.add("hidden");
    userPanel.classList.remove("hidden");
    usersName.textContent = `${currentAcc.owner.split(" ")[0]} 😊`;
    updateUI(currentAcc);
  } else {
    inputUser.value = inputPass.value = "";
    alert("Username or Password is INCORRECT!");
  }
});

transferBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const reciverAcc = accounts.find((acc) => acc.username === inputID.value);
  const amount = Number(transferInputAmount.value);
  inputID.value = transferInputAmount.value = "";
  if (
    amount > 0 &&
    reciverAcc &&
    reciverAcc !== currentAcc &&
    currentAcc.balance >= amount
  ) {
    currentAcc.movements.push(-amount);
    reciverAcc.movements.push(amount);
    updateUI(currentAcc);
  } else {
    alert("Wrong information!");
  }
});

requestBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(reqInputAmount.value);
  const loanRole = currentAcc.movements.some((mov) => mov >= amount * 0.1);
  if (amount > 0 && loanRole) {
    const msg = `Requested loan \" ${amount}€ \" Accepted!`;
    displayMsg(reqLoanError, msg, "green"); //(4th parametr)Default text-shadow is WHITE
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
  } else if (!loanRole) {
    const msg = "Requested loan is grater than 10%!";
    displayMsg(reqLoanError, msg, "red", "yellow");
    updateUI(currentAcc);
  } else if (amount <= 0) {
    const msg = "Enter your amount";
    displayMsg(reqLoanError, msg, "red", "yellow");
    updateUI(currentAcc);
  }
  reqInputAmount.value = "";
});

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    userConfirmInput.value.toLowerCase() === currentAcc.username &&
    Number(passConfirmInput.value) === currentAcc.pin
  ) {
    userConfirmInput.value = passConfirmInput.value = "";
    userPanel.classList.add("hidden");
    loginPage.classList.remove("hidden");
    displayMsg(reqLoanError, "Request Loan", "black");
    displayMsg(logoutError, "Close Account", "black");
    sortBtn.style.color = "black";
  } else {
    displayMsg(logoutError, "Wrong User or Password!", "red");
  }
});

let sorted = false;
sortBtn.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAcc.movements, !sorted);
  sorted = !sorted;
  if (sorted) {
    sortBtn.style.color = "green";
  } else {
    sortBtn.style.color = "black";
  }
});
