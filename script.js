// Array of quiz questions, each with text and an array of answers
const questions = [
  {
    question: "Which keyword is used to define a constant in Javascript ?",
    answers: [
      { text: "contant", correct: false },
      { text: "const", correct: true },
      { text: "let", correct: false },
      { text: "var", correct: false },
    ],
  },
  {
    question: "What does === operator do in javascript ?",
    answers: [
      { text: "Compare only values", correct: false },
      { text: "Compares values and types", correct: true },
      { text: "Assign values", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "Which of these is a Javascript data type ?",
    answers: [
      { text: "float", correct: false },
      { text: "Character", correct: false },
      { text: "Symbol", correct: true },
      { text: "Double", correct: false },
    ],
  },
  {
    question: "What does NaN stand for in Javascript ?",
    answers: [
      { text: "Not a Name", correct: false },
      { text: "No a Number", correct: false },
      { text: "Not a Number", correct: true },
      { text: "Null and None", correct: false },
    ],
  },
  {
    question: "console.log(2 + '2') ?",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: true },
      { text: "NaN", correct: false },
      { text: "undefined", correct: false },
    ],
  },
];

// DOM element references
const questionElement = document.getElementById('question');       // The <h2> where question will be shown
const answerButton = document.getElementById('answer-buttons');    // The container for answer buttons
const nextButton = document.getElementById('next-btn');            // The "Next" button

let currentQuestionIndex = 0;  // Keeps track of the current question number
let score = 0;                 // Keeps track of the user's score

// Starts or restarts the quiz
function startQuiz() {
  currentQuestionIndex = 0;     // Reset question index
  score = 0;                    // Reset score
  nextButton.innerHTML = "Next";
  showQuestion();               // Load the first question
}

// Displays the current question and its answer options
function showQuestion() {
  resetState();                                      // Clear previous answers
  let currentQuestion = questions[currentQuestionIndex]; // Get current question object
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Create and display answer buttons
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    // Mark the correct answer
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    // Add event listener to handle user selection
    button.addEventListener("click", selectAnswer);
    answerButton.appendChild(button);
  });
}

// Resets the answer buttons and hides the "Next" button
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

// Handles user answer selection
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  // Mark the selected answer
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;  // Increase score for correct answer
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Show correct answer for all buttons
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // Disable all buttons after selection
  });

  nextButton.style.display = "block"; // Show the "Next" button
}

// Handles "Next" button click to show next question or final score
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++; // Move to next question
    showQuestion();
  } else {
    showScore(); // Show final score
  }
});

// Displays the user's final score and option to restart
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// Call this when the page loads to start the quiz
startQuiz();
