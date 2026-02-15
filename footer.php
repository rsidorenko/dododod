</div>
<div class="footer">
<div class="container">
<div class="row-flex-footer">
		
	<div class="logo-footer">
			<img src="/img/logo.svg" alt="служба вскрытия замков" />
			</div>
			
			<div class="adress-footer">
			<img src="/img/location.svg" width="35" alt="Наш адрес" />
			<p><span class="main-bold">г. Москва и МО</span> <span class="main-grey-footer">Адрес: пр-т Мира, 132</span><br><a href="https://share.google/xiWtanghm2XaM0wKx" target="_blank" rel="noopener noreferrer">Найти на карте</a></p>
			</div>
			
			<div class="time-footer">
			<img src="/img/clock.svg" width="45" alt="Время работы" />
			<p><span class="main-bold">Работаем 24/7</span> <span class="main-grey-footer">Круглосуточно Пн-Вс</span></p>
			</div>
			
			<div class="phone-footer">
			<img src="/img/phone.svg" width="35" alt="Номер телефона" />
			<p><a href="tel:+74994900451">+7 (499) 490-04-51</a><br><span class="main-grey-footer">Звоните круглосуточно</span></p>
	</div>
			
</div>

<div class="nav-footer">
		<ul class="nav-footer-menu">
			<li><a href="/">Вскрытие замков</a></li>
			<li><a href="/vskrytie-dverej/">Вскрытие замков дверей в Москве</a></li>
			<li><a href="/vskrytie-avtomobilej/">Вскрытие машин в Москве</a></li>
			<li><a href="/vskrytie-seyfov/">Вскрытие сейфов</a></li>
			<li><a href="/zamena-zamkov/">Замена замка в Москве</a></li>
			<li><a href="/ustanovka-zamkov/">Установка замков</a></li>
			<li><a href="/remont-zamkov/">Ремонт замков</a></li>
			<li><a href="/kontakty/">Контакты</a></li>
		</ul>
	</div>
	
<div class="privacy">
<p>© 2026, «M-zamok». Все права защищены. Использование любых материалов, размещённых на сайте, разрешается при условии ссылки на «m-zamok.ru». 
Используя данный сайт, вы принимаете <a href="/privacy/">политику конфиденциальности</a></p>
</div>

</div>
</div>
</div>

<?php
$base = 'https://m-zamok.ru';
$ld_local = array(
  '@context' => 'https://schema.org',
  '@type' => 'LocalBusiness',
  '@id' => $base . '/#localbusiness',
  'name' => 'М-Замок',
  'description' => 'Вскрытие замков в Москве круглосуточно. Аварийное вскрытие дверей, автомобилей, сейфов. Замена и установка замков.',
  'url' => $base . '/',
  'telephone' => '+7 (499) 490-04-51',
  'address' => array(
    '@type' => 'PostalAddress',
    'addressLocality' => 'Москва',
    'streetAddress' => 'пр-т Мира, 132'
  ),
  'geo' => array(
    '@type' => 'GeoCoordinates',
    'latitude' => 55.7936,
    'longitude' => 37.6332
  ),
  'openingHoursSpecification' => array(
    '@type' => 'OpeningHoursSpecification',
    'dayOfWeek' => array('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'),
    'opens' => '00:00',
    'closes' => '23:59'
  ),
  'areaServed' => array(
    '@type' => 'City',
    'name' => 'Москва'
  ),
  'sameAs' => array(
    'https://share.google/xiWtanghm2XaM0wKx'
  )
);
$ld_scripts = array($ld_local);
if (!empty($schema_service)) {
  $ld_service = array(
    '@context' => 'https://schema.org',
    '@type' => 'Service',
    'name' => $schema_service['name'],
    'description' => isset($schema_service['description']) ? $schema_service['description'] : '',
    'provider' => array('@id' => $base . '/#localbusiness'),
    'areaServed' => array('@type' => 'City', 'name' => 'Москва')
  );
  $ld_scripts[] = $ld_service;
}
if (!empty($breadcrumb) && is_array($breadcrumb)) {
  $items = array();
  $pos = 1;
  foreach ($breadcrumb as $b) {
    $items[] = array(
      '@type' => 'ListItem',
      'position' => $pos++,
      'name' => $b[0],
      'item' => (strpos($b[1], 'http') === 0 ? $b[1] : $base . $b[1])
    );
  }
  $ld_scripts[] = array(
    '@context' => 'https://schema.org',
    '@type' => 'BreadcrumbList',
    'itemListElement' => $items
  );
}
if (!empty($faq_items) && is_array($faq_items)) {
  $faq_el = array();
  foreach ($faq_items as $faq) {
    $faq_el[] = array(
      '@type' => 'Question',
      'name' => $faq['q'],
      'acceptedAnswer' => array(
        '@type' => 'Answer',
        'text' => $faq['a']
      )
    );
  }
  $ld_scripts[] = array(
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => $faq_el
  );
}
foreach ($ld_scripts as $ld) {
  echo '<script type="application/ld+json">' . "\n" . json_encode($ld, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n" . '</script>' . "\n";
}
?>

<!-- Плашка политики конфиденциальности -->
<div id="cookieConsent" class="cookie-consent">
  <div class="cookie-content">
    <p>
      Мы используем cookie для улучшения работы сайта. Продолжая пользоваться сайтом, вы принимаете
      <a href="/privacy/" class="cookie-link">
        политику конфиденциальности
      </a>
    </p>
    <button id="cookieAccept" class="cookie-button">
      Принять и закрыть
    </button>
  </div>
</div>
	


<script src="/js/script.js" defer></script>

<!-- Оптимизированная отложенная загрузка аналитики -->
<script src="/js/analytics.js" defer></script>

<!-- Yandex.Metrika noscript (для пользователей без JavaScript) -->
<noscript><div><img src="https://mc.yandex.ru/watch/96029721" style="position:absolute; left:-9999px;" alt="" /></div></noscript>

</body>
</html>