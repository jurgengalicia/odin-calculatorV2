// still need continuous operation
// operations with decimals
// operations with negative
let numbersQueue = ["0","0"];
let operator = "";
let operatorDisp = "";
let lastEquals = 0
let sign = "+";
let viewPartialCLear = function(){
	assignTextContent(liveNumDisp,"");
	assignTextContent(eqDisp,"");
}
let clearCalculator = function(){
	numbersQueue = ["0","0"];
	operator = "";
	sign = "+";
	lastEquals = 0
	assignTextContent(liveNum,"0");
	assignTextContent(queuedNum,"");
	assignTextContent(opDisp,"");
	viewPartialCLear();
}


let assignTextContent = function(elem, content){
	elem.textContent = content;
}

let buttonElements = document.querySelectorAll(".calculator-buttons button")
let opElements = document.querySelectorAll(".calculator-ops button")
let clearBtn = document.querySelector(".clear-container button")
let liveNum = document.querySelector(".live-num")
let queuedNum = document.querySelector(".queued-num")
let opDisp = document.querySelector(".op-disp")
let eqDisp = document.querySelector(".eq-disp")
let liveNumDisp = document.querySelector(".live-num-disp")

let add = function(a,b){return a + b;}
let subtract = function(a,b){return a - b;}
let multiply = function(a,b){return a * b;}
let divide = function(a,b){
	if(b === 0){
		clearCalculator();
		return "cannot divide by zero";
	}
	return a / b;
}

let opHash = {
	'+':add,
	'-':subtract,
	'×':multiply,
	'÷':divide,
}

let runOperation = function(){
	return operator(Number(numbersQueue.pop()),Number(numbersQueue.pop()));
}

clearBtn.addEventListener("click" ,clearCalculator)


opElements.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		console.log(e.target.textContent)
		if(e.target.textContent !== "=" && operator){
			if(eqDisp){
				viewPartialCLear();
			}
			let numResult = runOperation();
			assignTextContent(queuedNum, String(numResult));
			assignTextContent(liveNum,"0");
			assignTextContent(liveNumDisp,"");

			operator = opHash[e.target.textContent];
			
			assignTextContent(opDisp, e.target.textContent);
			numbersQueue[0] = "0";
			numbersQueue[1] = String(numResult);
		}else if(e.target.textContent === "=" && operator){
			if(lastEquals == 0){
				lastEquals = 1;
			}
			let secondNum = numbersQueue[0];
			let numResult = runOperation();
			assignTextContent(liveNum,numResult);
			assignTextContent(liveNumDisp,secondNum);
			assignTextContent(eqDisp,"=");
			operator = "";
			numbersQueue = ["0", String(numResult)];
		} else if (e.target.textContent !== "=" && lastEquals){
			let lastNum = numbersQueue[1]
			lastEquals = 0
			if(eqDisp){
				viewPartialCLear();
			}
			operator = opHash[e.target.textContent];
			assignTextContent(queuedNum, lastNum);
			assignTextContent(opDisp, e.target.textContent);
			assignTextContent(liveNum, "0");
			numbersQueue[1] = lastNum;
			numbersQueue[0] = "0";
		} else if (e.target.textContent !== "="){
			if(eqDisp){
				viewPartialCLear();
			}
			operator = opHash[e.target.textContent];
			assignTextContent(queuedNum, numbersQueue[0]);
			assignTextContent(opDisp, e.target.textContent);
			assignTextContent(liveNum, "0");
			numbersQueue[1] = numbersQueue[0];
			numbersQueue[0] = "0";
		}
		
	})
})

buttonElements.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if(lastEquals){
			clearCalculator();
		}
		let liveCurrent = liveNum.textContent
		if(e.target.textContent === "+/-"){
			liveNum.textContent = sign === '+' ? "-"+liveCurrent : liveCurrent.slice(1);
			sign = sign === '+' ? "-" : "+";
		} else if(e.target.textContent === "." && liveNum.textContent.includes(".")){
			let doNothingHere = "";
		} else {
			if(liveNum.textContent == "0"){
				liveNum.textContent = e.target.textContent;
			} else {
				liveNum.textContent = liveCurrent + e.target.textContent;
			}
		}
		numbersQueue[0] = liveNum.textContent;
		console.log(numbersQueue);
	})
})