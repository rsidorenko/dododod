// ===== ОТЛОЖЕННАЯ ЗАГРУЗКА АНАЛИТИКИ =====

(function() {
  'use strict';
  
  let analyticsLoaded = false;
  let yandexMetrikaLoaded = false;
  let googleAnalyticsLoaded = false;
  let mangoOfficeLoaded = false;
  
  // Функция для загрузки скрипта
  function loadScript(src, callback) {
    if (document.querySelector('script[src="' + src + '"]')) {
      if (callback) callback();
      return;
    }
    
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }
  
  // Загрузка Yandex.Metrika
  function loadYandexMetrika() {
    if (yandexMetrikaLoaded) return;
    yandexMetrikaLoaded = true;
    
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');
    
    ym(96029721, 'init', {
      webvisor:true, 
      clickmap:true, 
      referrer: document.referrer, 
      url: location.href, 
      accurateTrackBounce:true, 
      trackLinks:true
    });
  }
  
  // Загрузка Google Analytics
  function loadGoogleAnalytics() {
    if (googleAnalyticsLoaded) return;
    googleAnalyticsLoaded = true;
    
    // Инициализируем dataLayer и функцию gtag до загрузки скрипта
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    // Загружаем скрипт и после загрузки инициализируем
    loadScript('https://www.googletagmanager.com/gtag/js?id=G-1MJLYYTDM5', function() {
      gtag('js', new Date());
      gtag('config', 'G-1MJLYYTDM5');
    });
  }
  
  // Загрузка Mango Office widget
  function loadMangoOffice() {
    if (mangoOfficeLoaded) return;
    mangoOfficeLoaded = true;
    
    loadScript('//widgets.mango-office.ru/site/36470');
  }
  
  // Основная функция загрузки аналитики
  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    
    // Используем requestIdleCallback если доступен, иначе setTimeout
    if (window.requestIdleCallback) {
      requestIdleCallback(function() {
        loadYandexMetrika();
        loadGoogleAnalytics();
        // Mango Office загружаем по взаимодействию (менее критично)
      }, { timeout: 2000 });
    } else {
      setTimeout(function() {
        loadYandexMetrika();
        loadGoogleAnalytics();
      }, 100);
    }
  }
  
  // Загрузка Mango Office по взаимодействию пользователя
  function loadMangoOfficeOnInteraction() {
    if (mangoOfficeLoaded) return;
    
    const events = ['scroll', 'click', 'mousemove', 'touchstart'];
    const loadOnce = function() {
      loadMangoOffice();
      events.forEach(event => {
        document.removeEventListener(event, loadOnce, { passive: true });
      });
    };
    
    events.forEach(event => {
      document.addEventListener(event, loadOnce, { once: true, passive: true });
    });
  }
  
  // Инициализация загрузки аналитики
  function initAnalytics() {
    // Загружаем основную аналитику после полной загрузки страницы
    if (document.readyState === 'complete') {
      loadAnalytics();
    } else {
      window.addEventListener('load', loadAnalytics, { once: true });
    }
    
    // Загружаем Mango Office по взаимодействию
    loadMangoOfficeOnInteraction();
  }
  
  // Запускаем инициализацию
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
  } else {
    initAnalytics();
  }
  
  // Экспортируем функции для ручного вызова при необходимости
  window.loadAnalytics = loadAnalytics;
  window.loadYandexMetrika = loadYandexMetrika;
  window.loadGoogleAnalytics = loadGoogleAnalytics;
  window.loadMangoOffice = loadMangoOffice;
})();

