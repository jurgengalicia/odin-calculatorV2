// still need continuous operation
// operations with decimals
// operations with negative
let numbersQueue = ["0","0"];
let numpadKeys = ["Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","Numpad0"];
let numpadOps = ["NumpadDivide", "NumpadMultiply", "NumpadSubtract", "NumpadAdd", "NumpadEnter"];
let numpadOpsHash = {
	"NumpadDivide":'÷',
	"NumpadMultiply":'×',
	"NumpadSubtract":'-',
	"NumpadAdd":'+',
	"NumpadEnter":"=",
}

let operator = "";
let operatorDisp = "";
let lastEquals = 0;
let lastOp = 0;
let sign = "+";
let viewPartialCLear = function(){
	assignTextContent(liveNumDisp,"");
	assignTextContent(eqDisp,"");
}
let clearCalculator = function(){
	numbersQueue = ["0","0"];
	operator = "";
	sign = "+";
	lastEquals = 0;
	lastOp = 0;
	assignTextContent(liveNum,"0");
	assignTextContent(queuedNum,"");
	assignTextContent(opDisp,"");
	viewPartialCLear();
}


let assignTextContent = function(elem, content){
	elem.textContent = content;
}

let bodyElement = document.querySelector("body")
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
		return "no div by zero";
	}
	let result = a/b;
	let resultString = String(result);
	if(resultString.includes(".") && resultString.slice(resultString.indexOf(".")+1).length > 3){
		return result.toFixed(4)
	}
	
	return result;
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

let numberOperation = function(inputType, keyOrButton){
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
	lastOp = 0;
}

let opFunction = function(inputKey){
	if(inputKey !== "=" && operator && !lastOp){
			lastOp = 1
			if(eqDisp){
				viewPartialCLear();
			}
			let numResult = runOperation();
			assignTextContent(queuedNum, String(numResult));
			assignTextContent(liveNum,"0");
			assignTextContent(liveNumDisp,"");

			operator = opHash[inputKey];
			
			assignTextContent(opDisp, inputKey);
			numbersQueue[0] = "0";
			numbersQueue[1] = String(numResult);
			console.log("if 1")
	} else if (inputKey !== "=" && lastOp){
		//if user spams operators
		lastOp = 1;
		assignTextContent(opDisp, inputKey);
		operator = opHash[inputKey];
		console.log("if 2")
	} else if (inputKey === "=" && operator){
		lastOp = 0
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
		console.log("if 3")
	} else if (inputKey !== "=" && lastEquals && !lastOp){
		let lastNum = numbersQueue[1]
		lastEquals = 0;
		lastOp = 1;
		if(eqDisp){
			viewPartialCLear();
		}
		operator = opHash[inputKey];
		assignTextContent(queuedNum, lastNum);
		assignTextContent(opDisp, inputKey);
		assignTextContent(liveNum, "0");
		numbersQueue[1] = lastNum;
		numbersQueue[0] = "0";
		console.log("if 4")
	} else if (inputKey !== "=" && !lastOp){
		lastOp = 1;
		if(eqDisp){
			viewPartialCLear();
		}
		operator = opHash[inputKey];
		assignTextContent(queuedNum, numbersQueue[0]);
		assignTextContent(opDisp, inputKey);
		assignTextContent(liveNum, "0");
		numbersQueue[1] = numbersQueue[0];
		numbersQueue[0] = "0";
		console.log("if 5")
	}
}

clearBtn.addEventListener("click" ,clearCalculator)


opElements.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		opFunction(e.target.textContent)
	})
})

buttonElements.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if(lastEquals){
			clearCalculator();
		}
		let liveCurrent = liveNum.textContent;
		if(e.target.textContent === "+/-"){
			liveNum.textContent = sign === '+' ? "-"+liveCurrent : liveCurrent.slice(1);
			sign = sign === '+' ? "-" : "+";
		} else if(e.target.textContent === "." && liveNum.textContent.includes(".")){
			return;
		} else {
			if(liveNum.textContent == "0"){
				liveNum.textContent = e.target.textContent;
			} else {
				liveNum.textContent = liveCurrent + e.target.textContent;
			}
		}
		numbersQueue[0] = liveNum.textContent;
		lastOp = 0;
	})
})

const input = document.querySelector("input");
const log = document.getElementById("log");

bodyElement.addEventListener("keydown", (e) =>{
	let keyPressed = e.code;
	let liveCurrent = liveNum.textContent;
	if(numpadKeys.includes(keyPressed)){
		let numPressed = keyPressed.slice(-1)
		if(lastEquals){
			clearCalculator();
		}
		let liveCurrent = liveNum.textContent
		if(liveNum.textContent == "0"){
			liveNum.textContent = numPressed;
		} else {
			liveNum.textContent = liveCurrent + numPressed;
		}
		numbersQueue[0] = liveNum.textContent;
		lastOp = 0;
	} else if (keyPressed === "Backspace"){
		if(liveCurrent === "0"){
			return;
		}else if(liveCurrent.length === 1){
			liveNum.textContent = "0";
			numbersQueue[0] = 0;
		} else {
			liveNum.textContent = liveCurrent.slice(0,-1);
			numbersQueue[0] = liveCurrent;
		}
	} else if (keyPressed === "NumpadDecimal"){
		if(liveCurrent.includes(".")){
			return;
		} else {
			liveNum.textContent = liveCurrent+".";
			numbersQueue[0] = liveNum.textContent;
		}
	} else if (numpadOps.includes(keyPressed)){
		let pressedDisplay = numpadOpsHash[keyPressed];
		opFunction(pressedDisplay)
	}
});

