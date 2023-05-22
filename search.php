<?php
// Установка параметров для подключения к базе данных
$host = "localhost";
$user = "root";
$password = "";
$database = "products";

// Подключение к базе данных
$conn = mysqli_connect($host, $user, $password, $database);

// Проверка соединения
if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}

// Проверка, что была отправлена форма поиска
if (isset($_POST['search'])) {
    // Получение строки поискового запроса
    $search = $_POST['search'];

    // Экранируем специальные символы в строке запроса
    $search = mysqli_real_escape_string($conn, $search);

    // Формирование запроса для поиска товаров по названию
    $sql = "SELECT * FROM products WHERE name LIKE '%$search%'";
    $result = mysqli_query($conn, $sql);

    // Проверка, что есть результаты поиска
    if (mysqli_num_rows($result) > 0) {
        // выводим заголовок таблицы
        echo "<table>";
        echo "<tr><th>Название товара</th><th>Цена</th><th>Изображение</th></tr>";

        // Вывод данных каждого товара в таблицу
        while($row = mysqli_fetch_assoc($result)) {
            // Добавление атрибута data-id для каждой строки таблицы
echo "<tr data-id='" . $row["id"] . "' data-price='" . $row["price"] . "'><td>" . $row["name"] . "</td><td>" . $row["price"] . "</td><td><img src='data:image/jpeg;base64," . base64_encode($row["image"]) . "'/></td></tr>";
        }

        echo "</table>";
    } else {
        echo "Нет результатов для отображения";
    }
}

// Закрываем соединение с базой данных
mysqli_close($conn);
?>
