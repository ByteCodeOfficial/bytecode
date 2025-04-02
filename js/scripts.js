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

// Фильтрация новостей по категориям
document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.news-filter');
    const newsCards = document.querySelectorAll('.news-card');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Удаляем активный класс у всех фильтров
            filters.forEach(f => f.classList.remove('active'));
            // Добавляем активный класс текущему фильтру
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Показываем/скрываем новости в зависимости от выбранной категории
            newsCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Анимация появления новостей при загрузке
    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        const cards = document.querySelectorAll('.news-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
    
    // Обработка формы подписки
    const subscribeForm = document.querySelector('.news-subscribe__form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Здесь можно добавить AJAX-запрос для отправки email
                alert('Спасибо за подписку! На адрес ' + email + ' будут приходить новости.');
                emailInput.value = '';
            }
        });
    }
    
    // Обработка поиска
    const searchInput = document.querySelector('.news-hero__search input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                
                if (searchTerm) {
                    newsCards.forEach(card => {
                        const title = card.querySelector('.news-card__title').textContent.toLowerCase();
                        const excerpt = card.querySelector('.news-card__excerpt').textContent.toLowerCase();
                        
                        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            }
        });
    }
});

// Пагинация
document.querySelectorAll('.news-pagination__button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.news-pagination__button').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        // Здесь можно добавить загрузку новой страницы новостей
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Подсветка кода (если есть)
    if (document.querySelector('pre code')) {
        hljs.highlightAll();
    }
    
    // Плавная прокрутка для внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Копирование ссылки на статью
    const copyLinkBtn = document.querySelector('.article__share .fa-link');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href).then(() => {
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Ссылка скопирована!';
                tooltip.style.position = 'fixed';
                tooltip.style.bottom = '20px';
                tooltip.style.right = '20px';
                tooltip.style.background = '#00bfff';
                tooltip.style.color = '#000';
                tooltip.style.padding = '10px 20px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.zIndex = '1000';
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 2000);
            });
        });
    }
});
