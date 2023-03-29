const grid = document.querySelector('.grid'); // HTML element for the game grid
const cards = []; // array to store the card objects
let flippedCards = []; // array to store the currently flipped cards
let score = 0; // variable to store the player's score
let canFlip = true; // boolean to prevent multiple card flips at once
const scoreEl = document.querySelector('#score'); // HTML element for the score section
const buttonEl = document.querySelector('#startGame'); // HTML element for the score section
buttonEl.addEventListener('click', newGames)
let fstclick = ''
let sndclick = ''
const values = ['🍕', '🍔', '🍟', '🌭', '🥪', '🍩', '🍰', '🍫']; // Starting values for the icons of the game
//grid.addEventListener('click', flipCards )
createDeck()

function createDeck(){
    values.map(symbol =>{
        cards.push(symbol)
        cards.push(symbol)

    })
    console.log(cards)
    let cardtype = "startup"
    generateCards(cardtype)
}


function newGames(){
  cardtype = "startgame"
  grid.innerHTML = ''
  shuffleDeck(cards)
  generateCards(cardtype)
}


function shuffleDeck(deck){
 for (let shuffle = 1; shuffle <= 10; shuffle++ ){   
    for (let i = 0; i < deck.length; i++){
const holdcard = deck[i]
const swapPlace = Math.floor(Math.random()*16)
deck[i] = deck[swapPlace]
deck[swapPlace] = holdcard
    }
    }
    console.log(deck)
}


function generateCards(cardtype) {
    for (let card of cards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
     
      //cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="front">
          <h2 class = "emjiSize">${card}</h2>
        </div>
        <div class="back"></div>
      `;
      grid.appendChild(cardElement);
      if (cardtype !== 'startup'){
      cardElement.addEventListener("click", flipCard);
      } else {
      cardElement.classList.toggle("flipped")
      }
    }
  }


  function flipCard() {
    this.classList.toggle("flipped");
if (fstclick ===''){
  fstclick = this
} else { 
  sndclick = this
}
    const imagePick =this.innerText
    flippedCards.push(imagePick)
    if (flippedCards.length === 2){
      setTimeout(() =>{
        checkmatch()
      },1000)
    }

  }

  function checkmatch(){
    if (flippedCards[0] === flippedCards[1]){
        console.log('match found')
        fstclick.removeEventListener("click", flipCard);
        sndclick.removeEventListener("click", flipCard);
        score =+ 2;
    } else {
      
      fstclick.classList.toggle("flipped");
      sndclick.classList.toggle("flipped");
      score --;
    }
    scoreEl.innerHTML = score
    flippedCards=[]
    fstclick = '';
    sndclick = '';
  }