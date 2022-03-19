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

// Counter for tracking the current question number
var question_count = 0;
// Counter for tracking the number of questions answered correctly
var correct_Count = 0;
// Counter for number of seconds remaining on the quiz
var secondsLeft = 0;
// Index counter used during the sorting process of High Scores
var high_score_position = 0;
//Initializes an array that stores user input: another way to verify right answers relative to the answer_key array
var scantron = [];
// Initializing the number of seconds the quiz will run
var secondsLeft = 910; //note, in deci-seconds, not mili seconds
// Additional boolean variable to prevent timer bugs when finishing the quiz
var quiz_End = false;

// Adds a listener event to the only button currently present in the HTML
document.querySelector("#begin_button").addEventListener("click", Begin);

// Main function that initializes the quiz
function Begin() {
    // Removes the upper header from the Original HTML that introduced the quiz
    document.querySelector(".start_Header").remove();
    // Setting some elements in HTML to be visible
    document.querySelector(".hidden_Main").setAttribute("class", "not_Hidden_Main");
    document.querySelector(".hidden_List").setAttribute("class", "not_Hidden_List");
    document.querySelector(".hidden_Score").setAttribute("class", "not_Hidden_Score");

    // Initializes the first set of answers and question into HTML content
    document.querySelector(".Question").textContent = list_of_Questions[0];
    document.querySelector("#Answer1").textContent = list_of_Questions[1];
    document.querySelector("#Answer2").textContent = list_of_Questions[2];
    document.querySelector("#Answer3").textContent = list_of_Questions[3];
    document.querySelector("#Answer4").textContent = list_of_Questions[4];

    // Adds listener events to each list item
    document.querySelector("#Answer1").addEventListener("click", check_Answer);
    document.querySelector("#Answer2").addEventListener("click", check_Answer);
    document.querySelector("#Answer3").addEventListener("click", check_Answer);
    document.querySelector("#Answer4").addEventListener("click", check_Answer);

    // Starts the timer for the quiz
    Timer();

    // Reset question count and score count in case the user clicks where the buttons are, as they are hidden
    question_count = 0;
}

// Function that checks whether the clicked list item was correct relative to the answer_key
function check_Answer() {
    // Gets the ID of the list item to use for comparison
    var answer = event.target.getAttribute("id");
    // Making a variable that tracks the incorrect list item to change color
    var id_El = answer;

    // This series of if statements translates the ID into an index number
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

    // This if statement checks if the clicked list item is correct
    if (answer == answer_key[question_count])
    {
        // Answer IS correct
        console.log("You're correct! Answered: " +answer+ " and the correct answer was: " +answer_key[question_count]);
        correct_Count++;
        // Function to go to the next question, in the if statement so it only goes to the next question if correct
        change_Question();
    } else {
        // Answer NOT correct
        console.log("You're WRONG! Answered: " +answer+ " and the correct answer was: " +answer_key[question_count]);
        // Changes the background color of the list item if it is incorrect (as a hint to the tester)
        document.querySelector("#"+id_El).setAttribute("style", "background-color: red;");
        secondsLeft -= 100; // subtracting 100 miliseconds since our timer runs on decisecond scale
        answer = false;
    }
}

// Function that loads the next question onto re-usable HTML elements 
function change_Question() {
    // Increase the counter to go to the next question
    question_count++;
    
    // Checks to see if we have gone through all possible questions
    if (question_count > answer_key.length-1) {
        // Calls the function to end the quiz
        end_Of_Quiz();
        question_count = 0;
        return; //end the quiz
    } else {    
        // Question AND answer array is in blocks of 5: 1 question, 4 answers
        var array_pos = question_count*5;
        // Changes the text on page to the next question
        document.querySelector(".Question").textContent = list_of_Questions[array_pos];
        // Clears the superimposed style for incorrect answer choices on the list item... and so on
        document.querySelector("#Answer1").setAttribute("style", "");
        // Changes the text on page to the next first answer... and so on
        document.querySelector("#Answer1").textContent = list_of_Questions[(array_pos+1)];
        document.querySelector("#Answer2").setAttribute("style", "");
        document.querySelector("#Answer2").textContent = list_of_Questions[array_pos+2];
        document.querySelector("#Answer3").setAttribute("style", "");
        document.querySelector("#Answer3").textContent = list_of_Questions[array_pos+3];
        document.querySelector("#Answer4").setAttribute("style", "");
        document.querySelector("#Answer4").textContent = list_of_Questions[array_pos+4];
    }
}

