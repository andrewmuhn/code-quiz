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
//  --when an answer is selected it is compared to answer key
//  --when an answer is selected the next question and answers are displayed
//  --when an answer is selected 'Wrong!' or 'Right!' is displayed underneath
//  --when that last question is answered the quiz ends and asks for initials to be entered to tie to highscore
//  -when view high score is clicked
//  --then stored 



//object containing questions and answers
let quizObject = {
  questions:
    ['Common used data types DO NOT include:',
      'Arrays in JavaScript can be used to store _______.',
      'Which of the following is used to compare a statement meets one OR the other conditional?',
      'Which of the following use arrow function notation',
      'How do you use JavaScript in an html file?'],
  qAnswer1:
    ['Strings', 'Primitive data types',
      '||',
      'name = {function statements}',
      'Enclose js in the <script></script> tag in the section it is being used'],
  qAnswer2:
    ['Booleans',
      'Objects',
      '===',
      'const name = function (parameters) = {function statements}',
      'Link to the js file or directly include js at the bottom of the body enclosed by the <script></script> tag'],
  qAnswer3:
    ['Alerts',
      'Other Arrays',
      '&&',
      'function name(parameters) = {function statements}',
      'Link to the js file in the head enclosed by <script></script> tag'],
  qAnswer4:
    ['Numbers',
      'All of the above',
      'OR',
      '(parameters) => {function statements}',
      'Nothing, js files just need to be placed in your assets folder in your file tree and your index file automatically links to them'],
  correctAnswers: [3, 4, 1, 4, 2]
};

//variables
let timeLeft;
let quizFinish = false;
let questionsCorrect = 0;
let questionsWrong = 0;
let numOfQuestions = quizObject.questions.length;
let existingScores = JSON.parse(localStorage.getItem('scores'));
let finalScore;

let highScores = [];

// get elements from html doc
let timerEL = document.querySelector('#countdown');
let viewScores = document.querySelector('#scores');
let quizContainer = document.querySelector('#quiz-container');
let question = document.querySelector('#questions');
let description = document.querySelector('#description');
let start = document.querySelector('#start');

//create new elements to be appended
//question elements
const answersEl = document.createElement('ol');
const answer1 = document.createElement('li');
const answer2 = document.createElement('li');
const answer3 = document.createElement('li');
const answer4 = document.createElement('li');
const response = document.createElement('p');
//enter results elements
const resultsForm = document.createElement('form');
const initials = document.createElement('input');
const submit = document.createElement('input');
const label = document.createElement('p');
//highscores elements
const scoresList = document.createElement('p');
const goBack = document.createElement('input');
const clearScores = document.createElement('input');

//add id attributes to li elements
answer1.id = '1';
answer2.id = '2';
answer3.id = '3';
answer4.id = '4';

//add classes for specifc styling
response.setAttribute('class', 'response');

//add input attributs to input elements
initials.setAttribute('type', 'text');
submit.setAttribute('type', 'submit');
goBack.setAttribute('type', 'button');
goBack.setAttribute('value', 'Go Back');
clearScores.setAttribute('type', 'button');
clearScores.setAttribute('value', 'Clear Scores');

//starts initial program
const quiz = () => {
  //Don't display description and start button once quiz has begun
  emptyContainer(quizContainer);
  // start.setAttribute('style', 'display: none;');
  // description.setAttribute('style', 'display: none;');

  let state = quizContainer.getAttribute('data-state');
  state = parseInt(state);
  if (state === 0) {

    //changes title to first question
    question.textContent = quizObject.questions[0];

    //Add on answer elements
    quizContainer.appendChild(answersEl);
    answersEl.appendChild(answer1);
    answersEl.appendChild(answer2);
    answersEl.appendChild(answer3);
    answersEl.appendChild(answer4);



    //Add answer text to answer elements
    answer1.textContent = quizObject.qAnswer1[0];
    answer2.textContent = quizObject.qAnswer2[0];
    answer3.textContent = quizObject.qAnswer3[0];
    answer4.textContent = quizObject.qAnswer4[0];
  }
  timer();
}

// starts 75 second timer
const timer = () => {
  timeLeft = 75;
  let timeInterval = setInterval(() => {
    timerEL.textContent = `Time: ${timeLeft}`
    timeLeft--;

    //if win condition quizFinish is truthy and the time hasn't run out then stop the timer
    if (timeLeft >= 0) {
      if (timeLeft > 0 && quizFinish) {
        clearInterval(timeInterval);
      }
    }

    //if time reaches zero stop the timer and end the quiz.
    if (timeLeft === 0) {
      timerEL.textContent = `Time:  `
      clearInterval(timeInterval);
      //calls function that ends quiz
      enterResults();
    }
  }, 1000);
}

