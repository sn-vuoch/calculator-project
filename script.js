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

let firstNumber;
let secondNumber;
let operator;
let answer;
let operationString = "+-×÷";
const digitNumber = document.querySelector(".left-container");
const digitOperator = document.querySelector(".right-container");
const displayBox = document.querySelector(".display-box");
const result = document.querySelector(".result");
const calculation = document.querySelector(".calculation");

// Event on 0-9 and .
digitNumber.addEventListener("click", function (e) {
  // Check if clicked is button or not
  if (e.target.tagName === "BUTTON") {
    // Work when result calculated, then start a new number
    if (result.textContent === String(answer)) {
      result.textContent = "";
      calculation.textContent = "";
    }

    // Work when pressing clear button
    if (e.target.textContent === "Clear") {
      result.textContent = "";
      calculation.textContent = "";
      firstNumber = null;
      secondNumber = null;
      operator = null;
      return;
    }

    result.textContent += e.target.textContent;
    calculation.textContent += e.target.textContent;
  }
});

// Event on operators
digitOperator.addEventListener("click", function (e) {
  // Check if clicked is button or not
  if (e.target.tagName === "BUTTON" && e.target.textContent !== "=") {
    if (result.textContent === "ERROR") {
      result.textContent = "";
      calculation.textContent = "";
      firstNumber = null;
      secondNumber = null;
      operator = null;
      return;
    }

    let tempInput = result.textContent;
    if (tempInput !== "") {
      firstNumber = Number(tempInput);
      result.textContent = "";
    }

    operator = e.target.textContent;
    addOperator(operator);

    // Work after once calculation
    if (
      calculation.textContent.includes(`${operator}`) &&
      calculation.textContent.includes("=")
    ) {
      calculation.textContent = firstNumber + operator;
    }

    if (calculation.textContent.includes("=")) {
      // Check if second number isn't click yet then remove equal
      let removeEqual = calculation.textContent
        .split("")
        .filter((item) => item !== "=")
        .join("");
      calculation.textContent = removeEqual;
    }
  }

  if (e.target.textContent === "=") {
    // Check if second number is available or not
    if (secondNumber === undefined && firstNumber === undefined) {
      return;
    }

    // Check if the result found, so equal stop working
    if (calculation.textContent.includes("=")) {
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
    if (Number.isInteger(answer)) {
      result.textContent = answer;
    } else {
      result.textContent = parseFloat(answer.toFixed(6));
    }
  }
});
