/*----- constants -----*/
// const lightChoices = [
//     {color: 'blue', opacity: 1, time: 1000},
//     {color: 'red', opacity: 1, time: 1000},
//     {color: 'yellow', opacity: 1, time: 1000},
//     {color: 'green', opacity: 1, time: 1000},
//     {color: 'purple', opacity: 1, time: 1000},
//     {color: 'orange', opacity: 1, time: 1000},
//     {color: 'cyan', opacity: 1, time: 1000},
//     {color: 'dark green', opacity: 1, time: 1000}
// ]
const BASE_LIT_TIME = 2000;
let LIT_TIME;
let GAP_TIME = 400;
const LEVEL_JUMP = 2;
const LEVEL_DEC_TIME = 500;

/*----- app's state (variables) -----*/

let playerSequence; // holds player moves
let computerSequence; // holds computer moves
let start; // true once start button is clicked when computer begins turn
let result; // false when player looses
let gameInPlay; // true when computer makes move


// let gameSquence; 
// let playerMove;
// let computerMove;

/*----- cached element references -----*/
const lightEls = Array.from(document.querySelectorAll('section > div'));
// const lightEls = document.querySelectorAll('section > button');
let startButton = document.querySelector('.replay');





const lightUp = function() {
    lightEls[0].classList.add('light')
    lightEls[1].classList.add('light')
    lightEls[2].classList.add('light')
    lightEls[3].classList.add('light')
}

const standard = function() {
    lightEls[0].classList.remove('light')
    lightEls[1].classList.remove('light')
    lightEls[2].classList.remove('light')
    lightEls[3].classList.remove('light')
}


/*----- event listeners -----*/

startButton.addEventListener('click', function(evt) {
    if (startButton.checked === true) {
        gameStart();
    } else {
        init();
    }
    gameOver = false;
    if (!start) return;
    computerSequence = [];
    playerSequence = [];
    standard();
    computerTurn();
});

document.querySelector('.main')
    .addEventListener('click', function(evt) {
        if (!start || gameInPlay) return;
        const button = evt.target;
        const buttonIndex = lightEls.indexOf(button);
        if (buttonIndex === -1) return;
        playerSequence.push(buttonIndex);
        lightEls[buttonIndex].classList.add('light');
        setTimeout(function() {
            if (!result) lightEls[buttonIndex].classList.remove('light');
        }, 200);
        if (sequenceComplete()) {
            computerTurn();
        }else {
            checkSequence();
        }
    })

/*----- functions -----*/
 
init();

function init() {
    playerSequence =  [];
    computerSequence =  [];
    start =  false;
    result =  false;
    gameInPlay =  false;

    // playerMove = [];
    // computerMove = [];
    // gameSequence = [0, 1, 2, 3];
};


function gameStart() {
    gameInPlay = true;
    startButton.checked = true;
    gameInplay = true;

    standard()
}

function render(cb) {
    gameInPlay = true;
    let idx = 0;
    const timerId = setInterval(function() {
      const btn = lightEls[computerSequence[idx]];
      btn.classList.add('light');
      setTimeout(function() {
        btn.classList.remove('light');
      }, LIT_TIME);
      idx++;
      if (idx === computerSequence.length) {
        clearInterval(timerId);
        gameInPlay = false;
        // setTimeout(cb, LIT_TIME);
      }
    }, LIT_TIME + GAP_TIME);
  }

function lose() {
    lightUp();
    result = true;


}

function computerTurn() {
    gameInPlay = true
    playerSequence = [];
    computerSequence.push(Math.floor(Math.random() * 4));

    render();
}

function playerTurn() {
    gameInPlay = false;
    playerSequence = [];
    start = true;
}

function sequenceComplete() {
    return JSON.stringify(playerSequence) === JSON.stringify(computerSequence);
    standard();
}


function checkSequence() {
    for (i = 0; i < playerSequence.length; i++) {
        playerSequence[i] === computerSequence[i] ? true : lose();
    }
};