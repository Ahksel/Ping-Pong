const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 100, paddleWidth = 10, ballRadius = 10;
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;
const playerSpeed = 5;
const upArrow = 38, downArrow = 40, wKey = 87, sKey = 83;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 40) {
        drawRect(canvas.width / 2 - 1, i, 2, 20, '#fff');
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Collision with paddles
    if (ballX - ballRadius < paddleWidth) {
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    } else if (ballX + ballRadius > canvas.width - paddleWidth) {
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function movePlayers() {
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === wKey && player1Y > 0) {
            player1Y -= playerSpeed;
        } else if (e.keyCode === sKey && player1Y + paddleHeight < canvas.height) {
            player1Y += playerSpeed;
        }

        if (e.keyCode === upArrow && player2Y > 0) {
            player2Y -= playerSpeed;
        } else if (e.keyCode === downArrow && player2Y + paddleHeight < canvas.height) {
            player2Y += playerSpeed;
        }
    });
}

function drawGame() {
    // Clear canvas
    drawRect(0, 0, canvas.width, canvas.height, '#000');

    // Draw paddles and ball
    drawRect(0, player1Y, paddleWidth, paddleHeight, '#fff');
    drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, '#fff');
    drawCircle(ballX, ballY, ballRadius, '#fff');

    // Draw net
    drawNet();
}

function gameLoop() {
    drawGame();
    moveBall();
    movePlayers();
}

setInterval(gameLoop, 1000 / 60);
