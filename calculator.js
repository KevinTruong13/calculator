// Mitigates impreciseness of floating-point arithmetic to the 10th decimal place
function strip(number) {
    return parseFloat(number.toFixed(10));
}

function add(addend1, addend2) {
    return strip(addend1 + addend2);
}

function subtract(base, minuend) {
    return strip(base - minuend);
}

function multiply(multiplicand1, multiplicand2) {
    return strip(multiplicand1 * multiplicand2);
}

function divide(dividend, divisor) {
    return strip(dividend / divisor);
}

function exponentiate(base, power) {
    return strip(Math.pow(base, power));
}

function operate(operation, num1, num2) {
    const result = operation(num1, num2);
    if (!result) {
        return 'ERROR';
    }
    return result;
}

function setDisplay(displayValue) {
    document.querySelector('.display').textContent = displayValue;
}

function numberButtonHandler() {
    if (calculation.getOperation() != null && calculation.getPrevValue != null) {
        calculation.setPrevValue(calculation.getDisplayValue());
        calculation.setDisplayValue();
    }
    const numButton = this.id.charAt(CHARACTER_INDEX_OF_NUMBER_IN_NUMERAL_BUTTON_ID);   // String number
    const currDisplayValue = calculation.getDisplayValue();
    const numResult = (currDisplayValue === null) ? numButton : currDisplayValue + numButton;
    calculation.setDisplayValue(numResult);
}

function Calculation(start = null) {
    this._displayValue = start,
    this.getDisplayValue = () => this._displayValue,
    this.setDisplayValue = (displayValue = start) => {
        this._displayValue = displayValue;
        setDisplay(this._displayValue);
    }
    this._prevValue = start,
    this.getPrevValue = () => this._prevValue,
    this.setPrevValue = (prevValue = start) => this._prevValue = prevValue,
    this._operation = start,
    this.getOperation = () => this._operation,
    this.setOperation = (operation = start) => this._operation = operation
    this.clearCalculator = () => {
        this.setDisplayValue();
        this.setPrevValue();
        this.setOperation();
    };
}

const FIRST_NUMBER = 1;
const LAST_NUMBER = 9;
const CHARACTER_INDEX_OF_NUMBER_IN_NUMERAL_BUTTON_ID = 3
const calculation = new Calculation();

for (i = FIRST_NUMBER; i <= LAST_NUMBER; i++) {
    numberButton = document.querySelector(`#num${i}`)
    numberButton.addEventListener('click', numberButtonHandler);
}
document.querySelector('#clear').addEventListener('click', calculation.clearCalculator)