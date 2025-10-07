// scripts.js (updated)
// Counter Animation
function animateCounter() {
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const increment = Math.ceil(target / 100);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                counter.textContent = current.toLocaleString();
                requestAnimationFrame(updateCounter);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Scroll to Top functionality
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile menu with Offcanvas
function initMobileMenu() {
    // Bootstrap handles offcanvas by default
    // Additional enhancements if needed
    const offcanvas = new bootstrap.Offcanvas('#mobileMenu');
}

// Initialize animations on scroll
function initAnimations() {
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .stat-item, .community-card').forEach(el => {
        animateOnScroll.observe(el);
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateCounter();
    initScrollToTop();
    initMobileMenu();
    initAnimations();
});

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Resize-specific logic
}, 250));

// Stats Counter Animation
function animateStatsCounter() {
    const counters = document.querySelectorAll('.stat-number[data-counter]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const increment = Math.ceil(target / 100);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                counter.textContent = current;
                requestAnimationFrame(updateCounter);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Обнови вызов функции в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    animateCounter();
    animateStatsCounter(); // Добавь эту строку
    initScrollToTop();
    initMobileMenu();
    initAnimations();
});
// Debug кнопок в hero-секции
document.addEventListener('DOMContentLoaded', function() {
    const heroButtons = document.querySelectorAll('.hero-section .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Кнопка нажата:', this.textContent);
            // Если страница не переходит, раскомментируйте следующую строку:
            // window.location.href = this.href;
        });
        
        // Добавляем стили для визуального отклика
        button.style.cursor = 'pointer';
        button.style.position = 'relative';
        button.style.zIndex = '1000';
    });
    
    // Проверяем, есть ли элементы поверх кнопок
    const heroRect = document.querySelector('.hero-section').getBoundingClientRect();
    const buttons = document.querySelectorAll('.hero-section .btn');
    
    buttons.forEach(button => {
        const buttonRect = button.getBoundingClientRect();
        console.log('Позиция кнопки:', buttonRect);
    });
});