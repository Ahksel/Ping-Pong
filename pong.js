const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const user = {
  x: 0,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  color: "BLUE",
  score: 0,
};

const computer = {
  x: canvas.width - 10,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  color: "RED",
  score: 0,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  velocityX: 4,
  velocityY: 4,
};

// disegnare il rettangolo
function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// disegnare la palla
function drawArc(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

// disegnare il punteggio
function drawScore(text, x, y) {
  context.fillStyle = "#FFF";
  context.font = "35px Arial";
  context.fillText(text, x, y);
}

// aggiornare il gioco
function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // logica di collisione
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  let player = (ball.x < canvas.width / 2) ? user : computer;

  // controllare la collisione con il giocatore
  if (collision(ball, player)) {
    // Cambiare direzione
    ball.velocityX = -ball.velocityX;

    // Aggiungere un po' di velocità
    ball.velocityX *= 1.1;
  }

  // gestire le perdite
  if (ball.x - ball.radius < 0) {
    computer.score++;
    resetBall();
    alert("SEI UN CANEPECORA"); // Messaggio di perdita
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    resetBall();
    alert("SEI UN CANEPECORA"); // Messaggio di perdita
  }
}

// controllare la collisione
function collision(ball, player) {
  player.top = player.y;
  player.bottom = player.y + player.height;
  player.left = player.x;
  player.right = player.x + player.width;

  ball.top = ball.y - ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;
  ball.right = ball.x + ball.radius;

  return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
}

// reset della palla
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 4;
  ball.velocityX = -ball.velocityX;
}

// controllo del movimento dell'utente con il mouse
canvas.addEventListener("mousemove", (event) => {
  let rect = canvas.getBoundingClientRect();
  user.y = event.clientY - rect.top - user.height / 2;

  // Limitare i movimenti ai bordi del canvas
  if (user.y < 0) {
    user.y = 0;
  } else if (user.y + user.height > canvas.height) {
    user.y = canvas.height - user.height;
  }
});

// gioco principale
function game() {
  update();
  render();
}

// disegnare il canvas
function render() {
  drawRect(0, 0, canvas.width, canvas.height, "BLACK"); // sfondo
  drawScore(user.score, canvas.width / 4, canvas.height / 5);
  drawScore(computer.score, 3 * canvas.width / 4, canvas.height / 5);
  drawRect(user.x, user.y, user.width, user.height, user.color); // giocatore
  drawRect(computer.x, computer.y, computer.width, computer.height, computer.color); // computer
  drawArc(ball.x, ball.y, ball.radius, "WHITE"); // palla
}

setInterval(game, 1000 / 50);
