let add = function(a,b){return a + b;}
let subtract = function(a,b){return a - b;}
let multiply = function(a,b){return a * b;}
let divide = function(a,b){
	if(b === 0){
		return "cannot divide by zero"
	}
	return a / b;
}
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

let numbers1 = [0,0];
let operator = "";
let sign = "+"

let buttonHash = {};
let buttonElements = document.querySelectorAll(".calculator-buttons button")
let opElements = document.querySelectorAll(".calculator-ops button")
let queuedNum = document.querySelector(".queued-num")
let clearBtn = document.querySelector(".clear-container button")
let liveNum = document.querySelector(".live-num")

clearBtn.addEventListener("click" ,() =>{
	numbers1 = [0,0];
	operator = "";
	sign = "+";
	liveNum.textContent = "0";
	queuedNum.textContent = "";
})



buttonElements.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		let liveCurrent = liveNum.textContent
		if(liveNum.textContent == "0"){
			liveNum.textContent = e.target.textContent;
		} else {
			liveNum.textContent = liveCurrent + e.target.textContent;
		}
	})
})