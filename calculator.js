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
    
}

function Calculation() {
    this._displayValue,
    this.getDisplayValue = () => _displayValue,
    this.setDisplayValue = (displayValue) => {
        _displayValue = displayValue;
        setDisplay(_displayValue);
    }
    this._prevValue,
    this.getPrevValue = () => _prevValue,
    this.setPrevValue = (prevValue) => _prevValue = prevValue,
    this._operation,
    this.getOperation = () => _operation,
    this.setOperation = (operation) => _operation = operation
}

const calculation = new Calculation();

for (i = 0; i < 10; i++) {
    numberButton = document.querySelector(`#${i}`)
    numberButton.addEventListener('click', numberButtonHandler);
}