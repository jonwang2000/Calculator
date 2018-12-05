var oneBtn = document.getElementById('calcOne');
var twoBtn = document.getElementById('calcTwo');
var threeBtn = document.getElementById('calcThree');
var fourBtn = document.getElementById('calcFour');
var fiveBtn = document.getElementById('calcFive');
var sixBtn = document.getElementById('calcSix');
var sevenBtn = document.getElementById('calcSeven');
var eightBtn = document.getElementById('calcEight');
var nineBtn = document.getElementById('calcNine');
var zeroBtn = document.getElementById('calcZero');

var decimalBtn = document.getElementById('calcDecimal');
var clearBtn = document.getElementById('calcClear');
var backspaceBtn = document.getElementById('calcBackspace');
var display = document.getElementById('calcDisplay');
var percentBtn = document.getElementById('calcPercent');

var displayVal = '0';
var pendingVal;
var evalStringArray = [];


var calcNumBtns = document.getElementsByClassName('calcNumBtn');
var calcOperatorBtns = document.getElementsByClassName('calcOperBtn');

var updateDisplay = (clickObj) => {
    var btnText = clickObj.target.innerText;

    if (displayVal === '0')
        displayVal = '';

    if (displayVal === 'NaN')
        displayVal = '';

    if (displayVal === 'Infinity')
        displayVal = '';

    displayVal += btnText;

    if (displayVal.length > 8) {
        displayVal = displayVal.slice(0, 7);
        displayVal += '..';
    }

    display.innerText = displayVal;
}

var performOperation = (clickObj) => {
    var operator = clickObj.target.innerText;

    switch (operator) {
        case '+':
            pendingVal = displayVal;
            displayVal = '0';
            display.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('+')
            break;

        case '-':
            pendingVal = displayVal;
            displayVal = '0';
            display.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('-')
            break;

        case 'x':
            pendingVal = displayVal;
            displayVal = '0';
            display.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('*')
            break;

        case '÷':
            pendingVal = displayVal;
            displayVal = '0';
            display.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('/')
            break;

        case '=':
            evalStringArray.push(displayVal);
            var evaluation = eval(evalStringArray.join(' '));
            displayVal = evaluation + '';
            if (displayVal.length > 7) {
                displayVal = displayVal.slice(0, 7);
                displayVal += '..';
            }
            display.innerText = displayVal;
            evalStringArray = [];

            break;

        default:
            break;
    }
}

// MAJOR ISSUE:
// Currently if the result has just been done with = and AC was not hit,
// user can keep adding onto the result.
// It should actually just act like result is empty but it doesn't


for (let i = 0; i < calcNumBtns.length; i++) {
    calcNumBtns[i].addEventListener('click', updateDisplay, false)
}

for (let i = 0; i < calcOperatorBtns.length; i++) {
    calcOperatorBtns[i].addEventListener('click', performOperation, false)
}


clearBtn.onclick = () => {
    displayVal = '0';
    pendingVal = undefined;
    evalStringArray = [];
    display.innerText = displayVal;
}

percentBtn.onclick = () => {
    displayVal = eval(displayVal + " / 100");
    pendingVal = displayVal;
    display.innerText = displayVal;
}

backspaceBtn.onclick = () => {
    let lengthofDisplayVal = displayVal.length;
    displayVal = displayVal.slice(0, lengthofDisplayVal - 1);

    if (displayVal === '')
        displayVal = '0';

    display.innerText = displayVal;
}

decimalBtn.onclick = () => {
    if (!displayVal.includes('.'))
        displayVal += '.';
    display.innerText = displayVal;
}