const startMenuCl = document.querySelector(".startMenu"),
  body = document.querySelector("body"),
  playArea = document.querySelector(".playArea"),
  dontClick = document.querySelector(".playArea .dontClick"),
  tooSoonScreen = document.querySelector(".tooSoon"),
  clickcreen = document.querySelector(".clickScreen"),
  resultBox = document.querySelector(".resultBox"),
  resultinMs = document.querySelector(".resultinMs span"),
  endResultAvarege = document.querySelector(".endresult span");
let x,
  y,
  countMl = 0,
  countAvaregeMl = 0,
  countToFive = 0,
  randomNumForLastDigit;
startMenuCl.addEventListener("click", () => {
  startMenuCl.classList.add("hide");
  playArea.classList.remove("hide");
  dontClick.classList.remove("hide");
  body.classList.add("wait");
  randomTimeMaker();
});
function randomTimeMaker() {
  let randomTime = Math.floor(Math.random() * 2500) + 2500;
  x = setTimeout(() => {
    body.classList.remove("wait");
    body.classList.add("click");
    dontClick.classList.add("hide");
    clickcreen.classList.remove("hide");
    y = setInterval(() => {
      countMl++;
    }, 10);
  }, randomTime);
}
dontClick.addEventListener("click", () => {
  dontClick.classList.add("hide");
  body.classList.remove("wait");
  clearTimeout(x);
  dontClick.classList.add("hide");
  tooSoonScreen.classList.remove("hide");
});
tooSoonScreen.addEventListener("click", () => {
  tooSoonScreen.classList.add("hide");
  body.classList.add("wait");
  dontClick.classList.remove("hide");
  randomTimeMaker();
});
clickcreen.addEventListener("click", () => {
  countToFive += 1;
  randomNumForLastDigit = countMl * 10 + Math.round(Math.random() * 9);
  resultinMs.innerHTML = randomNumForLastDigit;
  countAvaregeMl += randomNumForLastDigit;
  if (countToFive >= 5) {
    clearInterval(y);
    clickcreen.classList.add("hide");
    body.classList.remove("click");
    playArea.classList.add("hide");
    document.querySelector(".endResultBox").classList.remove("hide");
    endResultAvarege.innerHTML = Math.floor(countAvaregeMl / 5);
    countAvaregeMl = 0;
    countToFive = 0;
    countMl = 0;
  } else {
    clearInterval(y);
    clickcreen.classList.add("hide");

    resultBox.classList.remove("hide");
    body.classList.remove("click");
  }
});
document.querySelector(".endTryAgain").addEventListener("click", () => {
  document.querySelector(".endResultBox").classList.add("hide");
  startMenuCl.classList.remove("hide");
});
resultBox.addEventListener("click", () => {
  resultBox.classList.add("hide");
  dontClick.classList.remove("hide");
  body.classList.add("wait");
  countMl = 0;
  randomTimeMaker();
});
