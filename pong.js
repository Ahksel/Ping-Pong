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

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw score
    document.getElementById("score").innerText = `Score: ${leftScore} - ${rightScore}`;
}

function update() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY < ballSize || ballY > canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Check if ball goes out of bounds
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

document.addEventListener("mousemove", (event) => {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (mouseY >= 0 && mouseY <= canvas.height - paddleHeight) {
        leftPaddleY = mouseY;
    }
});

function aiMove() {
    if (rightPaddleY + paddleHeight / 2 < ballY) {
        rightPaddleY += 4; // AI moves down
    } else {
        rightPaddleY -= 4; // AI moves up
    }
}

function gameLoop() {
    draw();
    update();
    aiMove();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
