const cards = document.querySelectorAll('.memory-card');
const resultDisplay = document.querySelector('#result');
const soundScore = new Audio("./assets/score.mp3");

// let timer = document.querySelector('#timer');
var cardsWon = []; // cards iguais selecionados

let score = 0;
let hasFlippedCard = false; //tem card virado
let lockBoard = false; //só desbloqueia p clicar em outra carta quando as cartas ja tiverem viradas de novo.
let firstCard;
let secondCard;



function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; //p q a pessoa n clique duas vzs na msm carta no msm momento - se o alvo do click é ainda a primeira carta
  this.classList.toggle('flip'); //adc e remove a class flip dinamicamente

  if (!hasFlippedCard) { //1ºclik(1ªcarta) - se tem card virado
    hasFlippedCard = true;
    firstCard = this;
  } else { // 2º click(2ªcarta)
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch(); //depois q duas cartas forem clicadas eu chamo
    //a função que vai checar se o par é compatível.
  }
}

function checkForMatch() {
  // verificando se os cards correspondem
  if (firstCard.dataset.id === secondCard.dataset.id) {
    // são iguais? entao chama a func q remove o click nas cartas.
    soundScore.play();
    score ++;
    
    resultDisplay.textContent = score;
    cardsWon.push(firstCard, secondCard);// colocando os cards selecionados iguais no array
    
  } else { // se o par não corresponde
    //chama a func q remove a class flip q mantem os cards virados
    // então os cards vão desvirar pq o par n corresponde
    unflipCard();
  }

  if (cardsWon.length === cards.length){ //metade é card 1 e metade é correspondente
    resultDisplay.textContent = 'Congratulations!!!';
  }
}

function disableCards() {
  // são iguais ? então remove os eventos de click nas cartas
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCard() {
  lockBoard = true;

  setTimeout(() => { //O time é para que de tempo os dois 
    //cards serem virados
    //e depois desvirados com o remove class, sem o time os cards n
    //chegariam a ser virados completamente.
    firstCard.classList.remove('flip'); //remove a class q mantem os cards virados
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function randomCards() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 24); //12
    card.style.order = randomPosition;
  });
})(); //executando imediatamente

cards.forEach(cards => cards.addEventListener('click', flipCard));
