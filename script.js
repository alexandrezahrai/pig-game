'use strict';

// PIG GAME
/*
When user rolls dice:
    1. generate random dice roll
    2. display dice roll
    3. is it a 1? 
        - yes: switch player
        - no: add dice roll to current score
    4. display new score

When user holds score:
    1. add current score to total score
    2. score >= 100?
        yes: current player wins!
        no: switch player

When user resets game:
    1. set all scores to 0
    2. set player 1 as starting player
*/

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  // Set all scores to 0
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // Sets player 0 (player1 in game) as starting player
  player1El.classList.remove('player--active');
};

// Calling the init func
init();

// Declaring func for switching players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // active player's current score reset to 0 before switching to other player!
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Dice roll sound effect
const playSound = function () {
  let sound = document.getElementById('diceRoll');
  sound.currentTime = 0;
  sound.play();
};

// Declare victory sound effect
const victory = function () {
  let audio = document.getElementById('win');
  audio.currentTime = 0;
  audio.play();
};

// When user rolls dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for a rolled 1
    if (dice !== 1) {
      // Add dice value to current score
      currentScore += dice;
      // Displays new score
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold sound effect
btnHold.addEventListener('click', function () {
  let sound = document.getElementById('hold');
  sound.currentTime = 0;
  sound.play();
});

// When user holds score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's global (total) score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if current player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Yes? Finish the game
      playing = false;
      victory();
      diceEl.classList.add('hidden'); // hides the dice
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // No? Switch to the next player
      switchPlayer();
    }
  }
});

// New game sound effect
btnNew.addEventListener('click', function () {
  let sound = document.getElementById('new');
  sound.currentTime = 0;
  sound.play();
});

// When user resets game
btnNew.addEventListener('click', init);
