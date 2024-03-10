const content = document.querySelector(".game"),
    level = document.querySelector(".upbar h3 div"),
    hearts = document.querySelectorAll(".hearts .heart");
const section = [],
    sqr = [];
let xbyx = 3,
    sqram = 3,
    countsqram = 0,
    tryes = 3,
    mainLives = 3;
console.log(hearts[1])
function create() {
    let i = 0;
    for (let j = 0; j < xbyx; j++) {
        section[j] = document.createElement("div");
        section[j].classList.add("section");

        section[j].style.height = 396 / xbyx + "px";
        content.appendChild(section[j]);
    }
    for (let j = 0; j < xbyx * xbyx; j++) {
        sqr[j] = document.createElement("div");
        sqr[j].classList.add("sqr");
        sqr[j].style.height = Math.floor(396 / xbyx) + "px";
        sqr[j].style.width = Math.floor(396 / xbyx) + "px";
        sqr[j].style.border = "solid ";
        sqr[j].style.borderColor = "#2b87d1";
        sqr[j].style.pointerEvents = "all";

        sqr[j].dataset.value = "0";
        // sqr[j].classList.add("showhide");
        sqr[j].style.borderWidth = Math.floor(24.75 / xbyx) + "px";
        sqr[j].style.borderRadius = Math.floor(49.5 / xbyx) + "px";

        section[i].appendChild(sqr[j]);
        if ((j + 1) % xbyx == 0) {
            i++;
        }
    }
}

function clear() {
    for (let i = 0; i < xbyx - 1; i++) {
        content.removeChild(section[i]);
    }
}
function setWhiteSqrs() {
    level.innerHTML = sqram - 2;

    for (let i = 0; i < xbyx * xbyx; i++) {
        sqr[i].dataset.value = "0";
        sqr[i].classList.remove("win1");
        sqr[i].classList.remove("hide");
        sqr[i].classList.remove("miss");
        sqr[i].classList.remove("lose1");
        sqr[i].style.pointerEvents = "all";
    }
    for (let i = 0; i < sqram; i++) {
        let randomnum = Math.floor(Math.random() * (xbyx * xbyx));
        while (1 > 0) {
            randomnum = Math.floor(Math.random() * (xbyx * xbyx));
            if (sqr[randomnum].dataset.value == 0) {
                break;
            }
        }
        sqr[randomnum].dataset.value = "1";
    }
}

function showWhiteSqrs() {
    for (let i = 0; i < xbyx * xbyx; i++) {
        sqr[i].style.pointerEvents = "none"; //
        if (sqr[i].dataset.value == 1) {
            sqr[i].classList.add("show");
            setTimeout(() => {
                sqr[i].classList.remove("show");
                sqr[i].classList.add("hide");
            }, 1300);
            setTimeout(() => {
                sqr[i].classList.remove("hide");
            }, 1480);
        }
        setTimeout(() => {
            sqr[i].style.pointerEvents = "all";
        }, 1500);
    }
}
function winAndAdd() {
    countsqram = 0;
    tryes = 3;
    sqram++;

    setWhiteSqrs();
    showWhiteSqrs();
}
function loseAndSameThing() {
    countsqram = 0;
    tryes = 3;
    mainLives--;
    setWhiteSqrs();
    showWhiteSqrs();
}
function loseScreen() {
    for (let i = 0; i < xbyx; i++) {
        content.removeChild(section[i]);
    }
    document.getElementById("endLevelresult").innerHTML = sqram - 2;
    xbyx = 3;
    sqram = 3;
    countsqram = 0;
    tryes = 3;
    mainLives = 3;

    for (let i = 0; i < 3; i++) {
        hearts[i].style.color = "#fff";
    }
    document.getElementById("gameMenu").classList.add("hide");
    document.getElementById("endMenu").classList.remove("hide");
}

function clickfun() {
    sqr.forEach((square) => {
        square.addEventListener("click", (e) => {
            //console.log(1);
            if (e.target.dataset.value == 0) {
                e.target.classList.add("miss");
                tryes--;
                e.target.style.pointerEvents = "none";
                if (tryes == 0) {
                    document.querySelector("body").classList.add("lose");
                    hearts[mainLives - 1].style.color = "#6BABDF";

                    for (let i = 0; i < xbyx * xbyx; i++) {
                        sqr[i].classList.add("lose1");
                        sqr[i].style.pointerEvents = "none";
                    }
                    setTimeout(() => {
                        for (let i = 0; i < xbyx * xbyx; i++) {
                            //sqr[i].classList.remove("right");
                            if (
                                sqr[i].classList.contains("right") ||
                                sqr[i].classList.contains("miss")
                            ) {
                                sqr[i].classList.add("hide");
                            }
                        }
                        // console.log(sqr);
                    }, 1000);
                    setTimeout(() => {
                        for (let i = 0; i < xbyx * xbyx; i++) {
                            sqr[i].classList.remove("right");
                        }
                        document.querySelector("body").classList.remove("lose");
                        if (mainLives == 1) {
                            loseScreen();
                        } else {
                            loseAndSameThing();
                        }
                    }, 1800);
                }
            } else {
                e.target.classList.add("right");
                e.target.style.pointerEvents = "none";
                countsqram++;
                if (countsqram == sqram) {
                    for (let i = 0; i < xbyx * xbyx; i++) {
                        sqr[i].style.pointerEvents = "none";
                    }
                    document.querySelector("body").classList.add("win");
                    for (let i = 0; i < xbyx * xbyx; i++) {
                        sqr[i].classList.add("win1");
                    }
                    setTimeout(() => {
                        for (let i = 0; i < xbyx * xbyx; i++) {
                            sqr[i].classList.remove("right");
                            if (
                                sqr[i].dataset.value == 1 ||
                                sqr[i].classList.contains("miss")
                            ) {
                                sqr[i].classList.add("hide");
                            }
                        }
                    }, 1000);
                    setTimeout(() => {
                        if (
                            sqram - 1 == 3 ||
                            sqram - 1 == 6 ||
                            sqram - 1 == 9 ||
                            sqram - 1 == 14 ||
                            sqram - 1 == 19 ||
                            sqram - 1 == 24 ||
                            sqram - 1 == 30 ||
                            sqram - 1 == 36 ||
                            sqram - 1 == 42 ||
                            sqram - 1 == 48 ||
                            sqram - 1 == 55
                        ) {
                            xbyx++;
                            clear();
                            create();
                            clickfun();
                        }
                        document.querySelector("body").classList.remove("win");
                        winAndAdd();
                    }, 1800);
                }
            }
        });
    });
}
clickfun();
document.getElementById("tryAgainBtn").addEventListener("click", () => {
    document.getElementById("endMenu").classList.add("hide");
    document.getElementById("startMenu").classList.remove("hide");
});
document.getElementById("startMenu").addEventListener("click", () => {
    document.getElementById("startMenu").classList.add("hide");
    document.getElementById("gameMenu").classList.remove("hide");
    
    create();
    clickfun();
    setWhiteSqrs();
    showWhiteSqrs();
});
