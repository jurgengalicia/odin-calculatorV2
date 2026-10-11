let num1 = 0;
let operator = "";
let num2 = 0;
let buttonHash = {};
let buttonElements = document.querySelectorAll("button")
let calculatorScreen = document.querySelectorAll(".view-port")



let operate = function(n1, op, n2){
	switch(op) {
	case 1:
		return add(n1,n2);
	case 2:
		return subtract(n1,n2);
	case 3:
		return multiply(n1,n2);
	case 4:
		return divide(n1,n2);
  default:
	  return 0;
} 
}

let add = function(a,b){return a + b;}
let subtract = function(a,b){return a - b;}
let multiply = function(a,b){return a * b;}
let divide = function(a,b){
	if(b === 0){
		return "cannot divide by zero"
	}
	return a / b;
}