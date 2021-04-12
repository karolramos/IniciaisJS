const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
const buttonRestart = document.querySelector('[data-js="restart"]');
const msgDisplay = document.querySelector('.msgDisplay');
const wrpRestart = document.querySelector('.wrp-restart');
let resultMsg = document.querySelector(".resultMsg");
let currentShooterIndex = 370;
let width = 20; //20
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let results = 0;

for (let i = 0; i < 400; i++) {
  const square = document.createElement("div");
  grid.appendChild(square); //adc os quadrados a tela.
}

const squares = Array.from(document.querySelectorAll(".grid div")); 

//posição dos invasores no tabuleiro.
const alienInvaders = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,

  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,

  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51
];

// desenhando os invasores no tabuleiro
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      //garantir q ele n desenhe o msm invasor abatido
      //desenhando em cada quadradinho um invasor no indice dele.
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
}
draw();

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}

squares[currentShooterIndex].classList.add("shooter"); // desenhando o atirador

  // fazer atirador se mover pela grade(sem subir ou descer)
  function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) {
        currentShooterIndex -= 1;
      }
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) {
        currentShooterIndex += 1;
      }
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

//movendo invasores - e definindo bordas
function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0; 
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1; 
  remove();

  if (rightEdge && goingRight) {
    //se nosso ultimo invasor estivar na borda direita
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1; //mover p/baixo e mudar a direção
      direction = -1; // agora vai p esquerda
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1; //se atingir borda esq vai pra baixo
      direction = 1; //agora vai p direita
      goingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }
  draw();

  //GAME OVER
  //se o atirador tiver as duas classes -acaba jogo - colisão
  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    wrpRestart.style.display = "flex";
    msgDisplay.innerHTML = 'You lost :(';
    squares[currentShooterIndex].classList.add("boom");
    clearInterval(invadersId);
    document.removeEventListener("keydown", shoot);
    document.removeEventListener("keydown", moveShooter);
  }
  //se os invasores tiverem no final do tabuleiro
  for (let i = 0; i <= alienInvaders.length - 1; i++) {
    if (alienInvaders[i] > squares.length - (width - 1)) {
      wrpRestart.style.display = "flex";
      msgDisplay.innerHTML = "You lost :(";

      clearInterval(invadersId);
      document.removeEventListener("keydown", shoot);
      document.removeEventListener("keydown", moveShooter);
    }
  }
  // se ganhou - matou todos
  if (aliensRemoved.length === alienInvaders.length) {
    wrpRestart.style.display = "flex";
    msgDisplay.innerHTML = "You Win🏆";

    clearInterval(invadersId);
    document.removeEventListener("keydown", shoot);
    document.removeEventListener("keydown", moveShooter);
    // return;
  }

}
invadersId = setInterval(moveInvaders, 250);


// pei pei pei
function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add("laser");

    //se o laser ta num quadradinho q tenha a classe invader. SE ATINGIR
    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.add("boom");

      //removendo o boom
      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        300
      );
      clearInterval(laserId);

      //removendo os invasores q o laser pegou e colocando no array
      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      results++;
      resultsDisplay.innerHTML = results;
    }

    //tirando laser do tabuleiro quando passar da tela
    if (currentLaserIndex < width) {
      clearInterval(laserId);
      setTimeout(
        () => squares[currentLaserIndex].classList.remove("laser"),
        200
      );
    }
  }

  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
  }
}
document.addEventListener("keydown", shoot);
