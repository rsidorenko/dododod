<?php
header('Content-Type: text/html; charset=utf-8');

// Проверяем, была ли отправлена форма
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем и очищаем данные
    $name = trim(htmlspecialchars($_POST['name'] ?? ''));
    $message = trim(htmlspecialchars($_POST['message'] ?? ''));
    
    // Проверяем обязательные поля
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Имя обязательно для заполнения.";
    } elseif (strlen($name) < 2) {
        $errors[] = "Имя должно содержать минимум 2 символа.";
    }
    
    if (empty($message)) {
        $errors[] = "Отзыв обязателен для заполнения.";
    } elseif (strlen($message) < 10) {
        $errors[] = "Отзыв должен содержать минимум 10 символов.";
    }
    
    // Если есть ошибки, возвращаем их
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'errors' => $errors
        ]);
        exit;
    }
    
    // Настройки для отправки email
    $to = "your-email@example.com"; // ЗАМЕНИТЕ НА ВАШ EMAIL
    $subject = "Новый отзыв с сайта";
    
    // Формируем тело письма
    $email_message = "Новый отзыв с сайта:\n\n";
    $email_message .= "Имя: " . $name . "\n";
    $email_message .= "Отзыв: " . $message . "\n";
    $email_message .= "\nДата отправки: " . date("d.m.Y H:i:s") . "\n";
    $email_message .= "IP отправителя: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Заголовки письма
    $headers = "From: feedback-form@yourdomain.com\r\n";
    $headers .= "Reply-To: " . $to . "\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Отправляем email
    $mail_sent = mail($to, $subject, $email_message, $headers);
    
    if ($mail_sent) {
        // Сохраняем отзыв в файл (опционально)
        $file = 'feedback.txt';
        $current = file_get_contents($file);
        $current .= "[" . date("Y-m-d H:i:s") . "] " . $name . ": " . $message . "\n";
        file_put_contents($file, $current);
        
        // Отправляем успешный ответ
        echo json_encode([
            'success' => true,
            'message' => 'Спасибо! Ваш отзыв успешно отправлен.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Метод не поддерживается.'
    ]);
}
?>