// Function that clears the screen and starts the end of quiz process
function end_Of_Quiz() {
    // Changing the quiz status to ended, prevents timer bugs
    quiz_End = true;

    console.log(secondsLeft);

    // This if statement filters out time in case the user ran out of time
    if(secondsLeft==0){
        var first_Name = prompt(("You've run out of time!"), "Enter your name here for high scores!");
    } else {
        var first_Name = prompt(("You've ended the quiz with " + Math.floor(secondsLeft/10) + " seconds remaining!"), "Enter your name here for high scores!");
    }

    // Sets up the high score HTML elements
    document.body.appendChild(document.createElement("section"));
    document.body.lastChild.setAttribute("id", "final_Screen");
    // document.body.lastChild.textContent = "Name - - - Score";

    document.body.lastChild.appendChild(document.createElement("h3"));
    document.body.lastChild.lastChild.textContent = "Name - - - Score";

    // Hides the timer at the top of the screen
    document.querySelector(".not_Hidden_Score").setAttribute("class", "hidden_Score");

    // Need to filter out the string score value instead of a number - math operation present to translate decisecond timer back to second timer
    write_HighScores (first_Name, Math.floor(secondsLeft/10));

    //Runs the Highscore function
    display_HighScores();
    // Changing the class of the main body for appearances in CSS
    document.querySelector(".not_Hidden_Main").setAttribute("class", "final_Screen_Header");
    // Padding / margin issue fixed by adding in another line
    document.body.lastChild.appendChild(document.createElement("br"));
}

// Function that saves the initials and score of the user into localStorage
function write_HighScores (first_Name, secondsLeft) {
    // Pulls the current initial array out of localStorage
    var initials = JSON.parse(localStorage.getItem("initials"));
    // Pulls the current score array out of localStorage
    var init_scores = JSON.parse(localStorage.getItem("scores"));

    // Initializing arrays that are used for sorting and inserting the high score 
    var score_names = [];
    var score_score = [];
    var inserted = false;

    // If we dont have anything in local storage, simply push the current initials and score
    if(initials == null) {
        score_names.push(first_Name);
        score_score.push(secondsLeft);
    }
    // If we do have stuff in storage, we need to insert our score as the array is in descending order as designed
    else {
        // Over the total number of entries in the high scores
        for (let i=0; i < init_scores.length; i++) {
            // If the current score is beating a score present in the high scores AND we haven't inserted our current score yet
            if (secondsLeft > init_scores[i] && inserted == false)
            {
                // Set the variable checking if we've inserted our current score to the opposite
                inserted = true;
                // Put our current initials into the intiials array before the previous initials
                score_names.push(first_Name);
                // Put our current score into the score array before the previous score
                score_score.push(secondsLeft);
                // Then put the previous initials into the array
                score_names.push(initials[i]);
                // Then put the previous score into the array
                score_score.push(init_scores[i]);
                // Tracker for indicating place on the high score list
                high_score_position = i;
            }
            else {
                // Just keep adding initials back into the initials array
                score_names.push(initials[i]);
                // Just keep adding scores back into the initials array
                score_score.push(init_scores[i]);
            }
        }
        // If we haven't inserted the score AND haven't beaten any previous scores, we are at the bottom. So our initials and score are added last
        if (inserted == false) {
            score_names.push(first_Name);
            score_score.push(secondsLeft);
            high_score_position = init_scores.length; 
        }
    }
    // Upload back into localStorage our sorted initials array with new initials added
    localStorage.setItem("initials", JSON.stringify(score_names));
    // Upload back into localStorage our sorted score array with new high score added
    localStorage.setItem("scores", JSON.stringify(score_score));
}

// Function that writes out the highscores onto the HTML elements
function display_HighScores() {
    // Sets the title on the HTML element
    document.querySelector(".Question").textContent = "HIGH SCORES!";
    // Deletes the list elements that were used to display answer choices
    document.querySelector(".not_Hidden_List").remove();

    // Pulls from localStorage our sorted initials array after we've called write_HighScores
    var initials = JSON.parse(localStorage.getItem("initials"));
    // Pulls from localStorage our sorted score array after we've called write_HighScores
    var init_scores = JSON.parse(localStorage.getItem("scores"));

    // For each entry in our highscores, we make p elements and write out the scores
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
    // Adds an HTML button element to re-start the quiz
    document.body.lastChild.appendChild(document.createElement("button"));
    // Adds an ID to the button for the listener element
    document.body.lastChild.lastChild.setAttribute("id", "replay_Game");
    // Adds text onto the button element
    document.querySelector("#replay_Game").textContent = "Play Again!!";
    // Adds the listener event onto the button to restart the game
    document.querySelector("#replay_Game").addEventListener("click", reload_Me);
}

// Because you apparently can't call location.reload() inside the listener event without automatically running it, we pull the function out
function reload_Me() {
    location.reload();
}

// Timer function that keeps track of seconds spent on the test
function Timer() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        // Each time the interval triggers, we subtract an interval amount
        secondsLeft--;
        // This updates the timer count at the top of the webpage
        document.querySelector(".not_Hidden_Score").textContent = Math.floor(secondsLeft/10) + " seconds left on the quiz.";

        // If statement filters if we've run out of time
        if(secondsLeft <= 0) {
            // Stops the timer at 0 or less seconds
            secondsLeft = 0;
            // Clears the interval to stop counting  time
            clearInterval(timerInterval);
            // Added tracking variable to prevent time counting down before high scores were written
            if (quiz_End == false) {
                end_Of_Quiz();
            }
        }
    }, 100); // NOTE: DECI-SECOND NOTATION, EVERY 1/10th OF A SECOND WE COUNT DOWN
}