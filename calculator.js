let runningTotal = 0;
let buffer = "0"; // for the user to track what they are typing in.
let previousOperator; // keeping the track of what previously was pressed
const screen = document.querySelector(".screen");

document.querySelector('.calc-buttons').addEventListener("click", function(event){
    buttonClick(event.target.innerText);
});



function buttonClick(value){ 
    if (isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender(); // any time that anything's changed you need to rerender
}

function handleNumber(value){
    if (buffer === "0"){  /* if i hit a number while the variable buffer is 0 then it will be turn into the number you have typed in except zero.
                             it does not append another 0 , otherwise it starts appending.
                            */
        buffer = value;
    }
    else {
        buffer += value; // it starts appending 
    }
}

function handleSymbol(value){
   switch (value){
       case 'C':
           buffer = "0";
           runningTotal = 0;
           previousOperator = null;
           break;
           case "=":
            if (previousOperator === null){ // if you keep press on equal it does nothing , so to not be added another equal sign
            return;
            }
            flushOperation(parseInt(buffer)); //we are gonna turn the buffer into a number and pass it into flushOperation
            previousOperator = null;
            buffer = " " + runningTotal;
            runningTotal = 0;
            break;
            case '←':
                if(buffer.length === 1){
                    buffer = "0";
                } 
                else {
                    buffer = buffer.substring(0 , buffer.length - 1);
                }
                break;
            default:
            handleMath(value);
            break;
   }
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0 ){
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer); /*for example if i click * I should be storing the number I typed in 
                                    which is my new running total like to get the new value after the operation. 
                                    that is what flushOperation does*/
    }
    previousOperator = value;
    buffer = "0"; // ready for the next number to come in
}

function flushOperation (intBuffer){
    if (previousOperator === "+"){
        runningTotal += intBuffer;

    } else if (previousOperator === "-"){
        runningTotal -= intBuffer;
    }
    else if (previousOperator === "x"){
        runningTotal *= intBuffer;
    }

    else {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}