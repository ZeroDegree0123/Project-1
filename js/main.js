/*----- constants -----*/

// const BASE_LIT_TIME = 2000;
const LIT_TIME = 1000;
const GAP_TIME = 400;
// const LEVEL_JUMP = 2;
// const LEVEL_DEC_TIME = 500;

/*----- app's state (variables) -----*/

let playerSequence; // holds player moves
let computerSequence; // holds computer moves
let start; // true once start button is clicked when computer begins turn
let result; // false when player looses
let gameInPlay; // true when computer makes move


/*----- cached element references -----*/
const lightEls = Array.from(document.querySelectorAll('.main > div'));

const startButton = document.querySelector('.replay');





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
    start = true;
    gameOver = false;
    if (!start) return;
    computerSequence = [];
    playerSequence = [];
    standard();
    computerTurn();
});

document.getElementById('butt')
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
};


function gameStart() {
    gameInPlay = true;
    
    standard();
}

function render(cb) {
    gameInPlay = true;
    let idx = 0;
    const timerId = setInterval(function() {
      const btn = lightEls[computerSequence[idx]];
      btn.classList.add('light');
      setTimeout(function() {
        btn.classList.remove('light')
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
    start = false;
}

function sequenceComplete() {
    return JSON.stringify(playerSequence) === JSON.stringify(computerSequence);
    standard()
}


function checkSequence() {
    for (i = 0; i < playerSequence.length; i++) {
        playerSequence[i] === computerSequence[i] ? true : lose();
    }
};