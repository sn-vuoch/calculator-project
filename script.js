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
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  }
  return result;
}

let firstNumber;
let secondNumber;
let operator;
const digitNumber = document.querySelector(".left-container");
const displayBox = document.querySelector(".display-box");
const result = document.createElement("p");

// Events on 0-9 and .
digitNumber.addEventListener("click", function (e) {
  // Check if clicked is button or not
  if (e.target.tagName === "BUTTON") {
    result.textContent += e.target.textContent;
  }

  displayBox.appendChild(result);
});