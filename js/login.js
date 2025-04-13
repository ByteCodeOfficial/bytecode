document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы
    const loginForm = document.querySelector('.login-form__container');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const submitButton = document.querySelector('.btn-submit');
    const errorMessage = document.getElementById('login-error');
    
    // Анимация появления формы
    setTimeout(() => {
        document.querySelector('.login-form').style.opacity = '1';
        document.querySelector('.login-form').style.transform = 'translateY(0)';
    }, 100);
    
    // Обработка отправки формы
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валидация полей
        if (!emailInput.value.trim() || !passwordInput.value.trim()) {
            showError('Заполните все поля');
            return;
        }
        
        // Эмуляция отправки данных
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
        
        // Здесь должен быть AJAX-запрос к серверу
        setTimeout(() => {
            // Эмуляция успешного входа
            const isSuccess = Math.random() > 0.5;
            
            if (isSuccess) {
                window.location.href = 'profile.html';
            } else {
                showError('Неверный email или пароль');
                submitButton.disabled = false;
                submitButton.textContent = 'Войти';
            }
        }, 1500);
    });
    
    // Показать сообщение об ошибке
    function showError(message) {
        errorMessage.querySelector('span').textContent = message;
        errorMessage.style.display = 'flex';
        
        // Анимация появления
        setTimeout(() => {
            errorMessage.style.opacity = '1';
            errorMessage.style.transform = 'translateY(0)';
        }, 10);
        
        // Скрыть через 5 секунд
        setTimeout(() => {
            errorMessage.style.opacity = '0';
            errorMessage.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 300);
        }, 5000);
    }
    
    // Инициализация анимации частиц
    initParticles();
    
    function initParticles() {
        const particles = document.querySelectorAll('.login-particle');
        
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