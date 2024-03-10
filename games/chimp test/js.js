const startScreen = document.querySelector(".start-menu "),
  gameScreen = document.querySelector(".play-area"),
  continueScreen = document.querySelector(".continue-screen"),
  endGameScreen = document.querySelector(".end-screen"),
  startBtn = document.querySelector(".startBtn"),
  allSqrs = document.querySelectorAll(".playsqrs"),
  livesTxt = document.querySelector(".x-of-3 span");

let sqrAmount = 4,
  level = 1,
  lives = 0,
  compareSqrNum = 1;
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hide");
  gameScreen.classList.remove("hide");
  setSrsFunction();
});
document.querySelector(".continueBtn").addEventListener("click", () => {
  continueScreen.classList.add("hide");
  gameScreen.classList.remove("hide");
  setSrsFunction();
});
document.querySelector(".tryAgainBtn").addEventListener("click", () => {
  lives = 0;
  endGameScreen.classList.add("hide");
  startScreen.classList.remove("hide");
});
function setSrsFunction() {
  for (let i = 0; i < sqrAmount; i++) {
    let randomNum = Math.floor(Math.random() * 40);
    while (allSqrs[randomNum].innerHTML != "") {
      randomNum = Math.floor(Math.random() * 40);
    }
    allSqrs[randomNum].innerHTML = i + 1;
    allSqrs[randomNum].classList.add("withnum");
  }
}

function winFunc() {
  livesTxt.innerHTML = lives;
  level++;
  sqrAmount++;
  document.querySelector(".result-of-nums").innerHTML = sqrAmount;
  compareSqrNum = 1;
  gameScreen.classList.add("hide");
  continueScreen.classList.remove("hide");
}
function loseFunc() {
  compareSqrNum = 1;
  gameScreen.classList.add("hide");
  continueScreen.classList.remove("hide");
  for (let j = 0; j <= 39; j++) {
    if (
      allSqrs[j].classList.contains("withnum") ||
      allSqrs[j].classList.contains("hide")
    ) {
      allSqrs[j].classList.remove("hide");
      allSqrs[j].classList.remove("withnum");
      allSqrs[j].innerHTML = "";
    }
  }
  lives++;
  livesTxt.innerHTML = lives;
  if (lives == 3) {
    fullLoseFunction();
  }
}
function fullLoseFunction() {
  lives = 0;
  continueScreen.classList.add("hide");
  endGameScreen.classList.remove("hide");
  document.querySelector(".levelNum").innerHTML = sqrAmount;

  sqrAmount = 4;
  level = 1;
}
allSqrs.forEach((sqr) => {
  sqr.addEventListener("click", () => {
    if (sqr.classList.contains("withnum")) {
      if (level == 1) {
        if (sqr.innerHTML == compareSqrNum) {
          compareSqrNum++;
          sqr.classList.remove("withnum");
          sqr.classList.remove("hide");
          sqr.innerHTML = "";
          if (compareSqrNum == sqrAmount + 1) {
            winFunc();
          }
        } else {
          loseFunc();
        }
      } else {
        for (let j = 0; j <= 39; j++) {
          if (allSqrs[j].classList.contains("withnum")) {
            allSqrs[j].classList.add("hide");
          }
        }
        if (sqr.innerHTML == compareSqrNum) {
          sqr.classList.remove("withnum");
          sqr.classList.remove("hide");
          sqr.innerHTML = "";
          compareSqrNum++;
          if (compareSqrNum == sqrAmount + 1) {
            winFunc();
          }
        } else {
          loseFunc();
        }
      }
    }
  });
});
