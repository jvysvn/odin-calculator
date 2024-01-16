let currentNum = '';
let previousNum = '';
let operator = '';

const currentDisplayNumber = document.querySelector('.current-number');
const previousDisplayNumber = document.querySelector('.previous-number');

window.addEventListener('keydown', handleKeyPress);

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
  if (currentNum != '' && previousNum != '') {
    compute();
  }
});

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', addDecimal);

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearCalculator);

const operators = document.querySelectorAll('.operator');

const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
  if (previousNum !== '' && currentNum !== '' && operator === '') {
    previousNum = '';
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length <= 11) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
}

operators.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum === '') {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === '') {
    operatorCheck(op);
  } else {
    compute();
    operator = op;
    currentDisplayNumber.textContent = '0';
    previousDisplayNumber.textContent = previousNum + ' ' + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = previousNum + ' ' + operator;
  currentDisplayNumber.textContent = '0';
  currentNum = '';
}

function compute() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);
  if (operator === '+') {
    previousNum += currentNum;
  } else if (operator === '-') {
    previousNum -= currentNum;
  } else if (operator === 'x') {
    previousNum *= currentNum;
  } else if (operator === '/') {
    if (currentNum <= 0) {
      previousNum = 'Error';
      previousDisplayNumber.textContent = '';
      currentDisplayNumber.textContent = previousNum;
      operator = '';
      return;
    }
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResult();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResult() {
  previousDisplayNumber.textContent = '';
  operator = '';
  if (previousNum.length <= 11) {
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0, 11) + '...';
  }
}

function clearCalculator() {
  currentNum = '';
  previousNum = '';
  operator = '';
  currentDisplayNumber.textContent = '0';
  previousDisplayNumber.textContent = '';
}

function addDecimal() {
  if (!currentNum.includes('.')) {
    currentNum += '.';
    currentDisplayNumber.textContent = currentNum;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === 'Enter' ||
    (e.key === '=' && currentNum != '' && previousNum != '')
  ) {
    compute();
  }
  if (e.key === '+' || e.key === '-' || e.key === '/') {
    handleOperator(e.key);
  }
  if (e.key === '*') {
    handleOperator('x');
  }
  if (e.key === '.') {
    addDecimal();
  }
  if (e.key === 'Backspace') {
    handleDelete();
  }
}

function handleDelete() {
  if (current != '') {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
    if (currentNum === '') {
      currentDisplayNumber.textContent = '0';
    }
  }
  if (currentNum === '' && previousNum !== '' && operator === '') {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}
