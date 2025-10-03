const display  = document.querySelector("#display")
const buttons = document.querySelectorAll(".btn")
const equalbtn  = document.querySelector("#equal")
const clearbtn = document.querySelector("#cancel-btn")


let currentInput = "";

buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        currentInput += button.getAttribute("data-value");
        display.value = currentInput
    })
})
clearbtn.addEventListener("click", ()=>{
    currentInput = "";
    display.value = "";
})

equalbtn.addEventListener("click", ()=>{
    try{
        currentInput = eval(currentInput);
        display.value = currentInput;
    }
    catch{
        display.value  = "Error";
        currentInput ="";

    }
})