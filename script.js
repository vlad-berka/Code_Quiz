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
var current_Score = [];

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

    document.querySelector("#Answer1").addEventListener("click", check_Answer);
    document.querySelector("#Answer2").addEventListener("click", check_Answer);
    document.querySelector("#Answer3").addEventListener("click", check_Answer);
    document.querySelector("#Answer4").addEventListener("click", check_Answer);

    // Reset question count and score count in case the user clicks where the buttons are, as they are hidden
    question_count = 0;
    correct_Score = 0;
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
    var first_Name = prompt(("You've scored " + correct_Score + " out of " + answer_key.length + " questions correct!"), "Enter your name here for high scores!");

    document.body.appendChild(document.createElement("section"));
    document.body.lastChild.setAttribute("id", "final_Screen");
    document.body.lastChild.textContent = "Name // Score";
    document.querySelector(".not_Hidden_Score").setAttribute("class", "hidden_Score");

    cleanup_step();
    write_HighScores (first_Name, correct_Score);
    display_HighScores();

}

function cleanup_step() {
    document.querySelector(".Question").textContent = "CURRENT HIGH SCORES";
    document.querySelector(".not_Hidden_List").remove();
}

function write_HighScores (first_Name, correct_Score) {
    var initials = JSON.parse(localStorage.getItem("initials"));
    var init_scores = JSON.parse(localStorage.getItem("scores"));

    console.log("Current initials are: " + initials);
    console.log("Current initials are: " + init_scores);

    var score_names = [];
    var score_score = [];
    var inserted = false;

    if(initials == null) {
        console.log("initials are null! Writing first highscore")
        score_names.push(first_Name);
        score_score.push(correct_Score);
        inserted = true;
    }
    else {
        for (let i=0; i < init_scores.length; i++) {
            if (correct_Score > init_scores[i] && inserted == false)
            {
                console.log("Not yet inserted, new high scorer")
                inserted = true;
                score_names.push(first_Name);
                score_score.push(correct_Score);
                score_names.push(initials[i]);
                score_score.push(init_scores[i]);
            }
            else {
                console.log("Just pushing score")
                score_names.push(initials[i]);
                score_score.push(init_scores[i]);
            }
        }
    }

    console.log(score_names);
    console.log(score_score);

    localStorage.setItem("initials", JSON.stringify(score_names));
    localStorage.setItem("scores", JSON.stringify(score_score));
}

function display_HighScores() {
    var initials = JSON.parse(localStorage.getItem("initials"));
    var init_scores = JSON.parse(localStorage.getItem("scores"));

    console.log("Current initials are: " + initials);
    console.log("Current scores are: " + init_scores);

    for (let i = 0; i < initials.length; i++) {
        console.log("making new p element");
        document.body.lastChild.appendChild(document.createElement("p"));
        document.body.lastChild.lastChild.textContent = initials[i] + " // " + init_scores[i];
    }
}