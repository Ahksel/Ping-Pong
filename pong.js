const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 10;

let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;
let leftScore = 0;
let rightScore = 0;

// Velocità di movimento delle racchette
const paddleSpeed = 20; 

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff"; // Colore bianco per le racchette
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight); // Racchetta sinistra
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight); // Racchetta destra
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "#fff"; // Colore bianco per la pallina
    ctx.fill();
    ctx.closePath();
    document.getElementById("score").innerText = `Score: ${leftScore} - ${rightScore}`;
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < ballSize || ballY > canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX < 0) {
        rightScore++;
        resetBall();
        alert("SEI UN CANEPECORA");
    } else if (ballX > canvas.width) {
        leftScore++;
        resetBall();
        alert("SEI UN CANEPECORA");
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Reverse direction
}

// Controllo delle racchette con i tasti
document.addEventListener("keydown", (event) => {
    // Movimento racchetta sinistra
    if (event.key === "ArrowUp" && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed; // Muovi la racchetta sinistra verso l'alto
    } else if (event.key === "ArrowDown" && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += paddleSpeed; // Muovi la racchetta sinistra verso il basso
    }

    // Movimento racchetta destra
    if (event.key === "w" && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed; // Muovi la racchetta destra verso l'alto
    } else if (event.key === "s" && rightPaddleY < canvas.height - paddleHeight) {
        rightPaddleY += paddleSpeed; // Muovi la racchetta destra verso il basso
    }
});

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
