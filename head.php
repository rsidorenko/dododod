<?php
if (!isset($og_title)) $og_title = $title;
if (!isset($og_description)) $og_description = $description;
if (!isset($og_image)) $og_image = 'https://m-zamok.ru/img/logo.svg';
$og_url = $canonical;
?>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?=$title?></title>
<meta name="description" content="<?=$description?>" />
<link rel="canonical" href="<?=$canonical?>" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="preload" href="/css/styles.css" as="style" />
<link rel="preload" href="/img/zamki-bg.webp" as="image" />
<link rel="preload" href="/fonts/OpenSans/OpenSans-Variable.woff2" as="font" type="font/woff2" crossorigin />
<link href="/css/styles.css" rel="stylesheet" />
<meta name="yandex-verification" content="e9f47fd7eddb6d8d" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:locale" content="ru_RU" />
<meta property="og:title" content="<?=htmlspecialchars($og_title)?>" />
<meta property="og:description" content="<?=htmlspecialchars($og_description)?>" />
<meta property="og:url" content="<?=htmlspecialchars($og_url)?>" />
<meta property="og:image" content="<?=htmlspecialchars($og_image)?>" />
<meta property="og:site_name" content="М-Замок — вскрытие замков в Москве" />
