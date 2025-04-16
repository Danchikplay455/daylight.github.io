document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года в подвале
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav .container ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Анимация иконки
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Закрытие меню при клике на пункт (для мобильных)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Анимация прокрутки
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Эффект "пульсации" для активного пункта меню
            if (window.innerWidth > 768) {
                const allLinks = document.querySelectorAll('nav a');
                allLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                setTimeout(() => {
                    this.classList.remove('active');
                }, 1000);
            }
        });
    });

    // Сортировка категорий с анимацией
    const sortButtons = document.querySelectorAll('.filter-btn.sort');
    
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Анимация нажатия кнопки
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            const sortValue = this.getAttribute('data-sort');
            const container = document.querySelector('.category-list');
            const cards = Array.from(document.querySelectorAll('.category-card'));
            
            if (sortValue === 'name') {
                cards.sort((a, b) => {
                    const nameA = a.querySelector('h3').textContent.toLowerCase();
                    const nameB = b.querySelector('h3').textContent.toLowerCase();
                    return nameA.localeCompare(nameB);
                });
            } else if (sortValue === 'popularity') {
                cards.sort(() => Math.random() - 0.5);
            }
            
            // Анимация перестановки карточек
            container.style.opacity = '0';
            setTimeout(() => {
                container.innerHTML = '';
                cards.forEach((card, index) => {
                    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
                    container.appendChild(card);
                });
                container.style.opacity = '1';
            }, 300);
        });
    });

    // Слайдер отзывов с улучшенной анимацией
    const reviews = document.querySelectorAll('.review');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Анимация перехода
        reviews[currentSlide].style.animation = 'fadeOut 0.5s ease-out forwards';
        
        setTimeout(() => {
            reviews.forEach(review => review.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            reviews[index].classList.add('active');
            reviews[index].style.animation = 'fadeIn 0.5s ease-out forwards';
            dots[index].classList.add('active');
            currentSlide = index;
        }, 500);
    }
    
    // Новые анимации для слайдера
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-30px); }
        }
    `;
    document.head.appendChild(style);
    
    // Остальной код слайдера без изменений
    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= reviews.length) newIndex = 0;
        showSlide(newIndex);
    }
    
    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = reviews.length - 1;
        showSlide(newIndex);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlider();
        });
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlider();
    });
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    startSlider();
    
    // Анимация появления секций при скролле с параллакс-эффектом
    function checkScroll() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
                
                // Параллакс-эффект для фонов
                const bgParallax = section.querySelector('.parallax-bg');
                if (bgParallax) {
                    const scrollValue = window.scrollY;
                    bgParallax.style.transform = `translateY(${scrollValue * 0.3}px)`;
                }
            }
        });
        
        // Анимация для шапки при скролле
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(49, 42, 53, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.backgroundColor = 'rgba(49, 42, 53, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '15px 0';
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Улучшенная обработка форм с анимацией
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Анимация нажатия кнопки
            submitBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 200);
            
            // Показываем индикатор загрузки
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="submit-spinner"></span>
                Отправка...
            `;
            
            // Создаем уведомление с анимацией
            const notification = document.createElement('div');
            notification.className = 'form-notification';
            document.body.appendChild(notification);
            
            // Анимация появления уведомления
            setTimeout(() => {
                notification.innerHTML = `
                    <div class="notification-content success">
                        Ваша заявка отправлена успешно, мы свяжемся с вами в течении 3 рабочих дней
                        <div class="success-animation"></div>
                    </div>
                `;
                notification.classList.add('show');
                
                // Анимация элементов формы
                const formElements = this.elements;
                for (let i = 0; i < formElements.length; i++) {
                    if (formElements[i].tagName !== 'BUTTON') {
                        formElements[i].style.transform = 'translateY(-5px)';
                        formElements[i].style.opacity = '0.5';
                    }
                }
                
                // Очищаем форму с анимацией
                setTimeout(() => {
                    this.reset();
                    for (let i = 0; i < formElements.length; i++) {
                        if (formElements[i].tagName !== 'BUTTON') {
                            formElements[i].style.transform = 'translateY(0)';
                            formElements[i].style.opacity = '1';
                        }
                    }
                }, 500);
                
                // Восстанавливаем кнопку
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Скрываем уведомление через 5 сек с анимацией
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => notification.remove(), 500);
                }, 5000);
            }, 1000);
        });
    });
    
    // Улучшенная анимация логотипа при загрузке
    const logo = document.querySelector('.logo');
    setTimeout(() => {
        logo.style.transition = 'transform 0.5s ease-in-out';
        logo.style.transform = 'rotate(720deg) scale(1.2)';
        setTimeout(() => {
            logo.style.transform = 'scale(1.1)';
            setTimeout(() => {
                logo.style.transform = 'none';
                // Запускаем бесконечную анимацию
                logo.style.animation = 'float 3s ease-in-out infinite';
            }, 500);
        }, 500);
    }, 1000);
    
    // Анимация при наведении на карточки игр
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.1) rotate(2deg)';
            
            const price = this.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1.1)';
                price.style.color = '#ffd700';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            
            const img = this.querySelector('img');
            img.style.transform = 'scale(1) rotate(0)';
            
            const price = this.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1)';
                price.style.color = '#85DB26';
            }
        });
    });
    
    // Анимация социальных иконок
    document.querySelectorAll('.social-links img').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(15deg)';
            this.style.filter = 'drop-shadow(0 0 5px rgba(133, 219, 38, 0.7))';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
            this.style.filter = 'none';
        });
    });
});