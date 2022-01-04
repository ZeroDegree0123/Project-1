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


/*----- app's state (variables) -----*/

let playerSequence; // holds player moves
let computerSequence; // holds computer moves
let play; // true if pc turn
let result; // false when player loose
let gameInPlay; // true when game begins



/*----- cached element references -----*/
const lightEls = Array.from(document.querySelectorAll('section > button'));

const startButton = document.querySelector('.replay')



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
document.querySelector('button')
    .addEventListener('click', handleClick);



/*----- functions -----*/

init();

function init() {
    playerSequence =  0;
    computerSequence =  0;
    play =  true;
    result =  false;
    gameInPlay =  false;
};



function handleClick(evt) {
    if (evt.target.tagName !== 'BUTTON') return;
    startButton = evt.target.textContent.toLowerCase();

    gameStart();
}


function gameStart() {
    gameInPlay = true;
    play = true;

    render()
}

function render(cb) {
    isPlaying = true;
    let idx = 0;
    const timerId = setInterval(function() {
      const btn = buttons[idx];
      btn.style.opacity = 1;
      setTimeout(function() {
        btn.style.opacity = 0.5;
      }, LIT_TIME);
      idx++;
      if (idx === sequence.length) {
        clearInterval(timerId);
        isPlaying = false;
        setTimeout(cb, LIT_TIME);
      }
    }, LIT_TIME + GAP_TIME);
  }
