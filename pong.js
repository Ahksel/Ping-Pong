const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Variabili di gioco
let gameStarted = false; // Stato del gioco
let leftPaddleY = (canvas.height - 100) / 2; // Posizione della racchetta di sinistra
let rightPaddleY = (canvas.height - 100) / 2; // Posizione della racchetta di destra
const paddleHeight = 100;
const paddleWidth = 10;
const paddleSpeed = 20;
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let leftScore = 0;
let rightScore = 0;
const waitingMessage = "Aspettando un secondo giocatore...";
const sessionId = Math.random().toString(36).substring(2, 15); // Genera un ID di sessione unico

// Mostra l'ID di sessione
document.getElementById("sessionId").innerText += sessionId;

// Funzione di disegno
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il campo da gioco

    // Mostra messaggio di attesa se il gioco non è iniziato
    if (!gameStarted) {
        ctx.font = "30px Arial";
        ctx.fillText(waitingMessage, canvas.width / 2 - ctx.measureText(waitingMessage).width / 2, canvas.height / 2);
        return; // Non disegna altro finché il gioco non inizia
    }

    // Disegna racchette
    ctx.fillStyle = "white";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight); // Racchetta sinistra
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight); // Racchetta destra

    // Disegna pallina
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Disegna punteggio
    ctx.font = "30px Arial";
    ctx.fillText(leftScore, canvas.width / 4, 30);
    ctx.fillText(rightScore, (canvas.width * 3) / 4, 30);
}

// Funzione per aggiornare il punteggio e gestire la pallina
function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Controlla collisioni con le racchette
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY; // Rimbalza verticalmente
    }
    
    // Controllo per la racchetta sinistra
    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Rimbalza
    }

    // Controllo per la racchetta destra
    if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Rimbalza
    }

    // Controlla se un giocatore segna
    if (ballX < 0) {
        rightScore++; // Giocatore di destra segna
        resetBall();
    } else if (ballX > canvas.width) {
        leftScore++; // Giocatore di sinistra segna
        resetBall();
    }
}

// Funzione per ripristinare la posizione della pallina
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Cambia la direzione della pallina
}

// Funzione per iniziare il gioco
function startGame() {
    gameStarted = true;
}

// Funzione per il secondo giocatore
function playerJoined() {
    console.log(`Giocatore unito con ID sessione: ${sessionId}`);
    startGame(); // Inizia il gioco quando il secondo giocatore si unisce
}

// Controllo della racchetta sinistra
document.addEventListener("mousemove", (event) => {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    leftPaddleY = mouseY - paddleHeight / 2; // Raccoglie la posizione del mouse per la racchetta sinistra
});

// Controllo della racchetta destra
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        rightPaddleY = Math.max(rightPaddleY - paddleSpeed, 0); // Muove la racchetta destra verso l'alto
    } else if (event.key === "ArrowDown") {
        rightPaddleY = Math.min(rightPaddleY + paddleSpeed, canvas.height - paddleHeight); // Muove la racchetta destra verso il basso
    }
});

// Aggiungi gestore di eventi per il pulsante "Pronto"
document.getElementById("readyButton").addEventListener("click", playerJoined);

// Ciclo di aggiornamento
function update() {
    if (gameStarted) {
        updateBall();
    }
    draw();
    requestAnimationFrame(update);
}

// Inizia il ciclo di aggiornamento
update();
