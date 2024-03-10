const start = document.getElementById("start-Btn"),
    timer = document.getElementById("frttimer"),
    startMenu = document.getElementById("start-menu"),
    showNumScreen = document.getElementById("show-num-screen"),
    enterNumScreen = document.getElementById("enter-showed-num"),
    randNumber = document.getElementById("numb"),
    inputField = document.getElementById("input-seen-num"),
    submitBtn = document.getElementById("submit-btn"),
    winScreen = document.querySelector(".win-screen"),
    loseScreen = document.querySelector(".lose-screen"),
    yourAnswerField = document.getElementById("yourAnswer");
let x = 450,
    randNumAmount = 1,
    randomNumberItself = "";
let forlooplength;
function createRandNum() {
    for (let i = 0; i < randNumAmount; i++) {
        if (i == 0) {
            randomNumberItself += Math.floor(Math.random() * 9) + 1;
        } else {
            randomNumberItself += Math.floor(Math.random() * 10);
        }
    }
    randNumber.innerHTML = randomNumberItself;
}
function checkIfguessIsRight() {
    if (inputField.value == randomNumberItself) {
        winfunction();
    } else {
        losefunction();
    }
}
function winfunction() {

    document.querySelector("body").classList.add("win");
    document.querySelector(".answer span").innerHTML = randomNumberItself;
    document.querySelector(".your-answer span").innerHTML = randomNumberItself;

    document.querySelector(".level span").innerHTML = randNumAmount;
    document.querySelector(".nextBtn").focus();
    enterNumScreen.classList.add("hide");
    winScreen.classList.remove("hide");
    randNumAmount++;
    randomNumberItself = "";
    setTimeout(() => {
        document.querySelector("body").classList.remove("win");
        
    }, 1000);
}
function losefunction() {
    document.querySelector("body").classList.add("lose");
    let savedyourans = inputField.value;
    forlooplength = savedyourans.length;
    for (let i = 0; i < savedyourans.length; i++) {
        const letter = document.createElement("span");
        letter.textContent = savedyourans[i];

        if (
            savedyourans[i] != randomNumberItself[i] ||
            i >= randomNumberItself.length
        ) {
            letter.style.color = "#000";
            letter.style.textDecoration = "line-through";
        }
        yourAnswerField.appendChild(letter);
    }
    document.getElementById("answer").innerHTML = randomNumberItself;
    document.getElementById("level1").innerHTML = randNumAmount;
    enterNumScreen.classList.add("hide");
    loseScreen.classList.remove("hide");
    randNumAmount = 1;
    randomNumberItself = "";
    x = 450;
    setTimeout(() => {
        document.querySelector("body").classList.remove("lose");
        
    }, 1000);
}
submitBtn.addEventListener("click", () => {
    if (inputField.value.replace(/\s/g, "").length != 0) {
        checkIfguessIsRight();
    }
});
inputField.addEventListener("keypress", (e) => {
    if (inputField.value.replace(/\s/g, "").length != 0 && e.key === "Enter") {
        checkIfguessIsRight();
    }
});
function startShowingNum() {
    createRandNum();
    startMenu.classList.add("hide");
    winScreen.classList.add("hide");
    showNumScreen.classList.remove("hide");
    timer.style.width = "120px";
    let a;
    x += 550;
    a = (40 * timer.clientWidth) / x;
    let b = setInterval(() => {
        timer.style.width = timer.clientWidth - a + "px";

        if (timer.clientWidth <= 5) {
            showNumScreen.classList.add("hide");
            enterNumScreen.classList.remove("hide");
            inputField.value = "";
            inputField.focus();
            clearInterval(b);
        }
    }, 40);
}
start.addEventListener("click", startShowingNum);
document.querySelector(".nextBtn").addEventListener("click", startShowingNum);
document.querySelector(".tryAgainBtn").addEventListener("click", () => {
    for (let i = 0; i < forlooplength; i++) {
        yourAnswerField.removeChild(yourAnswerField.firstElementChild);
    }
    loseScreen.classList.add("hide");
    startMenu.classList.remove("hide");
});
