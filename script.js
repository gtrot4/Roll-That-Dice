"use strict";
//Selecting elements
const player1EL = document.querySelector(`.player--0`);
const player0EL = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`); //this one is not quite as good as querySelector
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const btnNew = document.querySelector(`.btn--new`);
const btnHold = document.querySelector(`.btn--hold`);
const btnRoll = document.querySelector(`.btn--roll`);
const diceEl = document.querySelector(`.dice`); //The picture part
let scores, currentScore, activePlayer, playing;
//making them available to any function throughout the code

//Starting Conditions
//NEW GAME FUNCTION
const newGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add(`hidden`);
  player1EL.classList.remove(`player--winner`);
  player0EL.classList.remove(`player--winner`);
  player1EL.classList.remove(`player--active`);
  player0EL.classList.add(`player--active`); //because player 0 starts
};
newGame(); //gotta call it because otherwise game goes back to HTML numbers

//switch player functionality
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle(`player--active`);
  player1EL.classList.toggle(`player--active`); //NEED TO REWATCH THIS to see how toggle functionality works
};

// Rolling Dice Functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; //The number
    console.log(dice);
    // 2. Display the dice that was rolled
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`; //REMEMBER THIS SHIT
    // 3. Check for roll of 1: if true, switch to next player.
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice; // better than currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore; //CHANGE LATER AS THERE IS MORE THAN 1 PLAYER
    } else {
      //Switch to next player
      switchPlayer();
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0; //active player is 0 if not then its 1 or else its 0.
      // player0EL.classList.toggle(`player--active`);
      // player1EL.classList.toggle(`player--active`); //toggling both at the same time ensures its only on one at the same time.
    }
  }
});

// Hold Button Functionality

btnHold.addEventListener(`click`, function () {
  if (playing) {
    console.log(scores[activePlayer]);
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // Same as above scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if players score is >= 100
    //Game won by player
    //Switch to next player if not 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
    } else {
      switchPlayer();
    }
  }
});

//New Game Functionality

btnNew.addEventListener(`click`, function () {
  newGame();
});
