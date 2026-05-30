function allOperators(operator) {
  // Get values from input fields
  let num1 = parseFloat(document.getElementById("number1").value);
  let num2 = parseFloat(document.getElementById("number2").value);

  let result;

  // Perform operations
  if (operator === "+") {
    result = num1 + num2;
  } 
  else if (operator === "-") {
    result = num1 - num2;
  } 
  else if (operator === "*") {
    result = num1 * num2;
  } 
  else if (operator === "/") {
    if (num2 === 0) {
      result = "Cannot divide by 0";
    } else {
      result = num1 / num2;
    }
  }

  // Display result
  document.getElementById("operators").innerHTML =
    "Result: " + result;
}