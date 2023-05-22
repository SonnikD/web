// Функция для сортировки массива объектов по полю price
function sortByPrice(arr, isAscending) { // Объявление функции 
  return arr.sort((a, b) => { // Используется метод sort() для сортировки массива arr
    const priceA = parseFloat(a.querySelector('td:nth-child(2)').textContent.trim()); // Извлекается значение цены из объекта А и преобоазуется в число
    const priceB = parseFloat(b.querySelector('td:nth-child(2)').textContent.trim()); // Извлекается значение цены из объекта B и преобоазуется в число

    console.log(priceA, priceB); // добавлено для отладки

    if (isNaN(priceA) || isNaN(priceB)) { // Проверка, являются ли значения priceA и priceB не числами с помощью функции isNaN()
      return 0; // Вернуть 0
    }

    if (priceA < priceB) { // Если значения priceA и priceB не равны, происходит сравнение для определения порядка сортировки
      return isAscending ? -1 : 1; // Если isAscending равно true, возвращается -1 для сортировки в порядке возрастания, иначе возвращается 1 для сортировки в порядке убывания
    } else if (priceA > priceB) {
      return isAscending ? 1 : -1;
    } else { // Если значения priceA и priceB равны, происходит сравнение по значению атрибута data-id (это дополнительный критерий для сортировки, если цены одинаковы)
      const idA = a.getAttribute('data-id');
      const idB = b.getAttribute('data-id');
      if (idA < idB) {
        return isAscending ? -1 : 1;
      } else if (idA > idB) {
        return isAscending ? 1 : -1;
      } else {
        return 0;
      }
    }
  });
}



window.addEventListener('load', function() { // Обработчик события load для выполнения кода после полной загрузки страницы
  const searchInput = document.querySelector('#search-input'); // Получение ссылки на элемент, который представляет поле ввода для поиска
  const sortButton = document.querySelector('#sort-button'); // Получение ссылки на элемент, который представляет кнопку сортировки 
  const tableRows = document.querySelectorAll('table tr'); // Получение всех элементов <tr> (строк) в таблице
  const rowsArray = Array.from(tableRows).slice(1); // Преобразование в массив и удаление первого элемента (заголовок таблицы)
  let isAscending = true; // Флаг, указывающий направление сортировки

  // Функция для фильтрации таблицы по названию
  function filterTable(searchValue) {
    rowsArray.forEach(row => { // Производится итерация по каждой строке row в массиве rowsArray
      const name = row.querySelector('td:first-child').textContent.toLowerCase(); // Получение ссылки на ячейку в первом дочернем элементе строки и извлечение текстового содержимого, преобразование в нижний регистр

      if (name.includes(searchValue)) { // Проверка, содержит ли значение name подстроку searchValue
        row.style.display = 'table-row'; // Если содержит, устанавливается стиль display строки как "table-row", отображение строки
      } else { // Иначе устанавливается стиль display как "none", скрытие строки
        row.style.display = 'none';
      }
    });
  }

  // Функция для обновления таблицы
  function updateTable() {
    rowsArray.forEach(row => { // Удаление всех строк таблицы  
      row.remove();
    });
// Создание нового массива в котором строки сортируются по цене в порядке, указанном в переменной isAscending
    const sortedRows = isAscending ? sortByPrice(rowsArray) : sortByPrice(rowsArray).reverse(); // 

    // Затем каждая отсортированная строка добавляется обратно в таблицу 
    sortedRows.forEach(row => { // 
      document.querySelector('table').appendChild(row);
    });
  }

  // Фильтрация по названию при вводе в поисковую строку
  searchInput.addEventListener('input', function() { // Добавляется обработчик события input на поле ввода 
    filterTable(this.value.trim().toLowerCase()); // При вводе текста в поле вызывается функция filterTabl
  });

  // Сортировка по цене при клике на кнопку
  sortButton.addEventListener('click', function() { // Добавляется обработчик события click на кнопку сортировки
    isAscending = !isAscending; // При каждом клике на кнопку меняется значение флага isAscending на противоположное
    updateTable(); // Вызов функция updateTable для обновления таблицы в соответствии с новым направлением сортировки
  });

  // Инициализация таблицы
  updateTable();
});
