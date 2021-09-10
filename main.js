var billAmount = document.querySelectorAll("input.input-box:not(space-btn)");
var inputObj = {};
var tipTimeout = null;
var billTimeout = null;
var tipBtns = document.querySelectorAll("button.tip-btn");
var inputPeople = document.querySelector("#people-icon");
var inputPeoplePara = document.querySelector(".p-hidden");
var resetBtn = document.querySelector("#reset-btn");
var tipAmount = document.querySelector("#tip-total");
var totalAmount = document.querySelector("#total-Amount");

tipBtns.forEach(btn => {btn.addEventListener("click", getTipAmount)});
billAmount.forEach(bill => {addEventListener("input", calculateBill)});
resetBtn.addEventListener("click", clearItems);

var errorMsg = document.createElement('div');
errorMsg.style.background = 'red';
errorMsg.style.padding = '5px 0';

function calculateBill(e){
  clearTimeout(billTimeout);
  if (e.target.id == "people-icon" && e.target.value == 0){
    inputPeople.classList.add("error-input");
    inputPeoplePara.classList.remove("p-hidden");
  }
  else{
    inputPeople.classList.remove("error-input");
    inputPeoplePara.classList.add("p-hidden");
    billTimeout = setTimeout(inputBill, 3000);
  }
}

function getTipAmount(e){
  try {
    let tipPercent = Number(e.target.textContent.split("%")[0]) / 100;
    inputObj.tipPercent = tipPercent;
  }
  catch (e) {
    console.log("Error occurred: " + e);
  }
}

function clearItems(e){
  inputObj = {};
  totalAmount.textContent = "";
  tipAmount.textContent = "";
  inputPeople.classList.remove("error-input");
  inputPeoplePara.classList.add("p-hidden");
  var billForm = document.querySelectorAll("form");
  billForm.forEach(function(form) {
    form.reset()
  });
}

// HELPER FUNCTIONS

// Receives user input and if valid returns tip and bill amount
function inputBill () {
  let billInputs = document.querySelectorAll("input.input-box");
  let anyEmpty = false;

  for (var i = 0; i < billInputs.length; i++) {
    if (billInputs[i].value == ""){
      if (billInputs[i].name != "customInput"){
        anyEmpty = true;
        break; }}}

  if (!anyEmpty){
    if (validateInputs(billInputs)){
      let validatedInputs = validateInputs(billInputs);
      let billSum = calculateTipAmount(validatedInputs);
      let billSumPerPerson = billSum[0];
      let billTipPerPerson = billSum[1];
      totalAmount.textContent = "$" + billSumPerPerson;
      tipAmount.textContent = "$" + billTipPerPerson;
    }
  }
  else{
    throwError();
  }
}

// Input for bill and people must be greater than 0
function validateInputs(inputs){
  inputs.forEach(function(input){
    if (!input.value <= 0){
      if (input.name == "customInput"){
        inputObj[input.name] = Number(input.value.split("%")) / 100;
      }
      else{
        inputObj[input.name] = Number(input.value);
      }
    }
  });
  // check if people value is a positive integer
  if (inputObj.peopleInput % 1 == 0){
    return inputObj;
  }
  return false;
}

function calculateTipAmount(billObject){
  let bill = billObject.billInput;
  let people = billObject.peopleInput;
  let tipItem = null;
  if (billObject.tipPercent){
    tipItem = inputObj.tipPercent;
  }
  else if (billObject.customInput){
    tipItem = inputObj.customInput;
  }
  let = billPerPerson = (bill * (1+tipItem)) / people;
  let = tipPerPerson = (bill * tipItem) / people;
  return [billPerPerson.toFixed(2), tipPerPerson.toFixed(2)];
}

function throwError(){
  errorMsg.innerHTML = "Error: Please select a tip " +
  " and enter a value for Bill and Number of People.";
  body = document.querySelector("body");
  container = document.querySelector("#logo-header");
  body.insertBefore(errorMsg, container);
  setTimeout(() => errorMsg.remove(), 3000);
}
