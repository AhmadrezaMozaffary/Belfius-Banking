'use strict';
const firstLoginBtn = document.querySelector('.first-login-btn');
const firstSignupBtn = document.querySelector('.first-signup-btn');
const loginSection = document.querySelector('.login');
const signupSection = document.querySelector('.signup');
const loginHeader = document.querySelector('.loign-header');
const loginMessage = document.querySelector('.in-msg');
const btnContainer = document.querySelector('.btn-container');
const backBtn1 = document.querySelector('.back-btn1');
const backBtn2 = document.querySelector('.back-btn2');


const backBtns = function() {
    loginSection.classList.add('hidden');
    signupSection.classList.add('hidden');
    btnContainer.classList.remove('hidden');
    loginMessage.textContent = 'Log in ';

};


firstLoginBtn.addEventListener('click', ()=>{
 btnContainer.classList.toggle('hidden')
 loginSection.classList.toggle('hidden');
})

firstSignupBtn.addEventListener('click', ()=>{
    btnContainer.classList.toggle('hidden')
    signupSection.classList.toggle('hidden');
    loginMessage.textContent = 'Sign up ';
});

backBtn1.addEventListener('click', backBtns);
backBtn2.addEventListener('click', backBtns);