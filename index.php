<!DOCTYPE html> <!-- Объявление браузеру о том, что это HTML-документ-->
<html>
  <head>
    <meta charset="UTF-8"> <!-- -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">  <!--Установка фавикона -->
    <link rel="stylesheet" href="style.css">  <!-- Связывание с файлом стилей style.css -->
    <title>Список товаров</title> 
  </head>
  <body>
  <script defer src="main.js"> </script>  <!-- Исполнение и загрузка JS файла -->
  <button id="sort-button" >Сортировать по цене</button>  <!-- Создание кнопки сортировки-->
  <div class="three"><h1>Список товаров</h1></div>  <!--Создание заголовка  -->
  <form>
  <input type="text" id="search-input" placeholder="Поиск по названию товара">  <!--Создание кнопки поиска-->
</form>
  


<?php
// Установка параметров для подключения к базе данных
$host = "localhost";
$user = "root"; 
$password = "";
$database = "products";

//Запуск происходит через порт 8000

// Подключение к базе данных
$conn = mysqli_connect($host, $user, $password, $database);

// Проверка соединения
if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}

// Запрос на выборку всех данных из таблицы "products"
$sql = "SELECT * FROM products"; // Создание запроса для выборки всех данных из таблицы products
$result = mysqli_query($conn, $sql); // Выполнение запроса к БД

// Проверка наличия данных
if (mysqli_num_rows($result) > 0) { // Если количество строк результата больше нуля
    // Выводим заголовок таблицы
    echo "<table>"; 
    echo "<tr><th>Название товара</th><th>Цена</th><th>Изображение</th></tr>";

    // Выводим данные каждого товара в таблицу
    while($row = mysqli_fetch_assoc($result)) { // Каждая строка результата выборки данных из базы данных сохраняется в переменную row
        // Выводим изображение товара
        echo "<tr><td>" . $row["name"] . "</td><td>" . $row["price"] . "</td><td><img src='data:image/jpeg;base64," . base64_encode($row["image"]) . "'/></td></tr>";
    }

    echo "</table>";
} else {
    echo "Нет данных для отображения"; //  Если результат выборки не содержит строк
}

// Закрываем соединение с базой данных
mysqli_close($conn);
?>
 </body>
</html>
