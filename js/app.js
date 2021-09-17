"use strict";

// Data
const account1 = {
  owner: "Ahmadreza Mozaffary",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2021-09-10T14:11:59.604Z",
    "2021-09-13T17:01:17.194Z",
    "2021-09-15T23:36:17.929Z",
    "2021-09-16T10:51:36.790Z",
  ],
  interestRate: 1.2, // %
  pin: 1111,
  currency: "EUR",
  locale: "en-US",
};

const account2 = {
  owner: "Mohammad Alavi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  interestRate: 1.5,
  pin: 2222,
  currency: "EUR",
  locale: "pt-PT",
};

const account3 = {
  owner: "Bijan mahdavi Tehrani",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  interestRate: 0.7,
  pin: 3333,
  currency: "USD",
  locale: "fa-IR",
};

const account4 = {
  owner: "Sara Nori",
  movements: [430, 1000, 700, 50, 90],
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
  ],
  interestRate: 1,
  pin: 4444,
  currency: "USD",
  locale: "de-DE",
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

const lableDate = document.querySelector(".date");

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

const calcDisplayMovDays = function (date, locale) {
  const calcPassedDays = (day1, day2) =>
    Math.round(Math.abs(day1 - day2) / (1000 * 60 * 60 * 24));
  const passedDays = calcPassedDays(new Date(), date);
  if (passedDays === 0) return "Today";
  else if (passedDays === 1) return "Yesterday";
  else if (passedDays <= 7) return `${passedDays} days ago`;
  else {
    return Intl.DateTimeFormat(locale).format(date);
  }
};

const displayMovements = function (acc, sort = false) {
  movementsContainer.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdraw";

    //Display movement's date
    const movTime = new Date(acc.movementsDates[i]);
    const displayMovTime = calcDisplayMovDays(movTime, acc.locale);

    const html = `
      <div class="left-history-content">
          <div class="his-content-left">
            <p>
              <span class="his-num">${i + 1}</span>
              <span class="kind-of-his ${type}">${type}</span>
            </p>
            <p class="his-date">${displayMovTime}</p>
          </div>
          <p class="n-money">${mov.toFixed(2)}€</p>
      </div>
    `;
    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((temp, mov) => (temp += mov), 0);
  totalBalance.textContent = `${acc.balance.toFixed(2)} €`;
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
  lableIncome.textContent = `${income.toFixed(2)}€`;
  lableOut.textContent = `${out.toFixed(2)}€`;
  lableInterest.textContent = `${interest.toFixed(2)}€`;
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
  displayMovements(acc);
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

  //Calculate current date and time
  const now = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatedDate = Intl.DateTimeFormat(currentAcc.locale, options).format(
    now
  );
  lableDate.textContent = formatedDate;

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
    currentAcc.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAcc);
  } else {
    alert("Wrong information!");
  }
});

requestBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Math.floor(reqInputAmount.value);
  const loanRole = currentAcc.movements.some((mov) => mov >= amount * 0.1);
  if (amount > 0 && loanRole) {
    const msg = `Requested loan \" ${amount}€ \" Accepted!`;
    displayMsg(reqLoanError, msg, "green"); //(4th parametr)Default text-shadow is WHITE
    currentAcc.movements.push(amount);
    currentAcc.movementsDates.push(new Date().toISOString());
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
  displayMovements(currentAcc, !sorted);
  sorted = !sorted;
  if (sorted) {
    sortBtn.style.color = "green";
  } else {
    sortBtn.style.color = "black";
  }
});
