// Функция для показа тост-уведомлений (всплывашки справа сверху)
function showToast(message, isSuccess) {
    let toastContainer = document.getElementById('htb-replay-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'htb-replay-toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '80px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '999999';
        toastContainer.style.display = 'flex';
        toastContainer.style.flexDirection = 'column';
        toastContainer.style.gap = '10px';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.color = 'white';
    toast.style.fontWeight = 'bold';
    toast.style.fontFamily = 'sans-serif';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    
    if (isSuccess) {
        toast.style.backgroundColor = '#9fc335'; // Зеленый
    } else {
        toast.style.backgroundColor = '#f44336'; // Красный
    }

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ---------------------------------------------------
// ЛОГИКА ДЛЯ ГЛАВНОЙ ПЛАТФОРМЫ HTB (app.hackthebox.com)
// ---------------------------------------------------

function checkAppAnswer(inputElement, correctAnswer, iconElement) {
    const userAnswer = inputElement.value.trim();
    const correct = correctAnswer.trim();
    
    if (userAnswer === correct) {
        inputElement.style.boxShadow = '0 0 0 2px #9fc335 inset';
        inputElement.classList.add('htb-input--text-accent');
        if (iconElement) iconElement.style.display = '';
        showToast(chrome.i18n.getMessage("toastCorrect"), true);
    } else {
        inputElement.style.boxShadow = '0 0 0 2px #f44336 inset';
        showToast(chrome.i18n.getMessage("toastWrong"), false);
        setTimeout(() => {
            inputElement.style.boxShadow = '';
        }, 2000);
    }
}

function processHtbAppForms() {
    const forms = document.querySelectorAll('form.flag-submission-list-item__flag-form:not([data-replay-processed])');
    
    forms.forEach(form => {
        const input = form.querySelector('input[type="text"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!input || !submitBtn) return;
        
        if (input.hasAttribute('readonly') && input.value) {
            const correctAnswer = input.value;
            
            const clonedForm = form.cloneNode(true);
            clonedForm.setAttribute('data-replay-processed', 'true');
            form.parentNode.replaceChild(clonedForm, form);
            
            const clonedInput = clonedForm.querySelector('input[type="text"]');
            const clonedSubmitBtn = clonedForm.querySelector('button[type="submit"]');
            const iconElement = clonedForm.querySelector('.p-inputicon');
            
            clonedInput.value = '';
            clonedInput.removeAttribute('readonly');
            clonedInput.removeAttribute('aria-readonly');
            clonedInput.classList.remove('p-filled');
            clonedInput.classList.remove('htb-input--text-accent');
            clonedInput.placeholder = chrome.i18n.getMessage("placeholderApp");
            
            if (iconElement) iconElement.style.display = 'none';
            
            clonedSubmitBtn.removeAttribute('disabled');
            clonedSubmitBtn.classList.remove('htb-button--disabled');
            
            const btnText = clonedSubmitBtn.querySelector('div');
            if (btnText) {
                btnText.textContent = chrome.i18n.getMessage("btnCheckLocal");
            } else {
                clonedSubmitBtn.textContent = chrome.i18n.getMessage("btnCheckLocal");
            }
            
            clonedForm.addEventListener('submit', (e) => {
                e.preventDefault();
                checkAppAnswer(clonedInput, correctAnswer, iconElement);
            });
            
            clonedSubmitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                checkAppAnswer(clonedInput, correctAnswer, iconElement);
            });
        }
    });
}

// ---------------------------------------------------
// ЛОГИКА ДЛЯ HTB ACADEMY (academy.hackthebox.com)
// ---------------------------------------------------

let academyTotalQuestions = 0;
let academySolvedQuestions = 0;

function checkAcademyAnswer(inputElement, correctAnswer, iconElement) {
    const userAnswer = inputElement.value.trim();
    const correct = correctAnswer.trim();
    
    if (userAnswer === correct) {
        inputElement.style.boxShadow = '0 0 0 2px #9fc335 inset';
        if (iconElement) iconElement.style.display = '';
        inputElement.setAttribute('disabled', 'true'); // Снова блокируем поле после решения
        showToast(chrome.i18n.getMessage("toastCorrect"), true);
        
        incrementAcademyProgress();
    } else {
        inputElement.style.boxShadow = '0 0 0 2px #f44336 inset';
        showToast(chrome.i18n.getMessage("toastWrong"), false);
        setTimeout(() => {
            inputElement.style.boxShadow = '';
        }, 2000);
    }
}

function updateAcademyProgress() {
    const allQuestions = document.querySelectorAll('form[id^="question-"]');
    if (allQuestions.length === 0) return;
    
    academyTotalQuestions = allQuestions.length;
    // Считаем только те поля, которые мы заново заблокировали (решенные локально)
    academySolvedQuestions = document.querySelectorAll('form[data-replay-processed] input[disabled]').length;
    
    renderAcademyProgress();
}

function incrementAcademyProgress() {
    academySolvedQuestions++;
    renderAcademyProgress();
}

function renderAcademyProgress() {
    if (academyTotalQuestions === 0) return;
    
    let percentage = Math.round((academySolvedQuestions / academyTotalQuestions) * 100);
    
    const progressBars = document.querySelectorAll('progress.progress-success');
    progressBars.forEach(bar => {
        bar.value = percentage;
    });
    
    const percentageSpans = document.querySelectorAll('span.text-secondary');
    percentageSpans.forEach(span => {
        if (span.textContent.includes('%')) {
            span.textContent = `${percentage}% `;
        }
    });
}

function processAcademyForms() {
    const forms = document.querySelectorAll('form[id^="question-"]:not([data-replay-processed])');
    
    if (forms.length > 0) {
        forms.forEach(form => {
            const input = form.querySelector('input[type="text"]');
            if (!input) return;
            
            // В Академии решенные поля имеют disabled
            if (input.hasAttribute('disabled') && input.value) {
                const correctAnswer = input.value;
                
                // === РАСКРЫВАЕМ АККОРДЕОН АВТОМАТИЧЕСКИ ===
                const collapseDiv = form.closest('.collapse');
                if (collapseDiv && !collapseDiv.classList.contains('collapse-open')) {
                    // Ждем немного, чтобы Vue успел загрузиться и привязать события
                    setTimeout(() => {
                        if (!collapseDiv.classList.contains('collapse-open')) {
                            const collapseTitle = collapseDiv.querySelector('.collapse-title');
                            if (collapseTitle) {
                                collapseTitle.click(); // Эмулируем реальный клик
                            } else {
                                const checkbox = collapseDiv.querySelector('input[type="checkbox"]');
                                if (checkbox) checkbox.click();
                            }
                        }
                    }, 1000);
                }
                
                const clonedForm = form.cloneNode(true);
                clonedForm.setAttribute('data-replay-processed', 'true');
                form.parentNode.replaceChild(clonedForm, form);
                
                const clonedInput = clonedForm.querySelector('input[type="text"]');
                const iconElement = clonedForm.querySelector('svg.text-accent');
                
                // Очищаем и разблокируем
                clonedInput.value = '';
                clonedInput.removeAttribute('disabled');
                clonedInput.placeholder = chrome.i18n.getMessage("placeholderAcademy");
                
                if (iconElement) {
                    iconElement.style.display = 'none';
                }
                
                // В Академии ответы часто отправляются просто по нажатию Enter в форме
                clonedForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    checkAcademyAnswer(clonedInput, correctAnswer, iconElement);
                });
            }
        });
        
        // Сбрасываем визуальный прогресс до 0% (или до того уровня, сколько решено локально)
        updateAcademyProgress();
    }
}

// ---------------------------------------------------
// ОСНОВНОЙ ЦИКЛ
// ---------------------------------------------------

let appEnabled = true;
let academyEnabled = true;

function processForms() {
    if (appEnabled) processHtbAppForms();
    if (academyEnabled) processAcademyForms();
}

chrome.storage.local.get(['replayEnabledApp', 'replayEnabledAcademy'], (result) => {
    appEnabled = result.replayEnabledApp !== false;
    academyEnabled = result.replayEnabledAcademy !== false;
    
    if (appEnabled || academyEnabled) {
        processForms();
        
        const observer = new MutationObserver(() => {
            processForms();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});
