function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function Quiz(questions){
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function(){
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer){
  if(this.getQuestionIndex().isCorrectAnswer(answer)){
    this.score++;
  }
  this.questionIndex++;
}

Quiz.prototype.isEnded = function(){
  return this.questionIndex === this.questions.length;
}

function populate(){
  if(quiz.isEnded()){
    showScores();
  }
  else{
    // show question;
    var element = document.getElementById('question');
    element.innerHTML = quiz.getQuestionIndex().text;

    //show choices
    var choices = quiz.getQuestionIndex().choices;
    for(let i = 0; i < choices.length; i++){
      let element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
};

function guess(id, guess){
  let button = document.getElementById(id);
  button.onclick = function(){
    quiz.guess(guess);
    populate();
  }
}

function showProgress(){
  let currentQNo = quiz.questionIndex + 1;
  let element = document.getElementById('progress');
  element.innerHTML = "Question " + currentQNo + " of " + quiz.questions.length;
}

function showScores(){
  let gameOverHtml = "<h1>Result</h1>";
  gameOverHtml += "<h2 id='score'> Your Score: " + quiz.score + "</h2>";
  let element = document.getElementById('quiz');
  element.innerHTML = gameOverHtml;
}

var questions = [
  new Question("Which one is not an object oriented programming language?", ["Java", "C#", "C++", "C"], "C"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("There are ___ main components of Object-Oriented Programming.", ["1", "6", "2", "4"], "4"),
  new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
  new Question("MVC is ___.", ["Language", "Library", "Framework", "All"], "Framework"),
  new Question("Inside which element do we put javascript?", ["js tag", "javascript tag", "script tag", "scripting tag"], "script tag"),
  new Question("Which of the following is not a property of window object?", ["document", "history", "menu", "navigator"], "menu"),
  new Question("What statement supplies the value of the function?", ["cancel", "return", "valueOf", "continue"], "return"),
  new Question("If var x, y = 2; console.log( x + y ); then what will be printed in console?", ["2", "4", "Nan", "undefined"], "NaN"),
  new Question("If y=21, then what should be the typeof y?", ["Number", "String", "Character", "Function"], "Number")
];

var quiz = new Quiz(questions);

populate();
