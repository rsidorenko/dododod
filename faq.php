<?php if (!empty($faq_items) && is_array($faq_items)): ?>
<div class="container otstupy25">
<h2>Частые вопросы</h2>
<div class="faq-list">
<?php foreach ($faq_items as $faq): ?>
<div class="faq-item">
<h3><?=htmlspecialchars($faq['q'])?></h3>
<p><?=nl2br(htmlspecialchars($faq['a']))?></p>
</div>
<?php endforeach; ?>
</div>
</div>
<?php endif; ?>
