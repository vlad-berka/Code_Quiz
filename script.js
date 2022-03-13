const list_of_Questions = ["Question 1", "q1a1", "q1a2", "q1a3", "q1a4",
                        "Question 2", "q2a1", "q2a2", "q2a3", "q2a4",
                        "Question 3", "q3a1", "q3a2", "q3a3", "q3a4",  
                        "Question 4", "Answer1", "Answer2", "Answer3","Answer4",  
                        "Question 5", "Answer1", "Answer2", "Answer3","Answer4",  
                        "Question 6", "Answer1", "Answer2", "Answer3","Answer4",  
                        "Question 7", "Answer1", "Answer2", "Answer3","Answer4",  
                        "Question 8", "Answer1", "Answer2", "Answer3","Answer4",  
                        "Question 9", "Answer1", "Answer2", "Answer3","Answer4",
                        "Question 10", "Answer1", "Answer2", "Answer3","Answer4"];

var answer_key = [0,1,2,2,3,2,2,1,1,1];
var question_count = 0;
var is_Correct = 0;
var correct_Score = 0;
var scoreboard_Array = [];

document.querySelector("#begin_button").addEventListener("click", Begin);

document.querySelector("#Answer1").addEventListener("click", check_Answer);
document.querySelector("#Answer2").addEventListener("click", check_Answer);
document.querySelector("#Answer3").addEventListener("click", check_Answer);
document.querySelector("#Answer4").addEventListener("click", check_Answer);

function Begin () {
    document.querySelector(".start_Header").remove();
    document.querySelector(".hidden_Main").setAttribute("class", "not_Hidden_Main");
    document.querySelector(".hidden_List").setAttribute("class", "not_Hidden_List");
    document.querySelector(".hidden_Score").setAttribute("class", "not_Hidden_Score");

    document.querySelector(".Question").textContent = list_of_Questions[0];
    document.querySelector("#Answer1").textContent = list_of_Questions[1];
    document.querySelector("#Answer2").textContent = list_of_Questions[2];
    document.querySelector("#Answer3").textContent = list_of_Questions[3];
    document.querySelector("#Answer4").textContent = list_of_Questions[4];

    // Reset question count and score count in case the user clicks where the buttons are, as they are hidden
    question_count = 0;
    correct_Score = 0;
}

function Retry () {
    question_count = 0;
    correct_Score = 0;

    document.querySelector(".Question").textContent = (list_of_Questions[0] + " (" + question_count + ") ");
    document.querySelector("#Answer1").textContent = list_of_Questions[1];
    document.querySelector("#Answer2").textContent = list_of_Questions[2];
    document.querySelector("#Answer3").textContent = list_of_Questions[3];
    document.querySelector("#Answer4").textContent = list_of_Questions[4];
    document.querySelectorAll("#final_Screen").remove();
}

function check_Answer() {
    var answer = event.currentTarget.getAttribute("id");

    if (answer == "Answer1")
    {
        answer = 0;
    } 
    else if (answer == "Answer2") {
        answer = 1;
    }
    else if (answer == "Answer3") {
        answer = 2;
    }
    else {
        answer = 3;
    }

    if (answer == answer_key[question_count])
    {
        // Answer IS correct
        correct_Score++;
        document.querySelector(".not_Hidden_Score").textContent = "Score: " +correct_Score;
    } else {
        // Answer NOT correct
        answer = false;
    }

    change_Question();
}

function change_Question() {
    question_count++;
    console.log(question_count);
    
    if (question_count > answer_key.length-1) {
        end_Of_Quiz();
        console.log(question_count + " is greater than " + (answer_key.length-1) + " so ending quiz.");
        question_count = 0;
        return; //end the quiz
    } else {    
        var array_pos = question_count*5;
        document.querySelector(".Question").textContent = list_of_Questions[array_pos];// +" (" + question_count + ") ";
        document.querySelector("#Answer1").textContent = list_of_Questions[array_pos+1];
        document.querySelector("#Answer2").textContent = list_of_Questions[array_pos+2];
        document.querySelector("#Answer3").textContent = list_of_Questions[array_pos+3];
        document.querySelector("#Answer4").textContent = list_of_Questions[array_pos+4];
    }
}

function end_Of_Quiz() {
    document.querySelector(".not_Hidden_List").setAttribute("class", "hidden_List");
    var first_Name = prompt(("You've scored " + correct_Score + " out of " + answer_key.length + " questions correct!"), "Enter your name here for high scores!");

    scoreboard_Array.push(first_Name);
    scoreboard_Array.push(correct_Score);

    document.body.appendChild(document.createElement("section"));
    document.body.lastChild.setAttribute("id", "final_Screen");
    document.body.lastChild.textContent = "Name // Score";

    console.log("scoreboard array contains: " +scoreboard_Array);

    for (let i = 0; i < scoreboard_Array.length; i += 2){
        console.log("making new p element");
        document.body.lastChild.appendChild(document.createElement("p"));
        document.body.lastChild.lastChild.textContent = scoreboard_Array[i] + " // " + correct_Score;
    }

    document.body.appendChild(document.createElement("section"));
    document.body.lastChild.setAttribute("id", "final_Screen");
    document.body.lastChild.textContent = "Play Again??";
    document.body.appendChild(document.createElement("p"));
    document.body.lastChild.textContent = "YES";
    document.body.lastChild.setAttribute("id", "reset_Yes");
    document.body.appendChild(document.createElement("p"));
    document.body.lastChild.textContent = "NO";
    document.body.lastChild.setAttribute("id", "reset_No");
    
    document.querySelector(".not_Hidden_Score").setAttribute("class", "hidden_Score");

    document.querySelector("#reset_Yes").addEventListener("click", Retry);
    document.querySelector("#reset_No").addEventListener("click", Retry);
}