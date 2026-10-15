let numbers1 = ["0","0"];
let operator = "";
let sign = "+"
let clearCalculator = function(){
	numbers1 = ["0","0"];
	operator = "";
	sign = "+";
	liveNum.textContent = "0";
	queuedNum.textContent = "";
	opDisp.textContent = "";
}

let buttonElements = document.querySelectorAll(".calculator-buttons button")
let opElements = document.querySelectorAll(".calculator-ops button")
let clearBtn = document.querySelector(".clear-container button")
let liveNum = document.querySelector(".live-num")
let queuedNum = document.querySelector(".queued-num")
let opDisp = document.querySelector(".op-disp")

let add = function(a,b){return a + b;}
let subtract = function(a,b){return a - b;}
let multiply = function(a,b){return a * b;}
let divide = function(a,b){
	if(b === 0){
		return "cannot divide by zero"
	}
	return a / b;
}

let opHash = {
	'+':add,
	'-':subtract,
	'&times;':multiply,
	'&div;':divide,
}

clearBtn.addEventListener("click" ,clearCalculator)


opElements.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if(e.target.textContent === "="){
			let numResult = operator(numbers1[0],numbers1[1]);
			liveNum.textContent = numResult;
			numbers1 = [String(numResult), '0'];
		} else {
			operator = opHash[e.target.textContent];
			queuedNum.textContent = numbers1[0];
			opDisp.textContent = e.target.textContent;
			numbers1[1] = numbers1[0] = 0;
			liveNum.textContent = "0";
		}
		
	})
})

buttonElements.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		let liveCurrent = liveNum.textContent
		if(e.target.textContent === "+/-"){
			liveNum.textContent = sign === '+' ? "-"+liveCurrent : liveCurrent.slice(1);
			sign = sign === '+' ? "-" : "+";
		} else {
			if(liveNum.textContent == "0"){
				liveNum.textContent = e.target.textContent;
			} else {
				liveNum.textContent = liveCurrent + e.target.textContent;
			}
		}
		
		numbers1[0] = liveNum.textContent;
		console.log(numbers1);
	})
})