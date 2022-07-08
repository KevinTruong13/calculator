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
    const result = operation(+num1, +num2);
    if (!result) {
        return 'ERROR';
    }
    return result;
}

function setDisplay(displayValue) {
    document.querySelector('.display').textContent = displayValue;
}

function numberButtonHandler() {
    ifStoreDisplay();
    const numButton = this.id.charAt(CHARACTER_INDEX_OF_NUMBER_IN_NUMERAL_BUTTON_ID);   // String number
    calculation.appendDisplayValue(numButton);
    ifOperationAvailability();
}

function changeSignButtonHandler() {
    ifStoreDisplay();
    const displayValue = calculation.getDisplayValue();
    if (displayValue === null) {
        calculation.appendDisplayValue('-');
    } else if (displayValue.includes('-')) {
        calculation.setDisplayValue(displayValue.slice(1));
    } else {
        calculation.setDisplayValue('-' + displayValue);
    }
    ifOperationAvailability();
}

function backspaceButtonHandler() {
    const displayValue = calculation.getDisplayValue();
    if (displayValue.length === 1) {    // Sets display value to null
        calculation.setDisplayValue();
    } else {
        calculation.setDisplayValue(displayValue.slice(0, -1));
    }
}

function periodButtonHandler() {
    ifStoreDisplay();
    const displayValue = calculation.getDisplayValue();
    if (displayValue === null || !displayValue.includes('.')) {
        calculation.appendDisplayValue('.');
    }
    ifOperationAvailability();
}

function ifStoreDisplay() {
    if (calculation.getPrevValue() === null && calculation.getOperation() != null) {
        calculation.storeDisplay();
    }
}

function operationButtonEventHandler() {
    const displayValue = calculation.getDisplayValue(),
        prevValue = calculation.getPrevValue();
    if (displayValue != null) {
        if (prevValue != null) {
            calculation.operate();
        }
        calculation.setOperation(window[this.id]);
        setOperationAvailability(this);
    }
}

function equalsButtonEventHandler() {
    if (calculation.getDisplayValue() != null && calculation.getPrevValue() != null) {
        calculation.operate();
    } 
}

function setOperationAvailability(unavailableOperation) {
    OPERATION_BUTTONS.forEach(button => button.classList.remove('unavailable'));
    if (unavailableOperation != undefined) {
        unavailableOperation.classList.add('unavailable');
    }
}

function ifOperationAvailability() {
    if (calculation.getPrevValue() != null && calculation.getDisplayValue().length === 1) {
        setOperationAvailability();
    }
}

// Numbers stored as strings. Value of an empty field is assumed to always be null.
function Calculation(start = null) {
    this._displayValue = start,
    this.getDisplayValue = () => this._displayValue,
    this.setDisplayValue = (displayValue = start) => {
        this._displayValue = (displayValue === null) ? displayValue : displayValue.toString();
        setDisplay(this._displayValue);
    }
    this._prevValue = start,
    this.getPrevValue = () => this._prevValue,
    this.setPrevValue = (prevValue = start) => this._prevValue = (prevValue === null) ? prevValue : prevValue.toString(),
    this._operation = start,
    this.getOperation = () => this._operation,
    this.setOperation = (operation = start) => this._operation = operation,
    this.appendDisplayValue = (num) => {
        const numResult = (this.getDisplayValue() === null) ? num : this.getDisplayValue() + num;
        this.setDisplayValue(numResult);
    }
    this.clearCalculator = () => {
        this.setDisplayValue();
        this.setPrevValue();
        this.setOperation();
        setOperationAvailability();
    };
    this.operate = () => {
        this.setDisplayValue(operate(this.getOperation(), this.getPrevValue(), this.getDisplayValue()));
        this.setPrevValue();
        this.setOperation();
    }
    this.storeDisplay = () => {
        calculation.setPrevValue(calculation.getDisplayValue());
        calculation.setDisplayValue();
    }
}

const FIRST_NUMBER = 0;
const LAST_NUMBER = 9;
const CHARACTER_INDEX_OF_NUMBER_IN_NUMERAL_BUTTON_ID = 3
const NUMBER_OF_OPERATIONS = 5;
const OPERATION_BUTTONS = document.querySelectorAll('#add, #subtract, #divide, #multiply, #exponentiate');
const calculation = new Calculation();

for (i = FIRST_NUMBER; i <= LAST_NUMBER; i++) {
    numberButton = document.querySelector(`#num${i}`)
    numberButton.addEventListener('click', numberButtonHandler);
}
document.querySelector('#clear').addEventListener('click', calculation.clearCalculator);
document.querySelector('#backspace').addEventListener('click', backspaceButtonHandler);
document.querySelector('#change-sign').addEventListener('click', changeSignButtonHandler);
document.querySelector('#period').addEventListener('click', periodButtonHandler);
OPERATION_BUTTONS.forEach(operationButton => operationButton.addEventListener('click', operationButtonEventHandler));
document.querySelector('#equals').addEventListener('click', equalsButtonEventHandler);