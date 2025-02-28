const API_ENDPOINT = "https://the-trivia-api.com/v2/questions";
const nextBtn = document.querySelector(".next-btn");
const question = document.querySelector(".question");
const questionsOptions = document.querySelectorAll(".option-container div");
const score = document.querySelector(".score");
const questionCnt = document.querySelector(".question-cnt");
const quizResult = document.querySelector(".quiz-result");
const quiz = document.querySelector(".quiz");
const startQuiz = document.querySelector(".start-quiz");
const startQuizbtn = document.querySelector(".start-quiz-btn");
const continueQuiz = document.querySelector(".continue-quiz");
const quizSection = document.querySelector(".quiz-section");
const exitQuiz = document.querySelector(".exit-quiz");
const userScoresec = document.querySelector(".userscore-section");
const resultPercantage = document.querySelector(".result-percentage");
let userScore = 0;

startQuizbtn.addEventListener("click", () => {
  startQuiz.style.display = "flex";
});

exitQuiz.addEventListener("click", () => {
  startQuiz.style.display = "none";
});

continueQuiz.addEventListener("click", () => {
  startQuiz.style.display = "none";
  quizSection.style.transform = "translateX(0px)";
});

const generateQuestion = async () => {
  const question = await fetch(API_ENDPOINT);
  const parsedquestion = await question.json();
  return parsedquestion;
};

const startGame = async () => {
  const allQuestions = await generateQuestion();
  let i = 0;
  setQuestion(allQuestions[0]);
  questionCnt.textContent = `${i + 1} of 5 question`;
  nextBtn.addEventListener("click", () => {
    if (i + 1 < 5) {
      questionCnt.textContent = `${i + 1} of 5 question`;
      setQuestion(allQuestions[i + 1]);
    } else {
      quiz.style.display = "none";
      quizResult.style.display = "block";
      score.textContent = `Your Score ${userScore} of 5`;
      resultPercantage.textContent = `${userScore * 20}%`;
    }
    i++;
  });
};

const shuffleOptions = (options) => {
  for (let i = options.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [options[i], options[randomIndex]] = [options[randomIndex], options[i]];
  }
  return options;
};

const setQuestion = (fullQuestion, answers, questionIdx) => {
  setDefault();
  question.textContent = fullQuestion.question.text;
  const options = shuffleOptions([
    ...fullQuestion.incorrectAnswers,
    fullQuestion.correctAnswer,
  ]);
  questionsOptions.forEach((option, idx) => {
    const optionDiv = questionsOptions[idx];
    const optionP = optionDiv.querySelector("p");
    if (optionP) {
      optionP.textContent = options[idx];
    }
  });
  const correctAnswer = fullQuestion.correctAnswer;
  questionsOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.querySelector("p").textContent;
      nextBtn.style.background = "#8e007c";
      if (correctAnswer == value) {
        option.style.border = "2px solid green";
        option.style.background = "green";
        userScore++;
      } else {
        option.style.border = "2px solid red";
        option.style.background = "red";
        questionsOptions.forEach((option) => {
          const optionP = option.querySelector("p").textContent;
          if (optionP == correctAnswer) {
            option.style.border = "2px solid green";
            option.style.background = "green";
          }
        });
      }
      userScoresec.textContent = `Score ${userScore}/5`;
    });
  });
};

startGame();

function setDefault() {
  questionsOptions.forEach((option) => {
    option.style.border = "3px solid grey";
    option.style.background = "transparent";
  });
}
