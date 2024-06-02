const questions = [
    {
        question: "Що таке HTML?",
        answers: [
            { text: "Графічний дизайн веб-сторінок", correct: false },
            { text: "Мова розмітки для створення веб-сторінок", correct: true },
            { text: "Мова програмування для серверної розробки", correct: false },
            { text: "База даних для веб-сайтів", correct: false }
        ]
    },
    {
        question: "Які три основні мови для Front-End розробки?",
        answers: [
            { text: "HTML, CSS, JavaScript", correct: true },
            { text: "Python, Java, C++", correct: false },
            { text: "PHP, Ruby, SQL", correct: false },
            { text: "JSON, XML, AJAX", correct: false }
        ]
    },

    {
        question: "Яка мова використовується для стилізації веб-сторінок?",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "Який елемент в HTML використовується для створення посилань (посилань)?",
        answers: [
            { text: "link", correct: false },
            { text: "a", correct: true },
            { text: "href", correct: false },
            { text: "url", correct: false }
        ]
    },

    {
        question: "Які основні типи CSS селекторів?",
        answers: [
            { text: "Class, ID, Tag", correct: true },
            { text: "Element, Attribute, Value", correct: false },
            { text: "Function, Object, Method", correct: false },
            { text: "HTML, CSS, JavaScript", correct: false }
        ]
    },

    {
        question: "Як визначити зовнішній стиль (external CSS) у HTML документі?",
        answers: [
            { text: "Використовувати стиль вкладення (inline style)", correct: false },
            { text: "Використовувати style елемент всередині head тега", correct: false },
            { text: "Використовувати script тег", correct: false },
            { text: "Використовувати link тег з атрибутом rel=\"stylesheet\"", correct: true }
        ]
    },

    {
        question: "Яка функція JavaScript використовується для виведення інформації в консоль браузера для відладки?",
        answers: [
            { text: "print()", correct: false },
            { text: "log()", correct: true },
            { text: "display()", correct: false },
            { text: "show()", correct: false }
        ]
    },

    {
        question: "Що таке \"респонсивний вебдизайн\" (responsive web design)?",
        answers: [
            { text: "Вебдизайн, який використовує ресурси з інших веб-сайтів", correct: false },
            { text: "Вебдизайн, який автоматично пристосовується до різних розмірів екранів і пристроїв", correct: true },
            { text: "Вебдизайн, який використовує анімацію та відео", correct: false },
            { text: "Вебдизайн, який використовує тільки текст та зображення", correct: false }
        ]
    },

    {
        question: "Яке ключове слово використовується для підключення зовнішнього JavaScript файлу у HTML документі?",
        answers: [
            { text: "include", correct: false },
            { text: "require", correct: false },
            { text: "script", correct: true },
            { text: "link", correct: false }
        ]
    },


];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex, shuffledQuestions;
let correctAnswersCount;

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    nextButton.innerText = 'Наступне питання';
    nextButton.classList.add('hidden');
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        correctAnswersCount++;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hidden');
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultElement.innerText = `Ваш результат: ${correctAnswersCount} з ${questions.length}`;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

restartButton.addEventListener('click', startQuiz);

startQuiz();