const targer = document.querySelector(".target"),
  playTarger = document.querySelector(".target-cont-play"),
  playzone = document.querySelector(".play-zone");
let counter = 30,
  mlsperclick = 0,
  totalofmls = 0,
  x;
targer.addEventListener("click", () => {
  let sound = new Audio("/games/aimTesterGame/sounds/aimTesterHit.mp3");
  sound.play();
  document.querySelector(".start-menu").classList.add("hide");
  document.querySelector(".play-screen").classList.remove("hide");
  spawnTarget();
});
playTarger.addEventListener("mousedown", () => {
  let sound = new Audio("/games/aimTesterGame/sounds/aimTesterHit.mp3");
  sound.play();
  setTimeout(()=>{
    spawnTarget();
  },10)
});
function spawnTarget() {
  totalofmls += mlsperclick;
  mlsperclick = 0;
  clearInterval(x);
  let randomWidth = Math.round(Math.random() * 820);
  let randomHeight = Math.round(Math.random() * 410);
  playTarger.style.transform =
    "translate(" + randomWidth + "px," + randomHeight + "px)";
  document.querySelector(".up-text span").innerHTML = counter--;

  x = setInterval(() => {
    mlsperclick++;
  }, 10);
  if (counter == -1) {
    clearInterval(x);
    totalofmls += mlsperclick;
    resultFunction();
  }
}
function resultFunction() {
  document.querySelector(".play-screen").classList.add("hide");
  document.querySelector(".result-screen").classList.remove("hide");
  document.querySelector(".result").innerHTML =
    Math.floor(totalofmls / 30) * 10 + Math.floor(Math.random() * 10);
  mlsperclick = 0;
  totalofmls = 0;
  counter = 30;
}
document.querySelector(".try-again-btn").addEventListener("click", () => {
  document.querySelector(".result-screen").classList.add("hide");
  document.querySelector(".start-menu").classList.remove("hide");
});
