document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы
    const forgotForm = document.getElementById('forgot-password-form');
    const emailInput = document.getElementById('forgot-email');
    const submitButton = document.querySelector('.btn-submit');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Анимация появления формы
    setTimeout(() => {
        document.querySelector('.forgot-password-form').style.opacity = '1';
        document.querySelector('.forgot-password-form').style.transform = 'translateY(0)';
    }, 100);
    
    // Обработка отправки формы
    forgotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валидация email
        if (!emailInput.value.trim()) {
            showMessage(errorMessage, 'Введите email');
            return;
        }
        
        // Проверка формата email
        if (!validateEmail(emailInput.value)) {
            showMessage(errorMessage, 'Введите корректный email');
            return;
        }
        
        // Эмуляция отправки данных
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        
        // Здесь должен быть AJAX-запрос к серверу
        setTimeout(() => {
            // Эмуляция успешной отправки
            const isSuccess = Math.random() > 0.5;
            
            if (isSuccess) {
                showMessage(successMessage, 'Инструкции по восстановлению пароля отправлены на ваш email');
                forgotForm.reset();
            } else {
                showMessage(errorMessage, 'Аккаунт с таким email не найден');
            }
            
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить инструкции';
        }, 1500);
    });
    
    // Показать сообщение
    function showMessage(element, message) {
        // Скрыть все сообщения
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Установить текст и показать нужное сообщение
        element.querySelector('span').textContent = message;
        element.style.display = 'flex';
        
        // Анимация появления
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
        
        // Скрыть через 5 секунд (кроме успешного)
        if (!element.classList.contains('success')) {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    element.style.display = 'none';
                }, 300);
            }, 5000);
        }
    }
    
    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Инициализация анимации частиц
    initParticles();
    
    function initParticles() {
        const particles = document.querySelectorAll('.forgot-password-particle');
        
        particles.forEach(particle => {
            // Случайные начальные позиции
            const randomX = Math.random() * 80 + 10;
            const randomY = Math.random() * 80 + 10;
            particle.style.left = `${randomX}%`;
            particle.style.top = `${randomY}%`;
            
            // Случайная задержка анимации
            const delay = Math.random() * 5;
            particle.style.animationDelay = `${delay}s`;
        });
    }
});