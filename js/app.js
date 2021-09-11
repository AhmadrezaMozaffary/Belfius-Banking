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
const firstLoginBtn = document.querySelector(".first-login-btn");
const firstSignupBtn = document.querySelector(".first-signup-btn");
const secondLoginBtn = document.querySelector(".second-login-btn");
const secondSignupBtn = document.querySelector(".second-signup-btn");
const signupSection = document.querySelector(".signup");
const loginPage = document.querySelector(".login-page");
const loginSection = document.querySelector(".login");
const loginHeader = document.querySelector(".loign-header");
const loginMessage = document.querySelector(".in-msg");
const btnContainer = document.querySelector(".btn-container");
const backBtn1 = document.querySelector(".back-btn1");
const backBtn2 = document.querySelector(".back-btn2");
const userPanel = document.querySelector(".panel");
const logoutBtn = document.querySelector(".logout-btn");
const transferBtn = document.querySelector(".btn-tools");
const inputID = document.querySelector(".input-id");
const transferInputAmount = document.querySelector(".transfer-input-amount");
const requestBtn = document.querySelector(".request");
const reqInputAmount = document.querySelector(".req-input-amount");
const confirmBtn = document.querySelector(".confirm-logout");
const userConfirmInput = document.querySelector(".user-confirm");
const passConfirmInput = document.querySelector(".pass-confirm");
const movementsContainer = document.querySelector(".left-history");
const totalBalance = document.querySelector(".right-about");
const lableIncome = document.querySelector(".income");
const lableOut = document.querySelector(".out");
const lableInterest = document.querySelector(".interest");
const usersName = document.querySelector(".user-name");
const inputUser = document.querySelector(".username");
const inputPass = document.querySelector(".pass");

const displayMovements = function (movements) {
  movementsContainer.innerHTML = "";
  movements.forEach((mov, i) => {
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

const backBtns = function () {
  loginSection.classList.add("hidden");
  signupSection.classList.add("hidden");
  btnContainer.classList.remove("hidden");
  loginMessage.textContent = "Log in ";
};

firstLoginBtn.addEventListener("click", () => {
  btnContainer.classList.toggle("hidden");
  loginSection.classList.toggle("hidden");
});

firstSignupBtn.addEventListener("click", () => {
  btnContainer.classList.toggle("hidden");
  signupSection.classList.toggle("hidden");
  loginMessage.textContent = "Sign up ";
});

backBtn1.addEventListener("click", backBtns);
backBtn2.addEventListener("click", backBtns);

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

logoutBtn.addEventListener("click", () => {
  userPanel.classList.add("hidden");
  loginPage.classList.remove("hidden");
});
