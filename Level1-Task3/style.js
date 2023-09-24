function calculatePercentage() {
    let display = document.getElementById('display');
    let currentValue = parseFloat(display.value);
    let percentageValue = currentValue / 100;
    display.value = percentageValue;
}
