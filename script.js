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
const digitNumber = document.querySelector(".left-container");
const digitOperator = document.querySelector(".right-container");
const displayBox = document.querySelector(".display-box");
const result = document.querySelector(".result");

// Event on 0-9 and .
digitNumber.addEventListener("click", function (e) {
  // Check if clicked is button or not
  if (e.target.tagName === "BUTTON") {
    result.textContent += e.target.textContent;
  }
});

// Event on operators
digitOperator.addEventListener("click", function (e) {
  // Check if clicked is button or not
  if (e.target.tagName === "BUTTON" && e.target.textContent !== "=") {
    firstNumber = Number(result.textContent);
    console.log(firstNumber);
    result.textContent = "";
    operator = e.target.textContent;
  }

  if (e.target.textContent === "=") {
    secondNumber = Number(result.textContent);
    result.textContent = "";
    result.textContent = operate(operator, firstNumber, secondNumber);
  }
});
