const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "What does NFL stand for?",
     answers: [
      { text: "North Face Local", correct: false},
      { text: "National Football League", correct: true},
      { text: "Negative Feedback Language", correct: false},
      {text: "Not For Lease", correct: false}
    ]
  },
  {
    question: "Who has the record for most points in NBA history?",
     answers: [
      { text: "Michael Jordan", correct: false},
      { text: "Kareem Abdul-Jabar", correct: false},
      { text: "Lebron James", correct: true},
      { text: "Jerry West", correct: false}
    ]
  },
  {
    question: "How many points are touchdowns worth?",
     answers: [
      { text: "7", correct: false },
      { text: "6", correct: true },
      { text: "3", correct: false },
      { text: "1", correct: false }
    ]
  },
  {
    question: "Shohei Otani just signed with the Dodgers for... ?",
     answers: [
      { text: "50 million", correct: false },
      { text: "700 million", correct: true },
      { text: "350 million", correct: false},
      { text: "100 million", correct: false}
    ]
  },
    {
      question: "What is a full count in baseball?",
    answers: [
     { text: "3 balls, 3 strikes", correct: false},
     { text: "2 balls, 2 strikes", correct: false},
     { text: "4 balls", correct: false},
     { text: "3 balls, 2 strikes", correct: true}
    ]
  }

]