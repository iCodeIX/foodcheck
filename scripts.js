var foodNameInput = document.getElementById("foodName");
var foodCalorieInput = document.getElementById("calorie");
var addBtn = document.querySelector(".add-btn");
var foodTable = document.querySelector(".foods-list-table");
var calorieSum = document.getElementById("calorieSum")
var targetCalories = document.getElementById("targetCalorie");


//add entry/item in the table

addBtn.addEventListener("click", addFood);

function addFood(){
	//check if name and calories number have been filled out
	if(foodCalorieInput.value == "" || foodNameInput.value == ""){
		alert("Food name and calorie are required!")
		return false;
	}
	else{
		var foodItemRow = document.createElement("tr");
		foodItemRow.setAttribute("class","food-row");
		var foodNumber = document.createElement("td");
		foodNumber.setAttribute("class","food-num");
		foodNumber.keydown = isNumberKey;
		var foodNameContainer = document.createElement("td");
		var foodCalorieContainer  = document.createElement("td");
		var deleteContainer = document.createElement("td");
		
		var foodNameBox = document.createElement("input");
		setAttributes(foodNameBox, {"type":"text","class":"food-name"});
		var foodCalorieBox = document.createElement("input");
		setAttributes(foodCalorieBox, {"type":"number","class":"calorie-count","onkeydown":"return isNumberKey(event)"});
		var deleteBox = document.createElement("input");
		deleteBox.onclick = uncheckCheckbox;
		setAttributes(deleteBox, {"type":"checkbox","class":"dis-en-box","checked":"checked"});
		
		
		
		
		foodNameBox.value = foodNameInput.value;
		foodCalorieBox.value = foodCalorieInput.value;
		
		
		foodNameContainer.append(foodNameBox);
		foodCalorieContainer.append(foodCalorieBox);
		deleteContainer.append(deleteBox);
		
		
		foodItemRow.append(foodNumber,foodNameContainer,foodCalorieContainer,deleteContainer);
		foodTable.appendChild(foodItemRow);
		
		getCalorieSum();
		showMaximizedCaloriesAlert();
	}
}

///set multiple attributes to new created element
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}



//show maximized calorie message

function showMaximizedCaloriesAlert(){
	
	let targetCalorie = document.getElementById("targetCalorie").value;
	
	
	
	if(parseInt(targetCalorie) < parseInt(calorieSum.innerText)){
		let calMaxContainer = document.querySelector(".cal-max-alert-container");
		
		calMaxContainer.style.display = 'block';
		hideMaximizedCaloriesAlert();
	}

}

//hide maximized calorie message
function hideMaximizedCaloriesAlert(){
	var box = document.querySelector(".cal-max-alert-container");
	setTimeout(() => {
	  box.style.display = 'none';
	}, 2000);

}




//get the sum of calories then display
function getCalorieSum(){
	
	var calorieCounts = document.querySelectorAll(".calorie-count");
	var disEnBox = document.querySelectorAll(".dis-en-box");
	var calories = 0;
	
	if(disEnBox != null){
		
		for(var i = 0; i < disEnBox.length; i++){
			if(disEnBox[i].checked){
				calories += parseInt(calorieCounts[i].value);
		}
		
		calorieSum.innerHTML = calories;
		}
	}
	
}

//reset entered inputs of user
var clearInputs = document.getElementById("clearInputsBtn");

	clearInputs.addEventListener("click",clearInput);
	
	function clearInput(){
		foodNameInput.value = "";
		foodCalorieInput.value = "";
		calorieSum.innerText = 0;
		targetCalories.value = "";
	}


//reset all item entries
var resetEntries = document.getElementById("resetEntriesBtn");

	resetEntries.addEventListener("click",resetEntry);

function resetEntry(){
	var foodItemRows = document.querySelectorAll(".food-row");
	
	for(var i = 0; i < foodItemRows.length; i++){
			foodItemRows[i].remove();
		}
		
		calorieSum.innerHTML = 0;
		clearInput();
}

//checkbox uncheck to disable items
		
function uncheckCheckbox(){
	getCalorieSum();
	changeColor();
}



//change color of unchecked items
function changeColor(){
	var disEnBoxes = document.querySelectorAll(".dis-en-box");
	var foodItemRows = document.querySelectorAll(".food-row");
	for(var i = 0; i < disEnBoxes.length; i++){
			if(!disEnBoxes[i].checked){
				foodItemRows[i].classList.add("disabled-food");
			}
			else{
				foodItemRows[i].classList.remove("disabled-food");
			}
		
	}
	
}


//accept only numbers inputs
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
