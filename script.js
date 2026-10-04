var score = 0;
var high_score = 0;
let life = 5;

const garea = document.querySelector(".gamearea");
const bask = document.querySelector(".basket");
const baskImg = document.querySelector(".basket-img");
const flo = document.querySelector(".flower");

const startScreen = document.querySelector("#start-screen");
const startBtn = document.querySelector("#start-btn");

const endScreen = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const finalHighScore = document.querySelector("#final-high-score");
const restartBtn = document.querySelector("#restart-btn");

let playing = false;

// Basket movement
function moveB(clientX) {
    const area = garea.getBoundingClientRect();
    const x = clientX - area.left - garea.clientLeft;
    const halfWid = bask.offsetWidth / 2;

    const pos = Math.max(
        halfWid,
        Math.min(x, garea.clientWidth - halfWid)
    );

    bask.style.left = pos + "px";
}

garea.addEventListener("pointermove", function (event) {
    if (!playing) {
        return;
    }

    moveB(event.clientX);
});

document.addEventListener("keydown", function (event) {
    if (!playing) {
        return;
    }

    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
    }

    event.preventDefault();

    const baskArea = bask.getBoundingClientRect();
    const center = baskArea.left + baskArea.width / 2;
    const step = event.key === "ArrowLeft" ? -20 : 20;

    moveB(center + step);
});

// Basket fill stages
function updateBasket() {
    if (score >= 10) {
        baskImg.src = "assets/basket2.png";
    } else if (score >= 5) {
        baskImg.src = "assets/basket1.png";
    } else {
        baskImg.src = "assets/basket0.png";
    }
}

// Flower movement
let floY = 0;
let prevTm = null;
const fallspd = 150;

function resetflo() {
    const halfWid = flo.offsetWidth / 2;

    const floX =
        halfWid + Math.random() * (garea.clientWidth - flo.offsetWidth);

    floY = -flo.offsetHeight;
    flo.style.left = floX + "px";
    flo.style.top = floY + "px";
}

// Catch and miss detection
function CCcatch() {
    const floBx = flo.getBoundingClientRect();
    const baskBx = bask.getBoundingClientRect();

    const flocent = floBx.left + floBx.width / 2;
    const baskOp = baskBx.top + baskBx.height * 0.55;

    const inBask =
        flocent >= baskBx.left && flocent <= baskBx.right;

    const atOp =
        floBx.bottom >= baskOp && floBx.top <= baskOp;

    if (inBask && atOp) {
        score++;
        updateBasket();
        resetflo();
    } else if (floY > garea.clientHeight) {
        life--;
        resetflo();
    }

    document.querySelector("#score-val").textContent = score;
    document.querySelector("#live-remain").textContent =
        "🌸".repeat(life);
}

function fallflo(time) {
    if (!playing) {
        return;
    }

    if (prevTm === null) {
        prevTm = time;
    }

    const sec = Math.min((time - prevTm) / 1000, 0.05);
    prevTm = time;

    floY += fallspd * sec;
    flo.style.top = floY + "px";

    CCcatch();

    if (life === 0) {
        playing = false;
        high_score = Math.max(score, high_score);

        document.querySelector("#high-score-val").textContent =
            high_score;

        finalScore.textContent = score;
        finalHighScore.textContent = high_score;

        endScreen.hidden = false;
        return;
    }

    requestAnimationFrame(fallflo);
}

// Initial screen
flo.hidden = true;
startScreen.hidden = false;
endScreen.hidden = true;
updateBasket();

// Start game
startBtn.addEventListener("click", function () {
    if (playing) {
        return;
    }

    startScreen.hidden = true;
    flo.hidden = false;
    playing = true;
    prevTm = null;

    resetflo();
    requestAnimationFrame(fallflo);
});

// Restart game
restartBtn.addEventListener("click", function () {
    if (life !== 0 || playing) {
        return;
    }

    score = 0;
    life = 5;
    prevTm = null;
    updateBasket();

    document.querySelector("#score-val").textContent = score;
    document.querySelector("#live-remain").textContent =
        "🌸".repeat(life);

    endScreen.hidden = true;

    const area = garea.getBoundingClientRect();
    moveB(area.left + garea.clientLeft + garea.clientWidth / 2);

    playing = true;
    resetflo();
    requestAnimationFrame(fallflo);
});