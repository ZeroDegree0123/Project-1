/*----- constants -----*/
const lightChoices = [
    {color: 'blue', opacity: 1, time: 1000},
    {color: 'red', opacity: 1, time: 1000},
    {color: 'yellow', opacity: 1, time: 1000},
    {color: 'green', opacity: 1, time: 1000},
    {color: 'purple', opacity: 1, time: 1000},
    {color: 'orange', opacity: 1, time: 1000},
    {color: 'cyan', opacity: 1, time: 1000},
    {color: 'dark green', opacity: 1, time: 1000}
]


/*----- app's state (variables) -----*/

let lights;
let turn;
let result;
let goal;



/*----- cached element references -----*/
const lightEls = document.querySelectorAll('section > button');



/*----- event listeners -----*/
document.querySelector('button')
    .addEventListener('click', handleClick);



/*----- functions -----*/

init();

function init() {
    lights = 0;
    turn = 1;
    result = 0;
    goal = '';
    render();
};

function render() {
    lightEls.forEach(function(color) {
        color.style.opacity = .5;
        lightEls[lights].style.opacity = lightChoices[lights].opacity;
        
    })

}

function handleClick(evt) {
    if (evt.target.tagName !== 'BUTTON') return;

}




