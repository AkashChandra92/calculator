// Get process.stdin as the standard input object.
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding("utf-8");

// Prompt user to input data in console.
console.log(
  "Please input a string in command line with operators + and - For example : 5+4-2"
);

// When user input data and click enter key.
standard_input.on("data", function(data) {
  // We convert the input from the user into a string
  let str = data.toString();

  // We use regular expressions to check if the data consists of numbers and operatod + or -
  let filter = /([0-9]*\.?[0-9]+[\+\-])+([0-9]*\.?[0-9]+)/g;

  // Compare holds the data in the format : ["data"]
  let compare = str.match(filter);

  // User input exit.
  if (data === "exit\n") {
    // Program exit.
    console.log("User input complete, program exit.");
    process.exit();
  } else {
    if (compare == null) {
      console.log("Please enter valid input");
    } else {
      calculator();
    }
  }

  function calculator() {
    // Since the equation lies as a string in an array, we use compare[0] to access the equation
    
    // We take out the operators from the equation and put it in a separate array
    const arrayOperators = compare[0].match(/[^0-9.]/g);

    // We take out the numbers from the equation and put it in a string called numbers
    const numbers = compare[0].replace(/[^0-9.]/g, ",");

    //  We take the string of numbers and make an array
    const arrayNumbers = numbers.split(",");

    let answer = 0;

    console.log("The array of operators is : ", arrayOperators);
    console.log("The array of numbers is: ", arrayNumbers);

    for (let i = 0; i < arrayOperators.length; i++) {
      // parseInt is used since the numbers are in the format of a string in an array
      let firstNum = parseInt(arrayNumbers[i]);
      let secondNum = parseInt(arrayNumbers[i + 1]);

      let operator = arrayOperators[i];

      // When the loop runs the first time, we take the immediate first two numbers of the equation and form an answer
      if (i === 0) {
        switch (operator) {
          case "+":
            answer = answer + (firstNum + secondNum);
            break;
          case "-":
            answer = answer + (firstNum - secondNum);
            break;
          default:
            return answer;
        }
      }
      // For all the consecutive numbers, we keep adding/substracting them from the answer
      else
        switch (operator) {
          case "+":
            answer = answer + secondNum;
            break;
          case "-":
            answer = answer - secondNum;
            break;
          default:
            console.log("Switch did not work");
        }
    }
    console.log("The answer is ", answer);
  }
});
