document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы
    const formContainers = document.querySelectorAll('.register-form__container');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const progressSteps = document.querySelectorAll('.register-form__progress-step');
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Инициализация формы
    initForm();

    function initForm() {
        // Показываем первый шаг формы
        document.querySelector('.register-form__container[data-step="1"]').classList.add('active');
        
        // Анимация появления формы
        setTimeout(() => {
            document.querySelector('.register-form').style.opacity = '1';
            document.querySelector('.register-form').style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Проверка сложности пароля
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Проверка длины
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Проверка на наличие цифр
        if (/\d/.test(password)) strength += 1;
        
        // Проверка на наличие спецсимволов
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
        
        // Проверка на наличие букв в разных регистрах
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        
        // Обновление индикатора сложности
        updateStrengthIndicator(strength);
    });
    
    function updateStrengthIndicator(strength) {
        let width = '0%';
        let color = '#ff0000';
        let text = 'Слабый';
        
        if (strength >= 4) {
            width = '100%';
            color = '#00ff00';
            text = 'Сильный';
        } else if (strength >= 2) {
            width = '60%';
            color = '#ffcc00';
            text = 'Средний';
        } else if (strength >= 1) {
            width = '30%';
            color = '#ff6600';
            text = 'Слабый';
        }
        
        strengthBar.style.setProperty('--strength-width', width);
        strengthBar.style.setProperty('--strength-color', color);
        strengthText.textContent = text;
        strengthText.style.color = color;
    }
    
    // Переключение между шагами формы
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.register-form__container');
            const nextStepNum = parseInt(this.dataset.next);
            const nextStep = document.querySelector(`.register-form__container[data-step="${nextStepNum}"]`);
            
            if (validateStep(currentStep)) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
                updateProgress(nextStepNum);
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.register-form__container');
            const prevStepNum = parseInt(this.dataset.prev);
            const prevStep = document.querySelector(`.register-form__container[data-step="${prevStepNum}"]`);
            
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
            updateProgress(prevStepNum);
        });
    });
    
    // Валидация шага
    function validateStep(step) {
        const inputs = step.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
                
                // Создаем сообщение об ошибке, если его нет
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Это поле обязательно для заполнения';
                    input.parentNode.insertBefore(errorMsg, input.nextSibling);
                }
            } else {
                input.classList.remove('error');
                
                // Удаляем сообщение об ошибке, если оно есть
                if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                    input.nextElementSibling.remove();
                }
            }
        });
        
        // Дополнительная проверка для пароля
        if (step.dataset.step === "1") {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                const confirmInput = document.getElementById('confirm-password');
                confirmInput.classList.add('error');
                
                if (!confirmInput.nextElementSibling || !confirmInput.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Пароли не совпадают';
                    confirmInput.parentNode.insertBefore(errorMsg, confirmInput.nextSibling);
                }
                
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Обновление индикатора прогресса
    function updateProgress(stepNum) {
        progressSteps.forEach((step, index) => {
            if (index < stepNum) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    // Ограничение выбора интересов (максимум 3)
    const interestCheckboxes = document.querySelectorAll('.interest-option input[type="checkbox"]');
    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.interest-option input[type="checkbox"]:checked').length;
            
            if (checkedCount > 3) {
                this.checked = false;
                showNotification('Можно выбрать не более 3 интересов');
            }
        });
    });
    
    // Показать уведомление
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Отправка формы
    const submitButton = document.querySelector('.btn-submit');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            const form = this.closest('form');
            
            if (validateStep(form)) {
                // Здесь можно добавить AJAX-запрос для отправки данных
                showSuccessMessage(form);
            }
        });
    }
    
    // Показать сообщение об успешной регистрации
    function showSuccessMessage(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>
            <h3>Регистрация завершена!</h3>
            <p>Теперь вы можете войти в свой аккаунт.</p>
            <a href="login.html" class="btn btn-login">Войти</a>
        `;
        
        form.innerHTML = '';
        form.appendChild(successMessage);
        form.style.textAlign = 'center';
    }
});