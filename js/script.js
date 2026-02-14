// ===== ПЛАШКА ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ =====
(function() {
  const cookieAccepted = localStorage.getItem('cookieConsentAccepted');
  
  if (!cookieAccepted) {
    document.addEventListener('DOMContentLoaded', function() {
      const cookieConsent = document.getElementById('cookieConsent');
      const cookieAccept = document.getElementById('cookieAccept');
      
      if (cookieConsent && cookieAccept) {
        // Показываем плашку
        setTimeout(() => {
          cookieConsent.classList.add('show');
          updateHeights();
        }, 500);
        
        // Обработчик кнопки "Принять"
        cookieAccept.addEventListener('click', function() {
          localStorage.setItem('cookieConsentAccepted', 'true');
          cookieConsent.classList.remove('show');
          resetHeights();
          setTimeout(() => cookieConsent.remove(), 300);
        });
        
        // Функция обновления высот
        function updateHeights() {
          const cookieHeight = cookieConsent.offsetHeight;
          const backToTop = document.querySelector('.back-to-top');
          const footer = document.querySelector('.footer');
          
          if (backToTop) backToTop.style.bottom = (cookieHeight + 20) + 'px';
          if (footer) footer.style.paddingBottom = cookieHeight + 'px';
        }
        
        // Функция сброса высот
        function resetHeights() {
          const backToTop = document.querySelector('.back-to-top');
          const footer = document.querySelector('.footer');
          
          if (backToTop) backToTop.style.bottom = '';
          if (footer) footer.style.paddingBottom = '';
        }
        
        // Обновляем при ресайзе
        window.addEventListener('resize', function() {
          if (cookieConsent.classList.contains('show')) {
            setTimeout(updateHeights, 100);
          }
        });
      }
    });
  }
})();

// ===== КНОПКА "НАВЕРХ" =====
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
  </svg>
