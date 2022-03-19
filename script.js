//Initializing question AND answer array
const list_of_Questions = ["Which of the following equality operators also checks type?", "(=)", "(!==)", "(===)", "(==)",
                        "If we have an array that contains 5 items, which index number corresponds to the last item?", "0", "-L", "5", "4",
                        "When passing the function named 'thisFunction' as an argument into 'thatFunction', which syntax calling 'thatFunction' is correct?", "thisFunction(thatfunction)", "thatFunction(function thisFunction)", "function(thisFunction, thatFunction)", "thatFunction(thisFunction)",  
                        "Using JQuery, which of the following methods searches for an element by the ID name 'testID' ?", "document.getElementByID('testID')", "getElementID('testID')", "$('testID')","$('id', 'testID')",  
                        "What is the form of data pushed into localStorage that is stored as key/value pairs?", "Array", "String", "Map", "Object",  
                        "During propogation of events through the DOM, what is the name of the phase that travels from the TARGET to the ROOT?", "Bubbling", "Cascading", "Capturing","Triggering",  
                        "What is the name of the notation for transmitting data between servers and webpages", "JSON", "ASCII", "Hexadecimal","2Bit"];

//Initializing the answer key. NOTE: Will populate each question based on length of this key                        
var answer_key = [2,3,3,2,1,0,0];


var question_count = 0;
var correct_Count = 0;
var secondsLeft = 0;
var current_Score = [];
var high_score_position = 0;
var scantron = [];
var secondsLeft = 910; //note, in deci-seconds, not mili seconds
var quiz_End = false;

document.querySelector("#begin_button").addEventListener("click", Begin);

function Begin() {
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

    Timer();
    // Reset question count and score count in case the user clicks where the buttons are, as they are hidden
    question_count = 0;
}

function check_Answer() {
    var answer = event.target.getAttribute("id");
    var id_El = answer;

    if (answer == "Answer1")
    {
        answer = 0;
        scantron.push(answer);
    } 
    else if (answer == "Answer2") {
        answer = 1;
        scantron.push(answer);
    }
    else if (answer == "Answer3") {
        answer = 2;
        scantron.push(answer);
    }
    else {
        answer = 3;
        scantron.push(answer);
    }

    if (answer == answer_key[question_count])
    {
        // Answer IS correct
        console.log("You're correct! Answered: " +answer+ " and the correct answer was: " +answer_key[question_count]);
        correct_Count++;
        change_Question();
    } else {
        // Answer NOT correct
        console.log("You're WRONG! Answered: " +answer+ " and the correct answer was: " +answer_key[question_count]);
        document.querySelector("#"+id_El).setAttribute("style", "background-color: red;");
        secondsLeft -= 100;
        answer = false;
    }
}

function change_Question() {
    question_count++;
    
    if (question_count > answer_key.length-1) {
        end_Of_Quiz();
        question_count = 0;
        return; //end the quiz
    } else {    
        var array_pos = question_count*5;
        document.querySelector(".Question").textContent = list_of_Questions[array_pos];
        document.querySelector("#Answer1").setAttribute("style", "");
        document.querySelector("#Answer1").textContent = list_of_Questions[(array_pos+1)];
        document.querySelector("#Answer2").setAttribute("style", "");
        document.querySelector("#Answer2").textContent = list_of_Questions[array_pos+2];
        document.querySelector("#Answer3").setAttribute("style", "");
        document.querySelector("#Answer3").textContent = list_of_Questions[array_pos+3];
        document.querySelector("#Answer4").setAttribute("style", "");
        document.querySelector("#Answer4").textContent = list_of_Questions[array_pos+4];
    }
}

function end_Of_Quiz() {
    quiz_End = true;

    console.log(secondsLeft);

    if(secondsLeft=="Timed Out!"){
        var first_Name = prompt(("You've run out of time!"), "Enter your name here for high scores!");
    } else {
        var first_Name = prompt(("You've ended the quiz with " + Math.floor(secondsLeft/10) + " seconds remaining!"), "Enter your name here for high scores!");
    }

    document.body.appendChild(document.createElement("section"));
    document.body.lastChild.setAttribute("id", "final_Screen");
    document.body.lastChild.textContent = "Name - - - Score";
    document.querySelector(".not_Hidden_Score").setAttribute("class", "hidden_Score");

    if(secondsLeft=="Timed Out!"){
        write_HighScores (first_Name, "Timed Out!")
    }
    else {
        write_HighScores (first_Name, Math.floor(secondsLeft/10));
    }

    display_HighScores();
    document.querySelector(".not_Hidden_Main").setAttribute("class", "final_Screen_Header");
    document.body.lastChild.appendChild(document.createElement("br"));
}

function write_HighScores (first_Name, secondsLeft) {
    var initials = JSON.parse(localStorage.getItem("initials"));
    var init_scores = JSON.parse(localStorage.getItem("scores"));

    var score_names = [];
    var score_score = [];
    var inserted = false;

    if(initials == null) {
        score_names.push(first_Name);
        score_score.push(secondsLeft);
    }
    else {
        for (let i=0; i < init_scores.length; i++) {
            if (secondsLeft > init_scores[i] && inserted == false)
            {
                inserted = true;
                score_names.push(first_Name);
                score_score.push(secondsLeft);
                score_names.push(initials[i]);
                score_score.push(init_scores[i]);
                high_score_position = i;
            }
            else {
                score_names.push(initials[i]);
                score_score.push(init_scores[i]);
            }
        }
        if (inserted == false) {
            score_names.push(first_Name);
            score_score.push(secondsLeft);
            high_score_position = init_scores.length; 
        }
    }
    localStorage.setItem("initials", JSON.stringify(score_names));
    localStorage.setItem("scores", JSON.stringify(score_score));
}

function display_HighScores() {
    document.querySelector(".Question").textContent = "HIGH SCORES!";
    document.querySelector(".not_Hidden_List").remove();

    var initials = JSON.parse(localStorage.getItem("initials"));
    var init_scores = JSON.parse(localStorage.getItem("scores"));

    for (let i = 0; i < initials.length; i++) {
        if (i == high_score_position) {
            document.body.lastChild.appendChild(document.createElement("p"));
            document.body.lastChild.lastChild.textContent = initials[i] + " - - - " + init_scores[i];
            document.body.lastChild.lastChild.setAttribute("id", "your_Score");
        }
        else {
        document.body.lastChild.appendChild(document.createElement("p"));
        document.body.lastChild.lastChild.textContent = initials[i] + " - - - " + init_scores[i];
        }
    }
    document.querySelector(".not_Hidden_Main").appendChild(document.createElement("button"));
    document.querySelector(".not_Hidden_Main").lastChild.setAttribute("id", "replay_Game");
    document.querySelector(".not_Hidden_Main").lastChild.textContent = "Play Again!!";
    document.querySelector("#replay_Game").addEventListener("click", reload_Me);
}

function reload_Me() {
    location.reload();
}

function Timer() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      
    //   if (document.querySelector(".not_Hidden_Score")!= null) {
         document.querySelector(".not_Hidden_Score").textContent = Math.floor(secondsLeft/10) + " seconds left on the quiz.";
    //   }

      if(secondsLeft <= 0) {
        // Stops the timer at 0 or less seconds
        // For scoring, set text of secondsLeft to Timed Out
        secondsLeft = "Timed Out!";
        clearInterval(timerInterval);
        if (quiz_End == false) {
            end_Of_Quiz();
        }
      }
    }, 100);
  }