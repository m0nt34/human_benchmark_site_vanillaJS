const blocks = document.querySelectorAll(".block"),
    tryAgainBtn = document.querySelector(".tryAg"),
    startBtn = document.querySelector(".startBtn"),
    curLevel = document.querySelector(".level span");
let SequencePattern = [],
    mainCounter = 0,
    levelCounter = 0;
SequencePattern[-1] = 0;
console.log(curLevel)
function createPattern() {
    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * 9) + 1;
    } while (randomNum == SequencePattern[SequencePattern.length - 1]);
    SequencePattern.push(randomNum);
    let i = 0;
    blocks.forEach((block) => {
        block.style.pointerEvents = "none";
    });
    let x = setInterval(() => {
        for (let j = 0; j < 9; j++) {
            if (blocks[j].dataset.value == SequencePattern[i]) {
                blocks[j].classList.add("flash");
                setTimeout(() => {
                    blocks[j].classList.remove("flash");
                }, 420);
            }
        }
        i++;
        if (i >= SequencePattern.length) {
            clearInterval(x);
            setTimeout(() => {
                blocks.forEach((block) => {
                    block.style.pointerEvents = "all";
                });
            }, 300);
        }
    }, 750);
    if (SequencePattern.length >= 2) {
        document.querySelector("body").classList.add("win");
        blocks.forEach((block) => {
            block.classList.add("win");
        });

        setTimeout(() => {
            document.querySelector("body").classList.remove("win");
            blocks.forEach((block) => {
                block.classList.remove("win");
            });
        }, 1000);
    }
    levelCounter++;
    curLevel.innerHTML = levelCounter;
    mainCounter = 0;
}
console.log(document.querySelector(".fthsquare1 .insq1"));
function LoseFunction() {
    let saveArLength = SequencePattern.length;

    for (let i = 0; i < saveArLength; i++) {
        SequencePattern.pop();
    }
    document.querySelector(".playZone").classList.add("hide");
    document.querySelector(".loseMenu").classList.remove("hide");
    document.querySelector("body").classList.add("lose");
    document.querySelector(".fthsquare1 .insq1").classList.add("lose");
    setTimeout(() => {
        document.querySelector("body").classList.remove("lose");
        document.querySelector(".fthsquare1 .insq1").classList.remove("lose");
    }, 1000);
    document.querySelector(".levelAtTheEnd span").innerHTML = levelCounter;

    levelCounter = 0;
}
blocks.forEach((block) => {
    block.addEventListener("mousedown", (e) => {
        if (e.target.dataset.value == SequencePattern[mainCounter]) {
            block.classList.add("flash");
            setTimeout(() => {
                block.classList.remove("flash");
            }, 300);
            mainCounter++;
            if (mainCounter >= SequencePattern.length) {
                setTimeout(() => {
                    createPattern();
                }, 380);
            }
        } else {
            LoseFunction();
        }
    });
});
tryAgainBtn.addEventListener("click", () => {
    document.querySelector(".loseMenu").classList.add("hide");
    document.querySelector(".startMenu").classList.remove("hide");
});
startBtn.addEventListener("click", () => {
    document.querySelector(".startMenu").classList.add("hide");
    document.querySelector(".playZone").classList.remove("hide");
    createPattern();
});
