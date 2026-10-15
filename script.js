let numbers1 = ["0","0"];
let operator = "";
let operatorDisp = "";
let sign = "+";
let viewPartialCLear = function(){
	assignTextContent(liveNumDisp,"");
	assignTextContent(eqDisp,"");
}
let clearCalculator = function(){
	numbers1 = ["0","0"];
	operator = "";
	sign = "+";
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
	'&times;':multiply,
	'&div;':divide,
}

clearBtn.addEventListener("click" ,clearCalculator)


opElements.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if(e.target.textContent === "=" && operator){
			let numResult = operator(Number(numbers1[0]),Number(numbers1[1]));
			assignTextContent(liveNum,numResult);
			assignTextContent(liveNumDisp,numbers1[0]);
			assignTextContent(eqDisp,"=");
			numbers1 = [String(numResult), '0'];
			console.log(numbers1);
		} else if(e.target.textContent !== "="){
			if(eqDisp){
				viewPartialCLear();
			}
			operator = opHash[e.target.textContent];
			assignTextContent(queuedNum, numbers1[0]);
			assignTextContent(opDisp, e.target.textContent);
			assignTextContent(liveNum, "0");
			numbers1[1] = numbers1[0];
			numbers1[0] = 0;
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