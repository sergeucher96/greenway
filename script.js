document.addEventListener('DOMContentLoaded', () => {
    // --- ИНИЦИАЛИЗАЦИЯ TELEGRAM WEB APP ---
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }

    // --- ЭЛЕМЕНТЫ DOM ---
    const screens = {
        welcome: document.getElementById('welcome-screen'),
        test: document.getElementById('test-screen'),
        results: document.getElementById('results-screen')
    };
    
    const startBtn = document.getElementById('start-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const backToMainBtn = document.getElementById('back-to-main-btn'); // <-- ИЗМЕНЕНИЕ
    const backQuestionBtn = document.getElementById('back-question-btn');
    const homeBtn = document.getElementById('home-btn');
    
    const modal = document.getElementById('modal-confirm');
    const modalBtnYes = document.getElementById('modal-btn-yes');
    const modalBtnNo = document.getElementById('modal-btn-no');
    
    const progressBar = document.getElementById('progress-bar');
    const questionContainer = document.getElementById('question-container');
    
    const overallScoreEl = document.getElementById('overall-score');
    const overallInterpretationEl = document.getElementById('overall-interpretation');
    const recommendationsEl = document.getElementById('recommendations');

    // --- ДАННЫЕ И СОСТОЯНИЕ ---
    let currentQuestionIndex = 0;
    let userAnswers = []; // Хранит объекты {text, value}

    // --- НАУЧНАЯ ОСНОВА: ТЕСТ GHQ-12 ---
    const questions = [
        { text: "Способны ли Вы были сосредоточиться на том, что Вы делаете?", options: [{ text: 'Больше, чем обычно', value: 0 }, { text: 'Так же, как обычно', value: 0 }, { text: 'Меньше, чем обычно', value: 1 }, { text: 'Значительно меньше', value: 1 }] },
        { text: "Теряли ли Вы сон из-за беспокойства?", options: [{ text: 'Совсем нет', value: 0 }, { text: 'Не больше, чем обычно', value: 0 }, { text: 'Больше, чем обычно', value: 1 }, { text: 'Значительно больше', value: 1 }] },
        { text: "Чувствовали ли Вы, что играете полезную роль в жизни?", options: [{ text: 'Больше, чем обычно', value: 0 }, { text: 'Так же, как обычно', value: 0 }, { text: 'Меньше, чем обычно', value: 1 }, { text: 'Значительно меньше', value: 1 }] },
        { text: "Чувствовали ли Вы себя способным принимать решения?", options: [{ text: 'Больше, чем обычно', value: 0 }, { text: 'Так же, как обычно', value: 0 }, { text: 'Меньше, чем обычно', value: 1 }, { text: 'Значительно меньше', value: 1 }] },
        { text: "Чувствовали ли Вы себя постоянно в напряжении или на грани?", options: [{ text: 'Совсем нет', value: 0 }, { text: 'Не больше, чем обычно', value: 0 }, { text: 'Больше, чем обычно', value: 1 }, { text: 'Значительно больше', value: 1 }] },
        { text: "Чувствовали ли Вы, что не можете преодолеть свои трудности?", options: [{ text: 'Совсем нет', value: 0 }, { text: 'Не больше, чем обычно', value: 0 }, { text: 'Больше, чем обычно', value: 1 }, { text: 'Значительно больше', value: 1 }] },
        { text: "Способны ли Вы были получать удовольствие от своей повседневной деятельности?", options: [{ text: 'Больше, чем обычно', value: 0 }, { text: 'Так же, как обычно', value: 0 }, { text: 'Меньше, чем обычно', value: 1 }, { text: 'Значительно меньше', value: 1 }] },
        { text: "Способны ли Вы были справляться со своими проблемами?", options: [{ text: 'Больше, чем обычно', value: 0 }, { text: 'Так же, как обычно', value: 0 }, { text: 'Меньше, чем обычно', value: 1 }, { text: 'Значительно меньше', value: 1 }] },
        { text: "Чувствовали ли Вы себя несчастным и подавленным?", options: [{ text: 'Совсем нет', value: 0 }, { text: 'Не больше, чем обычно', value: 0 }, { text: 'Больше, чем обычно', value: 1 }, { text: 'Значительно больше', value: 1 }] },
        { text: "Теряли ли Вы уверенность в себе?", options: [{ text: 'Совсем нет', value: 0 }, { text: 'Не больше, чем обычно', value: 0 }, { text: 'Больше, чем обычно', value: 1 }, { text: 'Значительно больше', value: 1 }] },
        { text: "Считали ли Вы себя никчемным человеком?", options: [{ text: 'Совсем нет', value: 0 }, { text: 'Не больше, чем обычно', value: 0 }, { text: 'Больше, чем обычно', value: 1 }, { text: 'Значительно больше', value: 1 }] },
        { text: "Чувствовали ли Вы себя в целом достаточно счастливым, учитывая все обстоятельства?", options: [{ text: 'Больше, чем обычно', value: 0 }, { text: 'Так же, как обычно', value: 0 }, { text: 'Меньше, чем обычно', value: 1 }, { text: 'Значительно меньше', value: 1 }] }
    ];

    // --- ФУНКЦИИ ---

    function showScreen(screenKey) {
        for (const key in screens) {
            screens[key].classList.remove('active');
        }
        screens[screenKey].classList.add('active');
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            const progress = (currentQuestionIndex / questions.length) * 100;

            let optionsHTML = '<ul class="answer-options">';
            question.options.forEach((option, index) => {
                optionsHTML += `<li>${option.text}</li>`;
            });
            optionsHTML += '</ul>';

            questionContainer.innerHTML = `
                <p class="test-intro">Вопрос ${currentQuestionIndex + 1} из ${questions.length}.<br>Как вы себя чувствовали <strong>в последние несколько недель</strong>?</p>
                <h4>${question.text}</h4>
                ${optionsHTML}
            `;
            
            progressBar.style.width = `${progress}%`;
            backQuestionBtn.style.display = currentQuestionIndex > 0 ? 'flex' : 'none';

            const optionElements = questionContainer.querySelectorAll('.answer-options li');
            optionElements.forEach(el => {
                el.addEventListener('click', () => {
                    optionElements.forEach(opt => opt.classList.remove('selected'));
                    el.classList.add('selected');
                    nextQuestionBtn.disabled = false;
                });
            });
            
            if (userAnswers[currentQuestionIndex]) {
                const previousAnswerText = userAnswers[currentQuestionIndex].text;
                const optionToSelect = Array.from(optionElements).find(el => el.innerText === previousAnswerText);
                if (optionToSelect) {
                    optionToSelect.classList.add('selected');
                    nextQuestionBtn.disabled = false;
                }
            }

        } else {
            calculateResults();
        }
    }
    
    function calculateResults() {
        const totalScore = userAnswers.reduce((sum, answer) => sum + answer.value, 0);
        displayResults(totalScore);
        showScreen('results');
    }
    
    function displayResults(score) {
        let interpretation = '';
        let scoreColor = 'var(--success-color)';
        
        if (score <= 2) {
            interpretation = "Ваш результат указывает на низкий уровень психологического дистресса. Это отличный показатель благополучия.";
        } else if (score <= 5) {
            interpretation = "Ваш результат указывает на легкий или умеренный уровень дистресса. Стоит обратить внимание на свое состояние и использовать техники для релаксации.";
            scoreColor = 'var(--warning-color)';
        } else {
            interpretation = "Высокий уровень дистресса. Результат говорит о значительном напряжении. Настоятельно рекомендуется обсудить свое состояние с психологом или врачом.";
            scoreColor = 'var(--danger-color)';
        }

        overallScoreEl.textContent = `${score} из 12`;
        overallScoreEl.style.color = scoreColor;
        overallInterpretationEl.textContent = interpretation;
        
        recommendationsEl.innerHTML = '';
        if (score > 2) {
            recommendationsEl.innerHTML += `
                <div class="recommendation-card" style="border-color: var(--warning-color);">
                    <h4>Техники для управления стрессом</h4>
                    <ul>
                        <li><strong>Дыхательные практики:</strong> Попробуйте технику "4-7-8" для быстрого успокоения.</li>
                        <li><strong>Осознанность:</strong> Уделяйте 5-10 минут в день на медитацию.</li>
                        <li><strong>Физическая активность:</strong> Регулярные прогулки значительно улучшают настроение.</li>
                    </ul>
                </div>`;
        }
        if (score > 5) {
            recommendationsEl.innerHTML += `
                <div class="recommendation-card" style="border-color: var(--danger-color);">
                    <h4>Важно позаботиться о себе</h4>
                    <ul>
                        <li><strong>Обращение к специалисту:</strong> Не стесняйтесь обратиться за профессиональной помощью.</li>
                        <li><strong>Социальная поддержка:</strong> Поговорите о своих чувствах с близким человеком.</li>
                        <li><strong>Цифровой детокс:</strong> Ограничьте время в соцсетях, особенно перед сном.</li>
                    </ul>
                </div>`;
        }
        if (recommendationsEl.innerHTML === '') {
             recommendationsEl.innerHTML = `
                <div class="recommendation-card" style="border-color: var(--success-color);">
                    <h4>Поддержание благополучия</h4>
                    <p>Ваше психологическое состояние в норме. Продолжайте заботиться о себе, поддерживать социальные связи и уделять время хобби, которые приносят вам радость!</p>
                </div>`;
        }
    }
    
    function resetApp() {
        currentQuestionIndex = 0;
        userAnswers = [];
        nextQuestionBtn.disabled = true;
        hideModal();
        showScreen('welcome');
    }

    function showModal() {
        modal.classList.add('active');
    }

    function hideModal() {
        modal.classList.remove('active');
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---
    startBtn.addEventListener('click', () => {
        showScreen('test');
        displayQuestion();
    });

    nextQuestionBtn.addEventListener('click', () => {
        const selectedOptionEl = questionContainer.querySelector('.answer-options li.selected');
        if (selectedOptionEl) {
            const selectedText = selectedOptionEl.innerText;
            const questionOptions = questions[currentQuestionIndex].options;
            const selectedOptionData = questionOptions.find(opt => opt.text === selectedText);
            
            userAnswers[currentQuestionIndex] = selectedOptionData;
           
            currentQuestionIndex++;
            nextQuestionBtn.disabled = true;

            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                calculateResults();
            }
        }
    });

    backQuestionBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });
    
    backToMainBtn.addEventListener('click', resetApp); // <-- ИЗМЕНЕНИЕ
    
    homeBtn.addEventListener('click', showModal);
    modalBtnNo.addEventListener('click', hideModal);
    modalBtnYes.addEventListener('click', resetApp);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // --- ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ---
    showScreen('welcome');
});