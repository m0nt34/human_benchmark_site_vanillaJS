const randomWord = document.querySelector(".random-word");
const seenBtn = document.querySelector(".seenBtn");
const newBtn = document.querySelector(".newBtn");
let scoreCounter = 0;
let wordInArrayCounter = 0;
let livesLeft = 3;
let currentWord = "";
let prevWord = "";
let seenWords = [];
function changeWord() {
  let dec = Math.random();
  if (dec > 0.45 || wordInArrayCounter <= 1) {
    fetch("words.json")
      .then((response) => response.json())
      .then((data) => {
        let randmNum = Math.ceil(Math.random() * 5072) - 1;
        currentWord = data.allWords[randmNum];
        randomWord.innerHTML = currentWord;
        prevWord = currentWord;
      });
  } else {
    currentWord = seenWords[Math.ceil(Math.random() * seenWords.length) - 1];
    while (currentWord == prevWord) {
      currentWord = seenWords[Math.ceil(Math.random() * seenWords.length) - 1];
    }
    prevWord = currentWord;
    randomWord.innerHTML = currentWord;
  }
}
changeWord();
function checkIfLose() {
  document.querySelector(".play-area").classList.add("hide");
  document.querySelector(".end-menu").classList.remove("hide");
  document.querySelector(".end-menu h1 span").innerHTML = scoreCounter;
  scoreCounter = 0;
  wordInArrayCounter = 0;
  livesLeft = 3;
  seenWords.splice(0, seenWords.length);
}
seenBtn.addEventListener("click", () => {
  if (seenWords.includes(currentWord)) {
    document.querySelector(".score-earned").innerHTML = ++scoreCounter;
  } else {
    document.querySelector(".lives-left").innerHTML = --livesLeft;
  }
  if (!seenWords.includes(currentWord)) {
    seenWords[wordInArrayCounter++] = currentWord;
  }
  if (livesLeft == 0) {
    checkIfLose();
  } else {
    changeWord();
  }
});
newBtn.addEventListener("click", () => {
  if (!seenWords.includes(currentWord)) {
    document.querySelector(".score-earned").innerHTML = ++scoreCounter;
  } else {
    document.querySelector(".lives-left").innerHTML = --livesLeft;
  }
  if (!seenWords.includes(currentWord)) {
    seenWords[wordInArrayCounter++] = currentWord;
  }
  if (livesLeft == 0) {
    checkIfLose();
  } else {
    changeWord();
  }
});
document.querySelector(".start-btn").addEventListener("click", () => {
  document.querySelector(".score-earned").innerHTML = 0;
  document.querySelector(".lives-left").innerHTML = 3;
  document.querySelector(".start-menu").classList.add("hide");
  document.querySelector(".play-area").classList.remove("hide");
});
document.querySelector(".try-again-btn").addEventListener("click", () => {
  document.querySelector(".end-menu").classList.add("hide");
  document.querySelector(".start-menu").classList.remove("hide");
});
