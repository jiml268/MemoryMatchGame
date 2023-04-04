import Notiflix from 'notiflix';
const grid = document.querySelector('.grid'); // HTML element for the game grid
let cards = []; // array to store the card objects
let flippedCards = []; // array to store the currently flipped cards
let score = 0; // variable to store the player's score
let canFlip = true; // boolean to prevent multiple card flips at once
const scoreEl = document.querySelector('#score'); // HTML element for the score section
const buttonEl = document.querySelector('#startGame'); // HTML element for the score section
const smallEl = document.querySelector('#small');
const mediumEl = document.querySelector('#medium');
const largeEl = document.querySelector('#large');
const exlargeEl = document.querySelector('#ex-large');
const emojiEl = document.querySelector('#emoji');
const deckEl = document.querySelector('#deck');
buttonEl.addEventListener('click', newGames)
let fstclick = ''
let sndclick = ''
let boardSize = 16;
let totalTurns = 0
let matchfound = 0
let srartTime
let endTime
let min
let sec
let deckType = 'emoji'


const values = ['🍕', '🍔', '🍟', '🌭', '🥪', '🍩', '🍰', '🍫', '🍦', '🥧', '🍮', '🍭']; // Starting values for the icons of the game
//grid.addEventListener('click', flipCards )
createDeck()
let cardtype = "startup"
generateCards(cardtype)

function createDeck(){
  cards= []
  if (smallEl.checked) {
    boardSize = 12
  } else if (mediumEl.checked){
    boardSize = 16
  } else if (largeEl.checked){
    boardSize = 20
  } else {
    boardSize = 24
  }
if (emojiEl.checked) {
  deckType = 'emoji'
}
else if (deckEl.checked) {
    deckType = "deckOfCard"
  }
  if (deckType === 'emoji'){
  let i = 0
  while (i < boardSize / 2){
        cards.push(values[i])
        cards.push(values[i])
i++
  }
} else {
  while (cards.length < boardSize){
let playcard =""
const card = Math.floor(Math.random()*13)+1
const suit = Math.floor(Math.random()*4)
switch (card) {
  case 1:
  playcard = "A";
  break;
  case 10:
  playcard = "T";
  case 11:
  playcard = "J";
  break;
  case 12:
  playcard = "Q";
  break;
  case 13:
  playcard = "K";
  break;
  default:
  playcard = card; 
}
switch (suit) {
  case 0:
  playcard += "H";
  break;
  case 1:
  playcard += "D";
  break;
  case 2:
  playcard += "C";
  break;
  case 3:
  playcard += "S";
}
if (cards.includes(playcard) === false){
    cards.push(playcard)
    cards.push(playcard)
}
}
    
}
}


function newGames(){
  totalTurns = 0
  score = 0
  scoreEl.innerHTML = `Score:  ${score}`
  totalTurns = 0
matchfound = 0
const currentDate = new Date()
srartTime = currentDate.getTime()
  cardtype = "startgame"
  grid.innerHTML = ''
  createDeck()
  shuffleDeck(cards)
  console.log(cards)
  generateCards(cardtype)
}


function shuffleDeck(deck){
 for (let shuffle = 1; shuffle <= 10; shuffle++ ){   
    for (let i = 0; i < boardSize; i++){
const holdcard = deck[i]
const swapPlace = Math.floor(Math.random()*boardSize)
deck[i] = deck[swapPlace]
deck[swapPlace] = holdcard
    }
    }
  
}


function generateCards(cardtype) {
  const spaceRemain = window.innerHeight - buttonEl.offsetTop
  console.log(spaceRemain)
  const cardHeight = (spaceRemain / boardSize * 4) - 25
const cardwidth = "100%"
  let i = 0;
    while (i < boardSize) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-name", cards[i]);
      cardElement.style.height = `${cardHeight}px`
      //cardElement.style.maxHeight = `150px`
      cardElement.style.width = `${cardwidth}px`
      //cardElement.style.maxWidth = `112px`
      //cardElement.setAttribute("data-name", card.name);
      if (deckType === 'emoji'){
      cardElement.innerHTML = `
        <div class="front" >
          <h2 class = "emjiSize">${cards[i]}</h2>
        </div>
        <div class="back"></div>
      `;
     
      } else {
        cardElement.innerHTML = `
        <div class="front">
        <img src = "./images/${cards[i]}.svg" style="width:100%; max-width: 291px;height:100%; max-height: 170px;">
        
        </div>
        <div class="back">
        <img src = "./images/2B.svg" style="width:100%; max-width: 291px;height:100%; max-height: 170px;">
        </div>
      `;
      }

      grid.appendChild(cardElement);
      if (cardtype !== 'startup'){
      cardElement.addEventListener("click", flipCard);
      } else {
      cardElement.classList.toggle("flipped")
      }

      i++
    }
  }


  function flipCard() {
    this.classList.toggle("flipped");
if (fstclick ===''){
  this.classList.toggle("nopointer")
  fstclick = this
} else { 
  sndclick = this
  this.classList.toggle("nopointer")

}
    const imagePick =this.dataset.name;
    flippedCards.push(imagePick)
    if (flippedCards.length === 2){
      grid.classList.toggle("nopointer")
      setTimeout(() =>{
        checkmatch()
      },1000)
    }

  }

  function checkmatch(){
    totalTurns ++
    if (flippedCards[0] === flippedCards[1]){
        fstclick.removeEventListener("click", flipCard);
        sndclick.removeEventListener("click", flipCard);
        score += 2;
        matchfound ++
        if (matchfound === boardSize / 2){
          const currentDate = new Date()
          endTime = currentDate.getTime()
          const totalTime =(endTime-srartTime)/1000 
          min = Math.floor(totalTime/60)
          sec = Math.round((totalTime) - (min * 60))
          Notiflix.Notify.info(`the game took you ${min} minutes and ${sec} seconds
          you made ${totalTurns} attemps
          your final score is ${score}`);
          //alert(`the game took you ${min} minutes and ${sec} seconds
          //you made ${totalTurns} attemps
          //your final score is ${score}`)
        }
    } else {
      
      fstclick.classList.toggle("flipped");
      fstclick.classList.toggle("nopointer")
      sndclick.classList.toggle("flipped");
      sndclick.classList.toggle("nopointer")

      score --;
    }
    grid.classList.toggle("nopointer")

    scoreEl.innerHTML = `Score:  ${score}`
    flippedCards=[]
    fstclick = '';
    sndclick = '';
}
