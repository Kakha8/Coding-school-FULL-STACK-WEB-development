function enterNumber(number) {
    const display = document.getElementById('display');
    display.value += number;
}

function enterOperator(operator) {
    const display = document.getElementById('display');
    display.value += ' ' + operator + ' ';
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}