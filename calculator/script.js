class Calculator {
  constructor(previous, current) {
    this.previous = previous;
    this.current = current;
    this.clear();
  }
  clear() {
    this.current.innerHTML = "";
    this.previous.innerHTML = "";
    this.operation = undefined;
  }
  numberappend(number) {
    if (number === "." && this.current.innerHTML.includes(".")) return;
    this.current.innerHTML = this.current.innerHTML + number;
  }
  updatedisplay() {
    this.current.innerHTML = this.current.innerHTML;
    this.previous.innerText = this.previous.innerHTML;
  }
  chooseoperation(operation) {
    if (this.current.innerHTML === "") return;
    if (this.previous.innerHTML !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previous.innerHTML = this.current.innerHTML;
    this.current.innerHTML = "";
  }
  compute() {
    let result;
    const prev = parseFloat(this.previous.innerHTML);
    const cur = parseFloat(this.current.innerHTML);
    switch (this.operation) {
      case "+":
        result = prev + cur;
        break;
      case "-":
        result = prev - cur;
        break;
      case "*":
        result = prev * cur;
        break;
      case "÷":
        result = prev / cur;
        break;
      default:
        return;
    }
    this.current.innerHTML = result;
    this.previous.innerHTML = "";
    this.operation = undefined;
  }
  delete() {
    this.current.innerHTML = this.current.innerHTML.toString().slice(0, -1);
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-clear]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const current = document.querySelector("[data-current]");
const previous = document.querySelector("[data-previous]");

var answered = false;

const calculator = new Calculator(previous, current);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (answered) {
      calculator.clear();
      answered = false;
    }

    calculator.numberappend(button.innerText);
    calculator.updatedisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (answered) {
      answered = false;
    }

    calculator.numberappend(button.innerText);
    calculator.chooseoperation(button.innerText);
    calculator.updatedisplay();
  });
});
clearButton.addEventListener("click", () => {
  if (answered) {
    answered = false;
  }
  calculator.clear();
  calculator.updatedisplay();
});
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updatedisplay();
  answered = true;
});
deleteButton.addEventListener("click", () => {
  if (answered) {
    answered = false;
  }
  calculator.delete();
  calculator.updatedisplay();
});
