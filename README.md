# Code Quiz (Javascript Questions)
## Vladimir Berka's Homework #4, Code quiz

## Assignment Description
This is a CSS/HTML/javascript homework assignment for the UW Bootcamp. The goal of the assignment is to create a single web page application in the format of a quiz that asks the user for various sources of input. HTML, CSS, and Javascript files were written from scratch. Highscores are recorded and stored in `localStorage`. A mockup is provided by the instructor to demonstrate desired application functionality.

The original user story, acceptance criteria, and mockup for the assignment is copied to the end of this document.

## Assignment Scope
Create a single web application that quizzes the user for multiple javascript related questions. Styles and HTML layout should be considered.

No starting code has been provided.

## Generalized Tasks
- Create up an HTML file with the appropriate elements and tags to be modified using Javascript
- Use `Buttons` and `listenerEvents` to add web app functionality and responsiveness
- Create a CSS file with numerous selectors to handle evolving HTML elements in a single web application setting
- Write a javascript file with multiple functions to handle quiz operations  
- Store highscore data in `localStorage`

## Summary of Work Completed
A wireframe of the web app was sketched out physically on paper to indicate the desired box layout, appearance, and generalized HTML tag schema. Javascript functions were written to create, delete, and modify the original HTML elements as loaded into the DOM. The original header introducing the quiz was deleted using `remove()` with the remaining elements modified using `.textContent` to introduce the questions and list of answers. HTML element appearance was modified using `.setAttribute` to change classes as the appearance of HTML elements changed by using pre-declared CSS selectors. Scores were tracked using a global variable that was then stored in `localStorage`. The highscores were sorted with every run; as the current score would be inserted into the high scores in descending order, and then `setItem` back up to `localStorage`. 

Generally speaking, the assignment leaned heavily on the use of `listenerEvents` and `event.target` attributes to cycle through questions and determine correct answers. 

## List of Files
* README.md - This current read me file
* index.html - HTML file for the initial website, provided and not 
* ~./assets/style.css - CSS files for the above noted website in the css subdirectory of the assets directory
* ~./assets/javascript.js - Javascript file containing the password algorithm
* ~./assets/images/04-web-apis-homework-demo.gif - A GIF file demonstrating desired functionality provided by the instructor
* ~./assets/images/VMB_CodeQuizSS1, SS2, SS3 - PNG files of the quiz web application screenshots

# Original Homework Assignment Details

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## URL to the deployed webpage

[GitHub Pages Link: https://vlad-berka.github.io/Code_Quiz/](https://vlad-berka.github.io/Code_Quiz/)

## Screenshot of the Quiz Start

![Vladimir Berka's Code Quiz Screenshots](./assets/images/VMB_CodeQuiz_SS1.png "Portfolio Screenshot, Mobile Web View")

## Screenshot of Some Quiz Functionality

![Vladimir Berka's Code Quiz Screenshots](./assets/images/VMB_CodeQuiz_SS2.png "Portfolio Screenshot, Mobile Web View")

## Screenshot of the Quiz High Score Page

![Vladimir Berka's Code Quiz Screenshots](./assets/images/VMB_CodeQuiz_SS3.png "Portfolio Screenshot, Mobile Web View")

## Instructor Provided Mock-Up

The following instructor provided animation demonstrates the desired application functionality:

![A user clicks through an interactive coding quiz, then enters initials to save the high score before resetting and starting over.](./assets/images/04-web-apis-homework-demo.gif)

## License
MIT License

Copyright (c) [2022] [Vladimir Berka]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.