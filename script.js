// Questions and Answers Data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Rome", "Berlin"],
    correct: ["Paris"],
  },
  {
    question: "Which languages are used for web development?",
    choices: ["Python", "HTML", "Java", "CSS"],
    correct: ["HTML", "CSS"],
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: ["Jupiter"],
  },
  {
    question: "Which of the following are programming languages?",
    choices: ["HTML", "Python", "C++", "SQL"],
    correct: ["Python", "C++", "SQL"],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    choices: ["Harper Lee", "Jane Austen", "Mark Twain", "Ernest Hemingway"],
    correct: ["Harper Lee"],
  },
  {
    question: "Which elements are noble gases?",
    choices: ["Helium", "Oxygen", "Nitrogen", "Argon"],
    correct: ["Helium", "Argon"],
  },
  {
    question: "What is the square root of 64?",
    choices: ["6", "7", "8", "9"],
    correct: ["8"],
  },
  {
    question: "Which countries are in the United Kingdom?",
    choices: ["Scotland", "Ireland", "Wales", "England"],
    correct: ["Scotland", "Wales", "England"],
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Mercury", "Venus", "Earth", "Mars"],
    correct: ["Mars"],
  },
  {
    question: "Who is known as the father of computer science?",
    choices: ["Albert Einstein", "Isaac Newton", "Alan Turing", "Nikola Tesla"],
    correct: ["Alan Turing"],
  },
];

// Selections
const startQuizBtn = document.getElementById("start-quiz");
const submitQuizBtn = document.getElementById("submit-quiz");
const userInfoDiv = document.getElementById("user-info");
const quizContainer = document.getElementById("quiz-container");
const quizForm = document.getElementById("quiz-form");
const resultDiv = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const userDetails = document.getElementById("user-details");
const answersReview = document.getElementById("answers-review");

// Function to start the quiz
startQuizBtn.addEventListener("click", () => {
  const userName = document.getElementById("name").value.trim();
  const userId = document.getElementById("id").value.trim();
  if (userName === "" || userId === "") {
    alert("Please enter both Name and ID to start the quiz.");
    return;
  }
  userInfoDiv.style.display = "none";
  quizContainer.style.display = "block";
  generateQuiz();
});

function generateQuiz() {
  questions.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("form-group");

    const questionTitle = document.createElement("h4");
    questionTitle.innerText = `${index + 1}. ${item.question}`;
    questionDiv.appendChild(questionTitle);

    item.choices.forEach((choice) => {
      const choiceLabel = document.createElement("label");
      choiceLabel.classList.add("d-block");

      const choiceInput = document.createElement("input");
      choiceInput.type = item.correct.length > 1 ? "checkbox" : "radio";
      choiceInput.name = `question-${index}`;
      choiceInput.value = choice;
      choiceInput.classList.add("mr-2");

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(choiceLabel);
    });

    quizForm.appendChild(questionDiv);
  });
}

submitQuizBtn.addEventListener("click", () => {
  const userName = document.getElementById("name").value.trim();
  const userId = document.getElementById("id").value.trim();
  let score = 0;
  answersReview.innerHTML = "";

  questions.forEach((item, index) => {
    const selectedChoices = Array.from(
      document.getElementsByName(`question-${index}`)
    )
      .filter((input) => input.checked)
      .map((input) => input.value);

    const isCorrect =
      JSON.stringify(selectedChoices.sort()) ===
      JSON.stringify(item.correct.sort());
    if (isCorrect) {
      score++;
    }

    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("mb-3", "p-3", "border", "rounded");

    // Question
    const questionTitle = document.createElement("h5");
    questionTitle.innerText = `${index + 1}. ${item.question}`;
    reviewDiv.appendChild(questionTitle);

    // User's Answer
    const userAnswer = document.createElement("p");
    userAnswer.innerHTML = `<strong>Your Answer:</strong> ${
      selectedChoices.length ? selectedChoices.join(", ") : "No Answer"
    }`;
    userAnswer.classList.add(isCorrect ? "text-success" : "text-danger");
    reviewDiv.appendChild(userAnswer);

    // Correct Answer
    const correctAnswer = document.createElement("p");
    correctAnswer.innerHTML = `<strong>Correct Answer:</strong> ${item.correct.join(
      ", "
    )}`;
    correctAnswer.classList.add("text-primary");
    reviewDiv.appendChild(correctAnswer);

    answersReview.appendChild(reviewDiv);
  });

  quizContainer.style.display = "none";
  resultDiv.style.display = "block";
  scoreDisplay.innerText = `Your Score: ${score} out of ${questions.length}`;
  userDetails.innerText = `Name: ${userName}, ID: ${userId}`;
});
