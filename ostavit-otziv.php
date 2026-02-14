<div class="otzyv">
  <div class="container">
    <form id="feedbackForm" class="feedback-form" action="mail.php" method="POST">
      <p class="form-title">Оставить отзыв</p>
      
      <div class="form-group">
        <label for="name" class="form-label">Имя *</label>
        <input type="text" id="name" name="name" class="form-input" placeholder="Введите ваше имя">
        <div class="error-message" id="nameError"></div>
      </div>
      
      <div class="form-group">
        <label for="message" class="form-label">Ваш отзыв *</label>
        <textarea id="message" name="message" class="form-textarea" placeholder="Напишите ваш отзыв здесь" rows="5"></textarea>
        <div class="error-message" id="messageError"></div>
      </div>
      
      <button type="submit" class="submit-btn" id="submitBtn">
        <span class="btn-text">Отправить отзыв</span>
        <span class="btn-loader" style="display: none;">Отправка...</span>
      </button>
      
      <div class="form-message" id="formMessage"></div>
    </form>
  </div>
</div>