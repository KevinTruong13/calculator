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