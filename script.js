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

let firstNumber;
let secondNumber;
let operator;
let answer;
const digitNumber = document.querySelector(".left-container");
const digitOperator = document.querySelector(".right-container");
const displayBox = document.querySelector(".display-box");
const result = document.querySelector(".result");
const calculation = document.querySelector(".calculation");

// Event on 0-9 and .
digitNumber.addEventListener("click", function (e) {
  // Check if clicked is button or not
  if (e.target.tagName === "BUTTON") {
    if (result.textContent === String(answer)) {
      result.textContent = "";
      calculation.textContent = "";
    }
    result.textContent += e.target.textContent;
    calculation.textContent += e.target.textContent;
  }
});

// Event on operators
digitOperator.addEventListener("click", function (e) {
  // Check if clicked is button or not
  if (e.target.tagName === "BUTTON" && e.target.textContent !== "=") {
    firstNumber = Number(result.textContent);
    result.textContent = "";
    operator = e.target.textContent;
    calculation.textContent += operator;

    // Work after once calculation
    if (
      calculation.textContent.includes(`${operator}`) &&
      calculation.textContent.includes("=")
    ) {
      calculation.textContent = firstNumber + operator;
    }

    // Check if second number isn't click yet then remove equal
    if (calculation.textContent.includes("=")) {
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
    result.textContent = "";

    if (firstNumber !== undefined && secondNumber === 0) {
      return;
    }

    calculation.textContent += "=";

    answer = operate(operator, firstNumber, secondNumber);
    if (Number.isInteger(answer)) {
      result.textContent = answer;
    } else {
      result.textContent = parseFloat(answer.toFixed(6));
    }
  }
});