//function listens for clicks on li inside of the answers ol and indexes the state by one
answersEl.addEventListener('click', (event) => {
  event.stopPropagation();
  let element = event.target;
  let elementId = event.target.id;

  if (element.matches('li')) {

    //runs function comparing selected answer to answer key
    checkAnswer(elementId);

    if (quizContainer.getAttribute('data-state') < quizObject.questions.length - 1) {
      quizContainer.dataset.state++
      nextQuestion(quizContainer.getAttribute('data-state'));
    } else {
      enterResults();
    }
  }
})

//compares the users selected answer against the answer key stored in quizObject.
const checkAnswer = (userSelection) => {
  userSelection = parseInt(userSelection);

  //testing if the users selected answer matches the answer key
  if (userSelection === quizObject.correctAnswers[quizContainer.getAttribute('data-state')]) {
    questionsCorrect++;
    quizContainer.appendChild(response);
    response.textContent = 'Correct!'


  } else {
    questionsWrong++;
    timeLeft = timeLeft - 10;
    quizContainer.appendChild(response);
    response.textContent = 'Wrong!'
  }
}

//indexes through the questions. it passes the data state as the variable.
const nextQuestion = (index) => {
  question.textContent = quizObject.questions[index];

  answer1.textContent = quizObject.qAnswer1[index];
  answer2.textContent = quizObject.qAnswer2[index];
  answer3.textContent = quizObject.qAnswer3[index];
  answer4.textContent = quizObject.qAnswer4[index];
}

//clears questions and prompts for your initials to attach to yout score
const enterResults = () => {
  quizFinish = true;
  finalScore = (questionsCorrect / numOfQuestions) * 100;
  question.textContent = 'All done!'
  emptyContainer(quizContainer);

  quizContainer.appendChild(resultsForm);
  resultsForm.appendChild(label);
  resultsForm.appendChild(initials);
  resultsForm.appendChild(submit);

  label.textContent = 'Enter Initials. Must be between 1 and 3 characters';
}

//pull existing scores from local storage appends new scores and then pushes the completed scores to local storage
const handleScores = (event) => {
  event.preventDefault();
  let initialText = initials.value.trim();
  initialText = initialText.toUpperCase();

  let player = {
    initials: initialText,
    score: finalScore,
    time: timeLeft,
  }

  if (initialText.length > 0 && initialText.length < 4) {

    //adds users score to handle scores variable
    highScores.push(player);

    //clears input field for next entry
    initials.value = "";

    existingScores = JSON.parse(localStorage.getItem('scores'));
    if (existingScores === null) {
      localStorage.setItem('scores', JSON.stringify(highScores));
    } else {
      let newHighScores = highScores.concat(existingScores);
      localStorage.setItem('scores', JSON.stringify(newHighScores));
    }

    //clears highScores variable so it's ready to recieve a new score next playthrough
    highScores = [];

    viewHighScores();
  }
}

//displays high scores
const viewHighScores = () => {
  question.textContent = "HighScores!"
  emptyContainer(quizContainer);
  existingScores = JSON.parse(localStorage.getItem('scores'));

  quizContainer.appendChild(scoresList);
  quizContainer.appendChild(goBack);
  quizContainer.appendChild(clearScores);


  let text = '';
  for (let i = 0; i < existingScores.length; i++) {

    text +=
      `Initials: ${existingScores[i].initials},  
    Score: ${existingScores[i].score}%,  
    Time: ${existingScores[i].time}<br>`;

  }
  scoresList.innerHTML = text;
}

//reverts quiz back to opening screen, does not clear scores from local storage
const resetQuiz = () => {
  question.textContent = "JavaScript Code Quiz"

  emptyContainer(quizContainer);



  quizContainer.appendChild(description);
  quizContainer.appendChild(start);
  start.setAttribute('style', 'display: block;');
  description.setAttribute('style', 'display: block;');

  quizContainer.setAttribute('data-state', '0');
  quizFinish = false;
  questionsCorrect = 0;
  questionsWrong = 0;

}

//function that gets called to repeatedly empty the quizcontainer
const emptyContainer = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

start.addEventListener('click', quiz);
resultsForm.addEventListener('click', handleScores);
goBack.addEventListener('click', resetQuiz);
viewScores.addEventListener('click', viewHighScores);

//clears scores from local storage and the viewHighScores page
clearScores.addEventListener('click', () => {
  scoresList.innerHTML = '';
  localStorage.removeItem('scores');
  highScores = [];
})