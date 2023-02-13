// ! Psuedo Code:
// create a starter HTML page  
//  -should include link to view high scores
//  -should have a timer that begins when start button is pressed
//  -should have a quiz title and description
//  -should have a button that starts the quiz
// When button is pressed a function should execute that:
//  -begins timer countdown from 75seconds
//  --if timer reaches zero before user finishes quiz then end quiz
//  -title and description are replaced by multiple choice question
//  --when an answer is selected the next question and answers are displayed
//  --when an answer is selected 'Wrong!' or 'Right!' is displayed underneath
//  --when that last question is answered the quiz ends and asks for initials to be entered to tie to highscore

let quizObject = {
  questions: ['question 1', 'question 2', 'question 3', 'question 4'],
  q1Answers: ['q1 a1', 'q1 a2', 'q1 a3', 'q1 a4'],
  q2Answers: ['q2 a1', 'q2 a2', 'q2 a3', 'q2 a4'],
  q3Answers: ['q3 a1', 'q3 a2', 'q3 a3', 'q3 a4'],
  q4Answers: ['q4 a1', 'q4 a2', 'q4 a3', 'q4 a4'],
};



// get elements from html doc
let timerEL = document.querySelector('#countdown');
let scores = document.querySelector('#scores');
let quizContainer = document.querySelector('#container');
let question = document.querySelector('#questions');
let description = document.querySelector('#description');
let start = document.querySelector('#start');

//create new elements to be appended
let answersEl = document.createElement('ol');
let answer1 = document.createElement('li');
let answer2 = document.createElement('li');
let answer3 = document.createElement('li');
let answer4 = document.createElement('li');


let quiz = () => {
  //Don't display description and start button once quiz has begun
  start.setAttribute('style', 'display: none;');
  description.setAttribute('style', 'display: none;');

  let state = quizContainer.getAttribute('data-state');
  state = parseInt(state);
  console.log(state);
  if (state === 0) {
    quizContainer.dataset.state++
    console.log(quizContainer.getAttribute('data-state'));

    //changes title to first question
    question.textContent = quizObject.questions[0];

    //Add on answer elements
    quizContainer.appendChild(answersEl);
    answersEl.appendChild(answer1);
    answersEl.appendChild(answer2);
    answersEl.appendChild(answer3);
    answersEl.appendChild(answer4);


    //Add answer text to answer elements
    answer1.textContent = quizObject.q1Answers[0];
    answer2.textContent = quizObject.q1Answers[1];
    answer3.textContent = quizObject.q1Answers[2];
    answer4.textContent = quizObject.q1Answers[3];

  }

  //function listens for clicks on li inside of the answers ol and indexes the state by one
  answersEl.addEventListener('click', function (event) {
    let element = event.target;

    if (element.matches('li')) {
      quizContainer.dataset.state++
      console.log(quizContainer.getAttribute('data-state'));
    }
  })



  let timer = () => {
    let timeLeft = 75;

    let timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEL.textContent = `Time: ${timeLeft}`
        timeLeft--;
      } else {
        timerEL.textContent = `Time:  `
        clearInterval(timeInterval);
        //TODO: call function that ends quiz
      }
    }, 1000);
  }
  timer();
}

start.addEventListener('click', quiz);