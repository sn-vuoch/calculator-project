function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "ERROR";
  }
  return num1 / num2;
}

function operate(operator, num1, num2) {
  let result;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "×":
      result = multiply(num1, num2);
      break;
    case "÷":
      result = divide(num1, num2);
      break;
  }
  return result;
}

function addOperator(operator) {
  const lastChar = calculation.textContent.slice(-1);

  if (operationString.includes(lastChar)) {
    calculation.textContent = calculation.textContent.slice(0, -1) + operator;
  } else {
    calculation.textContent += operator;
  }
}

function deleteCharacter() {
  result.textContent = result.textContent.slice(0, -1);
  calculation.textContent = calculation.textContent.slice(0, -1);
}

function resetState() {
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;
}

let firstNumber;
let secondNumber;
let operator;
let answer;
let operationString = "+-×÷*/";
let numberString = "0123456789";
let isPeriodAvailable = false;
const digitNumber = document.querySelector(".left-container");
const digitOperator = document.querySelector(".right-container");
const displayBox = document.querySelector(".display-box");
const result = document.querySelector(".result");
const calculation = document.querySelector(".calculation");

// Event on 0-9 and .
digitNumber.addEventListener("click", function (e) {
  // ===== 0-9 =====
  // Check if clicked is button or not
  if (e.target.tagName === "BUTTON") {
    // Work when result calculated, then start a new number
    if (result.textContent === String(answer)) {
      result.textContent = "";
      calculation.textContent = "";
      resetState();
      answer = undefined;
      isPeriodAvailable = false;
    }

    // Work when pressing clear button
    if (e.target.textContent === "Clear") {
      result.textContent = "";
      calculation.textContent = "";
      resetState();
      isPeriodAvailable = false;
      return;
    }

    if (e.target.textContent !== ".") {
      result.textContent += e.target.textContent;
      calculation.textContent += e.target.textContent;
    } else if (
      e.target.textContent === "." &&
      !isPeriodAvailable &&
      result.textContent !== ""
    ) {
      result.textContent += e.target.textContent;
      calculation.textContent += e.target.textContent;
      isPeriodAvailable = true;
    } else {
      return;
    }
  }
});

// Event on operators
digitOperator.addEventListener("click", function (e) {
  const clickedOperator = e.target.textContent;
  // ===== OPERATOR =====
  // Check if clicked is button or not
  if (
    e.target.tagName === "BUTTON" &&
    clickedOperator !== "=" &&
    clickedOperator !== "Delete"
  ) {
    // If there is error message
    if (result.textContent === "ERROR") {
      result.textContent = "";
      calculation.textContent = "";
      resetState();
      isPeriodAvailable = false;
      return;
    }

    // Check if operator in calculation or not, if it in press other operators will not working until press equal
    if (
      calculation.textContent.includes(operator) &&
      firstNumber !== undefined &&
      result.textContent !== ""
    ) {
      return;
    }

    // Disable operators to get click before firstNumber isn't available yet
    if (
      operationString.includes(clickedOperator) &&
      result.textContent === "" &&
      firstNumber === undefined
    ) {
      return;
    }

    // Get first number only if user has entered a number
    if (result.textContent !== "") {
      firstNumber = Number(result.textContent);
      result.textContent = "";
    }

    addOperator(clickedOperator);

    operator = clickedOperator;

    isPeriodAvailable = false;

    // Work after once calculation, before 12+3+4 = 19 to 15+4 = 19. Use like this to avoid 12+3*2 = 30 (correct result is 18)
    if (
      calculation.textContent.includes(`${operator}`) &&
      calculation.textContent.includes("=")
    ) {
      calculation.textContent = firstNumber + operator;
    }
  }

  // ===== EQUAL =====
  if (e.target.textContent === "=") {
    // Check if second number is available or not
    if (secondNumber === undefined && firstNumber === undefined) {
      return;
    }

    // Check if the result found, so equal stop working
    if (calculation.textContent.includes("=")) {
      return;
    }

    // If operator is undefined, then ignore
    if (operator === undefined) {
      return;
    }

    secondNumber = Number(result.textContent);
    let secondNumberString = result.textContent;
    result.textContent = "";

    // Work when firstNumber is available but secondNumber isn't then press equal
    if (firstNumber !== undefined && secondNumberString === "") {
      return;
    }

    calculation.textContent += "=";

    answer = operate(operator, firstNumber, secondNumber);
    if (typeof answer === "string") {
      result.textContent = answer;
      return;
    }

    answer = parseFloat(answer.toFixed(6));
    result.textContent = answer;
    isPeriodAvailable = false;
    operator = undefined;
  }

  // ===== BACKSPACE =====
  if (e.target.textContent === "Delete") {
    if (result.textContent === String(answer)) {
      result.textContent = "";
      calculation.textContent = "";
      resetState();
      isPeriodAvailable = false;
      return;
    }

    if (result.textContent.slice(-1) === ".") {
      deleteCharacter();
      isPeriodAvailable = false;
      return;
    }

    if (operator !== undefined) {
      if (calculation.textContent.slice(-1) === operator) {
        deleteCharacter();
        operator = undefined;
        firstNumber = Number(calculation.textContent);
      } else {
        deleteCharacter();
      }
      return;
    }

    if (firstNumber === undefined) {
      deleteCharacter();
    }

    if (firstNumber !== undefined && calculation.textContent !== "") {
      deleteCharacter();
      firstNumber = Number(calculation.textContent);
    }
  }
});

