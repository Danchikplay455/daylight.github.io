<?php
header('Content-Type: application/json');

// Имитация обработки формы (без реального сохранения)
sleep(1); // Искусственная задержка для реалистичности

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка: неверный метод запроса',
        'message_type' => 'error'
    ]);
    exit;
}

// Валидация обязательных полей
$errors = [];
$requiredFields = ['name', 'email', 'message'];

foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        $errors[] = "Поле '" . ucfirst($field) . "' обязательно для заполнения";
    }
}

// Если есть ошибки - возвращаем
if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => implode('<br>', $errors),
        'message_type' => 'error'
    ]);
    exit;
}

// Успешный ответ (имитация успешной отправки)
echo json_encode([
    'success' => true,
    'message' => 'Ваше сообщение успешно отправлено!<br>Мы свяжемся с вами в ближайшее время.',
    'message_type' => 'success',
    'animation' => true
]);
?>