document.addEventListener('DOMContentLoaded', function() {
    // Показать/скрыть пароль
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Проверка сложности пароля
    const passwordStrength = document.querySelector('.password-strength');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text span');
    
    if (passwordInput && passwordStrength) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Проверка длины
            if (password.length > 0) strength += 1;
            if (password.length >= 8) strength += 1;
            
            // Проверка наличия цифр
            if (/\d/.test(password)) strength += 1;
            
            // Проверка наличия специальных символов
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
            
            // Проверка наличия букв в разных регистрах
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
            
            // Обновление индикатора
            strengthBars.forEach((bar, index) => {
                bar.style.backgroundColor = index < strength ? getStrengthColor(strength) : '#333';
            });
            
            // Обновление текста
            const strengthLabels = ['', 'очень слабый', 'слабый', 'средний', 'сильный', 'очень сильный'];
            strengthText.textContent = strengthLabels[strength];
            strengthText.style.color = getStrengthColor(strength);
        });
    }
    
    function getStrengthColor(strength) {
        const colors = ['#ff0000', '#ff4500', '#ffa500', '#9acd32', '#2e8b57'];
        return colors[strength - 1] || '#ff0000';
    }
    
    // Валидация формы
    const registrationForm = document.getElementById('registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка паролей
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                showError('Пароли не совпадают');
                return;
            }
            
            // Проверка согласия с условиями
            if (!document.getElementById('terms').checked) {
                showError('Необходимо согласиться с условиями');
                return;
            }
            
            // Если всё в порядке, можно отправить форму
            // Здесь можно добавить AJAX-запрос или перенаправление
            alert('Регистрация прошла успешно! Добро пожаловать в ByteCode!');
            window.location.href = 'index.html';
        });
    }
    
    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'form__error';
        errorElement.textContent = message;
        errorElement.style.color = '#ff5555';
        errorElement.style.marginTop = '10px';
        errorElement.style.textAlign = 'center';
        errorElement.style.animation = 'fadeIn 0.3s ease-out';
        
        // Удаляем предыдущие сообщения об ошибках
        const existingError = document.querySelector('.form__error');
        if (existingError) {
            existingError.remove();
        }
        
        registrationForm.appendChild(errorElement);
        
        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            errorElement.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                errorElement.remove();
            }, 300);
        }, 5000);
    }
    
    // Анимация частиц
    function createParticles() {
        const particlesContainer = document.querySelector('.registration__particles');
        if (!particlesContainer) return;
        
        // Очищаем существующие частицы
        particlesContainer.innerHTML = '';
        
        // Создаем новые частицы
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Случайные начальные позиции
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Случайные размеры
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Случайная прозрачность
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Случайная длительность анимации
            const duration = Math.random() * 15 + 10;
            particle.style.animation = `float ${duration}s infinite linear`;
            
            // Случайная задержка
            particle.style.animationDelay = `${Math.random() * 10}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Инициализация частиц при загрузке
    createParticles();
    
    // Обновление частиц при изменении размера окна
    window.addEventListener('resize', createParticles);
});

// Функция для прокрутки вверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Показать/скрыть кнопку "Вверх"
window.addEventListener('scroll', function() {
    const scrollTopButton = document.querySelector('.footer__scroll-top');
    if (scrollTopButton) {
        if (window.scrollY > 100) {
            scrollTopButton.style.display = 'flex';
        } else {
            scrollTopButton.style.display = 'none';
        }
    }
});