// Keyboard events
document.addEventListener("keydown", function (e) {
  let keyClickedOperator = e.key;
  // ===== 0-9 and . =====
  // Check if key clicked is button or not
  if (
    numberString.includes(keyClickedOperator) ||
    keyClickedOperator === "." ||
    keyClickedOperator === "Escape"
  ) {
    // Work when result calculated, then start a new number
    if (result.textContent === String(answer)) {
      result.textContent = "";
      calculation.textContent = "";
      resetState();
      answer = undefined;
      isPeriodAvailable = false;
    }

    // Work when pressing clear button
    if (keyClickedOperator === "Escape") {
      result.textContent = "";
      calculation.textContent = "";
      resetState();
      isPeriodAvailable = false;
      return;
    }

    if (keyClickedOperator !== ".") {
      result.textContent += keyClickedOperator;
      calculation.textContent += keyClickedOperator;
    } else if (
      keyClickedOperator === "." &&
      !isPeriodAvailable &&
      result.textContent !== ""
    ) {
      result.textContent += keyClickedOperator;
      calculation.textContent += keyClickedOperator;
      isPeriodAvailable = true;
    } else {
      return;
    }
  }

  // ===== OPERATOR ====
  // Check if key clicked are +, -, *, and /
  if (
    operationString.includes(keyClickedOperator) &&
    (keyClickedOperator !== "=" || keyClickedOperator !== "Enter") &&
    keyClickedOperator !== "Delete"
  ) {
    switch (keyClickedOperator) {
      case "*":
        keyClickedOperator = "×";
        break;
      case "/":
        keyClickedOperator = "÷";
        break;
    }

    // If there is error message
    if (result.textContent === "ERROR") {
      result.textContent = "";
      calculation.textContent = "";
      resetState();
      isPeriodAvailable = false;
      return;
    }

    // Check if operator in calculation or not, if it in press other operators will not working until press equal
    if (
      calculation.textContent.includes(operator) &&
      firstNumber !== undefined &&
      result.textContent !== ""
    ) {
      return;
    }

    // Disable operators to get click before firstNumber isn't available yet
    if (
      operationString.includes(keyClickedOperator) &&
      result.textContent === "" &&
      firstNumber === undefined
    ) {
      return;
    }

    // Get first number only if user has entered a number
    if (result.textContent !== "") {
      firstNumber = Number(result.textContent);
      result.textContent = "";
    }

    addOperator(keyClickedOperator);

    operator = keyClickedOperator;

    isPeriodAvailable = false;

    // Work after once calculation, before 12+3+4 = 19 to 15+4 = 19. Use like this to avoid 12+3*2 = 30 (correct result is 18)
    if (
      calculation.textContent.includes(`${operator}`) &&
      calculation.textContent.includes("=")
    ) {
      calculation.textContent = firstNumber + operator;
    }
  }

  // ===== EQUAL ====
  if (keyClickedOperator === "=" || keyClickedOperator === "Enter") {
    // Check if second number is available or not
    if (secondNumber === undefined && firstNumber === undefined) {
      return;
    }

    // Check if the result found, so equal stop working
    if (calculation.textContent.includes("=")) {
      return;
    }

    // If operator is undefined, then ignore
    if (operator === undefined) {
      return;
    }

    secondNumber = Number(result.textContent);
    let secondNumberString = result.textContent;
    result.textContent = "";

    // Work when firstNumber is available but secondNumber isn't then press equal
    if (firstNumber !== undefined && secondNumberString === "") {
      return;
    }

    calculation.textContent += "=";

    answer = operate(operator, firstNumber, secondNumber);
    if (typeof answer === "string") {
      result.textContent = answer;
      return;
    }

    answer = parseFloat(answer.toFixed(6));
    result.textContent = answer;
    isPeriodAvailable = false;
    operator = undefined;
  }

  // ===== BACKSPACE =====
  if (keyClickedOperator === "Backspace") {
    if (result.textContent === String(answer)) {
      result.textContent = "";
      calculation.textContent = "";
      resetState();
      isPeriodAvailable = false;
      return;
    }

    if (result.textContent.slice(-1) === ".") {
      deleteCharacter();
      isPeriodAvailable = false;
      return;
    }

    if (operator !== undefined) {
      if (calculation.textContent.slice(-1) === operator) {
        deleteCharacter();
        operator = undefined;
        firstNumber = Number(calculation.textContent);
      } else {
        deleteCharacter();
      }
      return;
    }

    if (firstNumber === undefined) {
      deleteCharacter();
    }

    if (firstNumber !== undefined && calculation.textContent !== "") {
      deleteCharacter();
      firstNumber = Number(calculation.textContent);
      console.log(firstNumber);
    }
  }
});
