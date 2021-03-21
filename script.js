// TODO: add code here

window.addEventListener("load", function(event) {
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) {
        response.json().then(function(json) {

            const placeHolder = document.getElementById("container");

            let sortedByTimeInSpace = [];
            let sortedIndex = 0;
            let indexTooAdd = 0;
            let timeInSpace = 0;
            let looperVariable = json.length;

            while (looperVariable > 0) {
                for(i = 0; i < json.length; i++) {
                    if (json[i].hoursInSpace > timeInSpace) {
                        indexTooAdd = i;
                        timeInSpace = json[i].hoursInSpace;
                    }
                }
                sortedByTimeInSpace[sortedIndex]=json[indexTooAdd]
                sortedIndex++;
                timeInSpace = 0;
                json.splice(indexTooAdd,1);
                looperVariable = json.length;
            }
            
            let skillsList = "";

            for(i = 0; i < sortedByTimeInSpace.length; i++) {
                for(j = 0; j < sortedByTimeInSpace[i].skills.length; j++) {
                    skillsList += sortedByTimeInSpace[i].skills[j];
                    if((j+1) < sortedByTimeInSpace[i].skills.length) {
                        skillsList += ", ";
                    }
                }

                placeHolder.innerHTML += `
                    <div class="astronaut">
                      <div class="bio">
                         <h3> ${sortedByTimeInSpace[i].firstName} ${sortedByTimeInSpace[i].lastName}</h3>
                           <ul>
                              <li>Hours in space: ${sortedByTimeInSpace[i].hoursInSpace}</li>
                              <li class="${sortedByTimeInSpace[i].active}">Active: ${sortedByTimeInSpace[i].active}</li>
                              <li>Skills: ${skillsList}</li>
                           </ul>
                      </div>
                      <img class="avatar" src="${sortedByTimeInSpace[i].picture}">
                    </div>
             `;

             skillsList = "";

                
            }

            placeHolder.innerHTML += `
                <div class="astroCount">
                    <h3>There are ${sortedByTimeInSpace.length} astronauts!</h3>
                </div>
            `
        });
    });
    
});