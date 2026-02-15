<div class="container">

<!-- Второй блок с текстом и стрелками -->
<div class="top-section" style="margin-top: 60px;">
    <div class="text-block">
        <h2>Отзывы наших клиентов</h2>
        <p>Мы реализовали множество успешных проектов для различных отраслей. Каждый проект - это индивидуальный подход, тщательное планирование и безупречное исполнение.</p>
    </div>
    
    <div class="arrows-block">
        <button class="arrow-btn" id="prevBtn2" aria-label="Показать предыдущие проекты">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
        </button>
        <button class="arrow-btn" id="nextBtn2" aria-label="Показать следующие проекты">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
        </button>
    </div>
</div>
<!-- Второй слайдер с уникальными id -->
<div class="slider-container">
    <div class="slider-track" id="sliderTrack2">
        <!-- Слайд 1 (с другим контентом) -->
        <div class="slide">
            <div class="slide-inner">
                <div class="slide-img">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Проект 1">
                </div>
                <div class="slide-content">
                    <h3>Проект 1</h3>
                    <p>Описание первого проекта с указанием ключевых особенностей и достигнутых результатов.</p>
                    <a href="#" class="slide-btn">Подробнее</a>
                </div>
            </div>
        </div>
        
        <!-- Слайд 2 -->
        <div class="slide">
            <div class="slide-inner">
                <div class="slide-img">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Проект 2">
                </div>
                <div class="slide-content">
                    <h3>Проект 2</h3>
                    <p>Второй проект демонстрирует наш подход к решению сложных задач и достижению целей клиента.</p>
                    <a href="#" class="slide-btn">Подробнее</a>
                </div>
            </div>
        </div>
        
        <!-- Слайд 3 -->
        <div class="slide">
            <div class="slide-inner">
                <div class="slide-img">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Проект 3">
                </div>
                <div class="slide-content">
                    <h3>Проект 3</h3>
                    <p>Третий проект показывает наши возможности в реализации масштабных и сложных задач.</p>
                    <a href="#" class="slide-btn">Подробнее</a>
                </div>
            </div>
        </div>
        
        <!-- Слайд 4 -->
        <div class="slide">
            <div class="slide-inner">
                <div class="slide-img">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Проект 4">
                </div>
                <div class="slide-content">
                    <h3>Проект 4</h3>
                    <p>Четвертый проект завершает нашу портфолио и демонстрирует комплексный подход к работе.</p>
                    <a href="#" class="slide-btn">Подробнее</a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Индикаторы для второго слайдера (скрыты) -->
    <div class="slider-indicator" id="sliderIndicator2" role="tablist" aria-label="Навигация по слайдам проектов">
        <div class="indicator-dot active" data-slide="0" data-slider="2" role="tab" aria-label="Слайд 1" aria-selected="true" tabindex="0"></div>
        <div class="indicator-dot" data-slide="1" data-slider="2" role="tab" aria-label="Слайд 2" aria-selected="false" tabindex="0"></div>
        <div class="indicator-dot" data-slide="2" data-slider="2" role="tab" aria-label="Слайд 3" aria-selected="false" tabindex="0"></div>
        <div class="indicator-dot" data-slide="3" data-slider="2" role="tab" aria-label="Слайд 4" aria-selected="false" tabindex="0"></div>
    </div>
</div>

</div>