`;
document.body.appendChild(backToTopButton);

// ===== ГЛАВНЫЙ КОД =====
document.addEventListener('DOMContentLoaded', function() {
  
  // Функция для кнопки "наверх"
  function toggleBackToTop() {
    requestAnimationFrame(() => {
      if (window.pageYOffset > 1000) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
  }
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  backToTopButton.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();
  
  // ===== МЕНЮ =====
  const menuIconWrap = document.querySelector('.menu-icon-wrap');
  const mainNav = document.getElementById('mainNav');
  const closeMenuBtn = document.getElementById('closeMenu');
  
  if (menuIconWrap && mainNav) {
    menuIconWrap.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      mainNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', function() {
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 800 && mainNav) {
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 800 && mainNav && menuIconWrap) {
      if (mainNav.classList.contains('active') && 
          !mainNav.contains(e.target) && 
          !menuIconWrap.contains(e.target)) {
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // ===== СЛАЙДЕРЫ =====
  function initSlider(config) {
    const { sliderTrackId, prevBtnId, nextBtnId, indicatorId } = config;
    
    const sliderTrack = document.getElementById(sliderTrackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
    if (!sliderTrack || !prevBtn || !nextBtn) return;
    
    const slides = sliderTrack.querySelectorAll('.slide, .review-slide');
    let currentPosition = 0;
    const slidesCount = slides.length;
    let slidesPerView = 4;
    
    function updateSlidesPerView() {
      const isReviewsSlider = sliderTrackId === 'reviewsSliderTrack';
      const isSecondSlider = sliderTrackId === 'sliderTrack2';
      
      // Кэшируем window.innerWidth для предотвращения принудительной компоновки
      const windowWidth = window.innerWidth;
      
      if (windowWidth <= 768) {
        slidesPerView = 1;
      } else if (windowWidth <= 992) {
        slidesPerView = 2;
      } else {
        if (isReviewsSlider || isSecondSlider) {
          slidesPerView = 3;
        } else {
          slidesPerView = 4;
        }
      }
    }
    
    function getSlideWidth() {
      return sliderTrack.clientWidth / slidesPerView;
    }
    
    function updateSliderPosition() {
      const slideWidth = getSlideWidth();
      sliderTrack.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
      updateIndicators();
    }
    
    function updateIndicators() {
      const indicatorContainer = document.getElementById(indicatorId);
      if (!indicatorContainer) return;
      
      const indicators = indicatorContainer.querySelectorAll('.indicator-dot, .review-indicator-dot');
      const activeIndex = Math.floor(currentPosition / (slidesCount / slidesPerView));
      
      indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
          indicator.classList.add('active');
          indicator.setAttribute('aria-selected', 'true');
          indicator.setAttribute('tabindex', '0');
        } else {
          indicator.classList.remove('active');
          indicator.setAttribute('aria-selected', 'false');
          indicator.setAttribute('tabindex', '-1');
        }
      });
    }
    
    function nextSlide() {
      const maxPosition = slidesCount - slidesPerView;
      
      if (currentPosition < maxPosition) {
        currentPosition++;
      } else {
        currentPosition = 0;
      }
      
      updateSliderPosition();
    }
    
    function prevSlide() {
      const maxPosition = slidesCount - slidesPerView;
      
      if (currentPosition > 0) {
        currentPosition--;
      } else {
        currentPosition = maxPosition;
      }
      
      updateSliderPosition();
    }
    
    function goToSlide(index) {
      const maxPosition = slidesCount - slidesPerView;
      currentPosition = Math.min(index * slidesPerView, maxPosition);
      updateSliderPosition();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    const indicatorContainer = document.getElementById(indicatorId);
    if (indicatorContainer) {
      const indicators = indicatorContainer.querySelectorAll('.indicator-dot, .review-indicator-dot');
      indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
          const slideIndex = parseInt(this.getAttribute('data-slide'));
          goToSlide(slideIndex);
        });
      });
    }
    
    // Используем requestAnimationFrame для оптимизации обработчика resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      if (resizeTimeout) {
        cancelAnimationFrame(resizeTimeout);
      }
      resizeTimeout = requestAnimationFrame(function() {
        updateSlidesPerView();
        updateSliderPosition();
      });
    });
    
    updateSlidesPerView();
    updateSliderPosition();
  }
  
  // Инициализация слайдеров
  initSlider({
    sliderTrackId: 'sliderTrack',
    prevBtnId: 'prevBtn',
    nextBtnId: 'nextBtn',
    indicatorId: 'sliderIndicator'
  });
  
  initSlider({
    sliderTrackId: 'sliderTrack2',
    prevBtnId: 'prevBtn2',
    nextBtnId: 'nextBtn2',
    indicatorId: 'sliderIndicator2'
  });
  
  initSlider({
    sliderTrackId: 'reviewsSliderTrack',
    prevBtnId: 'reviewsPrevBtn',
    nextBtnId: 'reviewsNextBtn',
    indicatorId: 'reviewsSliderIndicator'
  });
  
  // ===== СЛАЙДЕР ПОСТОВ =====
  const postTrack = document.querySelector('.slider-post-track');
  if (postTrack) {
    const slides = document.querySelectorAll('.new-post');
    const dotsContainer = document.querySelector('.slider-post-dots');
    
    if (slides.length > 0 && dotsContainer) {
      let currentSlide = 0;
      
      // Добавляем role и aria-label для контейнера индикаторов
      dotsContainer.setAttribute('role', 'tablist');
      dotsContainer.setAttribute('aria-label', 'Навигация по статьям');
      
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-post-dot';
        dot.type = 'button';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Перейти к статье ' + (index + 1));
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.setAttribute('tabindex', index === 0 ? '0' : '-1');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
      });
      
      const dots = document.querySelectorAll('.slider-post-dot');
      
      function goToSlide(slideIndex) {
        dots.forEach((dot, index) => {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
          dot.setAttribute('tabindex', '-1');
        });
        dots[slideIndex].classList.add('active');
        dots[slideIndex].setAttribute('aria-selected', 'true');
        dots[slideIndex].setAttribute('tabindex', '0');
        currentSlide = slideIndex;
        const translateX = -slideIndex * 100;
        postTrack.style.transform = `translateX(${translateX}%)`;
      }
      
      postTrack.style.transform = 'translateX(0%)';
    }
  }
  
  // ===== ВИДЕО =====
  const videoPlayer = document.querySelector('.video-player');
  const videoOverlay = document.querySelector('.video-overlay');
  const playButton = document.querySelector('.play-button');
  
  if (videoPlayer && videoOverlay && playButton) {
    function playVideo() {
      videoPlayer.play()
        .then(() => {
          videoPlayer.classList.add('playing');
          videoOverlay.classList.add('hidden');
        })
        .catch(error => {
          console.log('Ошибка воспроизведения видео:', error);
        });
    }
    
    function pauseVideo() {
      videoPlayer.pause();
      videoPlayer.classList.remove('playing');
      videoOverlay.classList.remove('hidden');
    }
    
    playButton.addEventListener('click', playVideo);
    videoOverlay.addEventListener('click', playVideo);
    
    videoPlayer.addEventListener('click', function() {
      if (!videoPlayer.paused) {
        pauseVideo();
      }
    });
    
    videoPlayer.addEventListener('ended', function() {
      videoPlayer.classList.remove('playing');
      videoOverlay.classList.remove('hidden');
    });
  }
  
  // ===== ФОРМА ОБРАТНОЙ СВЯЗИ =====
  const form = document.getElementById('feedbackForm');
  
  if (form) {
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const messageError = document.getElementById('messageError');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    function validateField(field, errorElement) {
      const value = field.value.trim();
      
      if (value === '') {
        errorElement.textContent = 'Это поле обязательно для заполнения';
        field.classList.add('error');
        return false;
      }
      
      if (field.id === 'name' && value.length < 2) {
        errorElement.textContent = 'Имя должно содержать минимум 2 символа';
        field.classList.add('error');
        return false;
      }
      
      if (field.id === 'message' && value.length < 10) {
        errorElement.textContent = 'Отзыв должен содержать минимум 10 символов';
        field.classList.add('error');
        return false;
      }
      
      errorElement.textContent = '';
      field.classList.remove('error');
      return true;
    }
    
    if (nameInput) {
      nameInput.addEventListener('input', function() {
        validateField(nameInput, nameError);
      });
      
      nameInput.addEventListener('blur', function() {
        validateField(nameInput, nameError);
      });
    }
    
    if (messageInput) {
      messageInput.addEventListener('input', function() {
        validateField(messageInput, messageError);
      });
      
      messageInput.addEventListener('blur', function() {
        validateField(messageInput, messageError);
      });
    }
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const isNameValid = validateField(nameInput, nameError);
      const isMessageValid = validateField(messageInput, messageError);
      
      if (isNameValid && isMessageValid) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        formMessage.style.display = 'none';
        
        const formData = new FormData(form);
        
        fetch(form.action, {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка сети');
          }
          return response.text();
        })
        .then(data => {
          formMessage.textContent = 'Спасибо! Ваш отзыв успешно отправлен.';
          formMessage.className = 'form-message success';
          formMessage.style.display = 'block';
          
          form.reset();
          if (nameError) nameError.textContent = '';
          if (messageError) messageError.textContent = '';
          if (nameInput) nameInput.classList.remove('error');
          if (messageInput) messageInput.classList.remove('error');
          
          setTimeout(() => {
            if (formMessage) formMessage.style.display = 'none';
          }, 5000);
        })
        .catch(error => {
          formMessage.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.';
          formMessage.className = 'form-message error';
          formMessage.style.display = 'block';
          console.error('Ошибка:', error);
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
        });
      } else {
        formMessage.textContent = 'Пожалуйста, заполните все обязательные поля правильно.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
      }
    });
  }
});