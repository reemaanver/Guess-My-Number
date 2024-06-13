'use strict';

let randomNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;

const queryStrings = {
  message: document.querySelector('.message'),
  check: document.querySelector('.check'),
  userInput: document.querySelector('.input-box'),
  score: document.querySelector('.score'),
  highscore: document.querySelector('.highscore'),
  body: document.querySelector('body'),
  left: document.querySelector('.left'),
  right: document.querySelector('.right'),
  again: document.querySelector('.again'),
  qstnBox: document.querySelector('.qstn-box'),
  btn: document.querySelectorAll('.btn'),
};

queryStrings.userInput.value = 0;

const winStyles = function () {
  queryStrings.body.style.backgroundColor = '#ffd08d';
  queryStrings.body.style.color = '#ffc470';
  queryStrings.left.style.backgroundColor = '#f6705e';
  queryStrings.right.style.backgroundColor = '#f78070';
  for (let i = 0; i < queryStrings.btn.length; i++) {
    queryStrings.btn[i].style.backgroundColor = '#ffd08d';
    queryStrings.btn[i].style.color = '#f6705e';
  }
};

const resetStyles = function () {
  queryStrings.body.style.backgroundColor = '#dd5746';
  queryStrings.body.style.color = '#8b322c';
  queryStrings.left.style.backgroundColor = '#ffc470';
  queryStrings.right.style.backgroundColor = '#ffcc86';
  for (let i = 0; i < queryStrings.btn.length; i++) {
    queryStrings.btn[i].style.backgroundColor = '#dd5746';
    queryStrings.btn[i].style.color = '#fff';
  }
};

const gameReset = function () {
  resetStyles();
  queryStrings.userInput.disabled = false;
  queryStrings.check.disabled = false;
  score = 20;
  queryStrings.score.textContent = score;
  queryStrings.message.textContent = 'Start guessing...';
  queryStrings.userInput.value = 0;
  queryStrings.qstnBox.textContent = '?';
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  queryStrings.check.classList.remove('no-box-shadow');
};

const invalid = function () {
  queryStrings.message.textContent = 'enter number btw 1 & 20 🤡';
};

const noInput = function () {
  queryStrings.message.textContent = '⛔️ No Number';
};

const win = function () {
  queryStrings.message.textContent = 'You win 🥳';
  highscore = Math.max(highscore, score);
  queryStrings.highscore.textContent = highscore;
  queryStrings.userInput.disabled = true;
  queryStrings.check.disabled = true;
  queryStrings.qstnBox.textContent = randomNumber;
  queryStrings.userInput.value = ' ';
  queryStrings.check.classList.add('no-box-shadow');

  winStyles();
};

const tryAgain = function (userGuess) {
  queryStrings.message.textContent =
    userGuess > randomNumber ? 'Too high 🥵' : 'Too Low 🥶';
  score--;
  queryStrings.score.textContent = score;
  if (score === 0) {
    lose();
  }
};

const lose = function () {
  queryStrings.message.textContent = 'You lose 😂';
  queryStrings.userInput.disabled = true;
  queryStrings.check.disabled = true;
  queryStrings.qstnBox.textContent = randomNumber;
  queryStrings.userInput.value = ' ';
};

const gamePlay = function () {
  const userGuess = Number(queryStrings.userInput.value);

  if (score > 0) {
    if (userGuess === 0) {
      noInput();
    } else if (userGuess === randomNumber) {
      win();
    } else if (userGuess > 20 || userGuess < 0) {
      invalid();
    } else {
      tryAgain(userGuess);
    }
  } else {
    lose();
  }
};

queryStrings.check.addEventListener('click', function () {
  gamePlay();
});

document.querySelector('.again').addEventListener('click', function () {
  gameReset();
});
