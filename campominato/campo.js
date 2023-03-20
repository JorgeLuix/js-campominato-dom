/*  `<div class="square">1</div>`  */

const levelForm = document.getElementById("levelForm");

levelForm.addEventListener("submit", play);


//funzione per disegnare quadratino//
function drawSquare( index, sidenumSquares) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.width = `calc(100% / ${sidenumSquares} )`;
  square.style.height = square.style.width;
  square.innerHTML = index;
  return square;
}

//funzione numeri Randomici
function getRndNumber(max) {
  return Math.floor(Math.random() * max);
}


function generateBombs(bombnum, numSquares) {
  const bombs = [];
  console.log("🚀 ~ file: campo.js:26 ~ generateBombs ~ bombs:", bombs)
  while (bombs.length <= bombnum -1) {
    const bomb = getRndNumber(numSquares);
    if (bombs.indexOf(bomb) === -1 && bomb !== 0) {
    bombs.push(bomb);

    }
  }
  return bombs;
}

function sendMessage(messaggio) {
  
  score.innerHTML = messaggio;
}

function play(e) {
  e.preventDefault();

  const scoreElement = document.getElementById("score");
  
  const playground = document.getElementById("playground");
  playground.innerHTML = "";

  let messaggio = `Seleziona la dificoltà e premmi play`;
  sendMessage(messaggio);

  const NUM_BOMBS = 16;
  let gameover = false;
  let firstBombIndex = -1;
  let score = 0;
  

  const level = document.getElementById("level").value;
  
  
  let squareNumbers;
  switch (level) {
    case "easy":
      squareNumbers = 100;
      break;
    case "medium":
      squareNumbers = 81;
      break;
    case "hard":
      squareNumbers = 49;
      break;
  }
 

  function checkWin() {
    const blueSquares = document.querySelectorAll(".sq-blue");
    const numBlueSquares = blueSquares.length;
    const numSafeSquares = squareNumbers - NUM_BOMBS;
    if (numBlueSquares === numSafeSquares) {
      removeSquareListeners();
      messaggio = ` Hai vinto !! Il tuo punteggio e: ${score}`;
    }
    }
  
  
  //Funzione per mostrare le posizione delle bombe
  function revealBombs() {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) { //--> Se un quadrato contiene una bomba, alla casella viene aggiunta la classe .sq-red
      if (bombs.indexOf(i + 1) !== -1) {
        squares[i].classList.add("sq-red");
        squares[i].innerHTML = `<i class="fas fa-bomb"></i>`;
      }
    }
  }

  function removeSquareListeners() {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
      squares[i].removeEventListener("click", squareClickHandler);
    }
  }

  //function che fa interagire al usuario con il gioco
  function squareClickHandler() {
    const index = parseInt(this.innerHTML); //per modificare il contenuto del quadrato(square)
    const isBomb = bombs.indexOf(index) !== -1; //controllo di INDEX nel array(bombs)

    if (isBomb) { // -> = true
      this.classList.add("sq-red");
      this.innerHTML = `<i class="fas fa-bomb"></i>`;
      messaggio = `<i class="fa-solid fa-face-dizzy"></i>
      Hai perso!! Il tuo punteggio è: ${score}`; 

      if (firstBombIndex === 0) { // -> 
        firstBombIndex = index;
      } else { 
        revealBombs();
        removeSquareListeners(); //-> evita che il gioco vada avanti una volta trovata una bomba
        gameover = true;
      }

    } else {
      this.classList.add("sq-blue");
      this.innerHTML = `<i class="fa-solid fa-flag"></i>`;
      score++;
      messaggio = `Il tuo punteggio e: ${score}`;
      if (!gameover) {
        checkWin();
      }
    }
    sendMessage(messaggio);
  }


  let squareforRow = Math.sqrt(squareNumbers);
  const bombs = generateBombs(NUM_BOMBS, squareNumbers);

  for (let i = 1; i <= squareNumbers; i++) {
    const isBomb = bombs.indexOf(i) !== -1;
    const square = drawSquare(i, squareforRow);

    if (!gameover) {
      square.addEventListener("click", squareClickHandler);
    }
  
      playground.appendChild(square);
    }
  }