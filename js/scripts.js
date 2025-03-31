// Фиксация меню при прокрутке
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
});

// Кнопка "Вверх"
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Анимация счетчика
const counters = document.querySelectorAll('.stats__number');

const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100; // Скорость анимации
    let count = 0;

    const updateCounter = () => {
        if (count < target) {
            count += increment;
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Запуск анимации, когда элемент виден на 50%

counters.forEach(counter => {
    observer.observe(counter);
});

const headerMenuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (headerMenuToggle && mobileMenu) {
    // Открытие/закрытие меню по клику на бургер
    headerMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Закрытие меню при клике вне его области (опционально)
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = headerMenuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
            mobileMenu.classList.remove('active');
        }
    });
}


// Функция для прокрутки вверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Получаем кнопку "Вверх"
const scrollTopButton = document.querySelector('.footer__scroll-top');

// Отслеживаем прокрутку страницы
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        // Показываем кнопку, если прокрутка больше 100px
        scrollTopButton.style.display = 'flex';
    } else {
        // Скрываем кнопку, если прокрутка меньше или равна 100px
        scrollTopButton.style.display = 'none';
    }
});

// Инициализация: проверяем положение при загрузке страницы
window.addEventListener('load', () => {
    if (window.scrollY > 100) {
        scrollTopButton.style.display = 'flex';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

document.querySelector('.registration__form').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Пример валидации
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (username && email && password && password === confirmPassword) {
        // Если всё в порядке, перенаправляем на главную страницу
        window.location.href = 'index.html';
    } else {
        window.location.href = '404.html';
    }
});


// Фильтрация товаров по категориям
const categories = document.querySelectorAll('.shop__category');
const items = document.querySelectorAll('.shop__item');

categories.forEach(category => {
    category.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        categories.forEach(cat => cat.classList.remove('active'));
        // Добавляем активный класс к выбранной кнопке
        category.classList.add('active');

        // Получаем категорию из атрибута data-category
        const selectedCategory = category.getAttribute('data-category');

        // Фильтруем товары
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});