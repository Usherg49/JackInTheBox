//Get the values from the page
//Starts the controller function
function getValues(){
    let jackAge = document.getElementById("jackAge").value;
    let boxSize = document.getElementById("boxSize").value;

    jackAge = parseInt(jackAge);
    boxSize = parseInt(boxSize);

    if(Number.isInteger(jackAge) && Number.isInteger(boxSize)){
        
        //Choosing a function to call generateMultiples, based on user input in radio buttons
        if(document.getElementById("forLoop").checked){
            outputValues = generateMultiplesForLoop(jackAge, boxSize);
        }else if(document.getElementById("switchStatement").checked){
            outputValues = generateMultiplesSwitchStatement(jackAge, boxSize);
        }else{
            outputValues = generateMultiplesTernaryOperator(jackAge, boxSize);
        }
        displayResultsTemplateTags(outputValues);
        
        //Ucomment line below to use Template Literals to diplay the results. (Also uncomment line 94)
        //displayResultsTemplateLiterals(outputValues);
    }else{
        alert("Please enter valid numbers.");
    }
}

//Calculate whether numbers are multiples of Jack, Box or both
//Using a for-loop to generate multiples
function generateMultiplesForLoop(jackAge, boxSize){
    
    let outputValues = [];

    for(i = 1; i <= 1000; i++){
        if(i % jackAge == 0 && i % boxSize == 0){
            outputValues.push("Jack-in-the-Box");
        }else if(i % jackAge == 0){
            outputValues.push("Jack");
        }else if(i % boxSize == 0){
            outputValues.push("Box");
        }else{
            outputValues.push(i);
        }
    }
    return outputValues;
}

//Using the Switch Statement to generate multiples
function generateMultiplesSwitchStatement(jackAge, boxSize){
    let outputValues = [];
    
    let jack = false;
    let box = false;

    for(let i = 1; i <= 1000; i++){
        jack = i % jackAge == 0;
        box = i % boxSize == 0;
    
        switch (true) {
        case jack && box:
            outputValues.push("Jack-in-the-Box");
            break;

        case jack:
            outputValues.push("Jack");
            break;

        case box:
            outputValues.push("Box");
            break;
    
        default:
            outputValues.push(i);
        }
    }
    return outputValues;
}

//Using a Ternary Operator to generate multiples
function generateMultiplesTernaryOperator(jackAge, boxSize){
    let outputValues = [];

    for(i = 1; i <= 1000; i++){
        let value = ((i % jackAge == 0 ? "Jack" : "") + (i % boxSize == 0 ? "Box" : "") || i);
        let updatedValue = (value == "JackBox" ? "Jack-in-the-Box" : value);
        outputValues.push(updatedValue);
    }
    return outputValues;
}

//Display the Results Using Template Literals
//Uncomment the block below to use this function. (Also uncomment line 23)
/* 
function displayResultsTemplateLiterals(outputValues){
    let templateRows = "<tr>";

    for(let i = 0; i < outputValues.length; i++){
        if((i + 1) % 4 == 0){
            templateRows += `<td>${outputValues[i]}</td></tr><tr>`;
        }else{
            templateRows += `<td>${outputValues[i]}</td>`
        }
    }
    //Remove the extra <tr> at the end, then adding it to the innerHTML
    templateRows = templateRows.slice(0, -4)
    document.getElementById("results").innerHTML = templateRows;
} 
*/

//Display the results using Template Tags
function displayResultsTemplateTags(outputValues){
    let tableBody = document.getElementById("results");
    let templateRow = document.getElementById("jibTemplate");

    tableBody.innerHTML = "";

    for(i = 0; i < outputValues.length; i += 4){
        let tableRow = document.importNode(templateRow.content, true);

        let rowCols = tableRow.querySelectorAll("td");
        
        rowCols[0].classList.add(outputValues[i]);
        rowCols[0].textContent = outputValues[i];
        
        rowCols[1].classList.add(outputValues[i + 1]);
        rowCols[1].textContent = outputValues[i + 1];
        
        rowCols[2].classList.add(outputValues[i + 2]);
        rowCols[2].textContent = outputValues[i + 2];
        
        rowCols[3].classList.add(outputValues[i + 3]);
        rowCols[3].textContent = outputValues[i + 3];

        tableBody.appendChild(tableRow);
    }
}
