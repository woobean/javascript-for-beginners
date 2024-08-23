const loginInput = document.querySelector(".login");
const greeting = document.querySelector(".greeting");

loginInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && loginInput.value.trim()) onLoginSubmit();
});

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit() {
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerHTML = `Hello <span>${username}</span>!`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  loginInput.classList.add(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginInput.classList.remove(HIDDEN_CLASSNAME);
} else {
  paintGreetings(savedUsername);
}

// rsp
const startBtn = document.querySelector(".rsp__start");
const rspBtns = document.querySelector(".rsp__btns");
const rspCover = document.querySelector(".rsp__cover");
const rspCoverText = document.querySelector(".rsp__cover__text");
const rspReplayBtn = document.querySelector(".rsp__replay");
const rspScore = document.querySelector(".rsp__score span");
let start = false;
let intervalId;
let currentValue;
let previousValue;

function generateRandomValue() {
  return Math.floor(Math.random() * 3);
}

function generateUniqueRandomValue(previous) {
  let newValue = generateRandomValue();
  while (newValue === previous) {
    newValue = generateRandomValue();
  }
  return newValue;
}

const rspStart = () => {
  if (start) return;
  intervalId = setInterval(() => {
    currentValue = generateUniqueRandomValue(previousValue);
    document
      .querySelectorAll(".rsp")
      .forEach((item) => item.classList.remove("active"));
    document.querySelector(`.rsp${currentValue}`).classList.add("active");
    previousValue = currentValue;
  }, 200);
  document
    .querySelectorAll(".rsp__btn")
    .forEach((btn) => btn.classList.remove("active"));
  start = !start;
  rspReplayBtn.classList.remove("active");
  startBtn.classList.remove("active");
  rspCover.classList.remove("active");
  rspBtns.classList.remove("disabled");
  rspBtns.classList.add("active");
};

startBtn.addEventListener("click", rspStart);

document.querySelectorAll(".rsp__btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    if (!start) return;
    clearInterval(intervalId);
    const mine = Number(btn.dataset.rsp);
    start = !start;
    rspCover.classList.add("active");
    rspBtns.classList.add("disabled");
    btn.classList.add("active");
    if (currentValue === mine) {
      rspCoverText.innerText = "DRAW";
      setTimeout(rspStart, 2000);
      return;
    }
    if (
      (currentValue === 0 && mine === 1) ||
      (currentValue === 1 && mine === 2) ||
      (currentValue === 2 && mine === 0)
    ) {
      rspCoverText.innerText = "LOSE";
      if (Number(rspScore.innerText) > 0)
        rspScore.innerText = Number(rspScore.innerText) - 1;
    } else {
      rspCoverText.innerText = "WIN!";
      rspScore.innerText = Number(rspScore.innerText) + 1;
    }
    rspReplayBtn.classList.add("active");
  })
);

const rspReplay = () => {
  rspStart();
};

rspReplayBtn.addEventListener("click", rspReplay);
