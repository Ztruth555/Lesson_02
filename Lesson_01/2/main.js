'use strict';

var n = 33721;
n = ('' + n).split('');                                             // разделяем число на отдельные числа и помещаем их в переменную в виде масива чисел 

// Вывести в консоль произведение (умножение) цифр этого числа

var multi = 1;                                                      // создаем переменную результата умножения

// циклом перебераем массив и при каждой итерации умножаем
n.forEach(function (e) {
  multi *= e;                                                       //multi = multi*e
});

console.log(`Метод 1 произведение чисел в числе 33721 = ${multi}`);    // ('Метод №1 произведение чисел 33721 = multi')

// методом перебора reduce по-порядку
n.reduce((a, b) => a * b);
console.log(`Метод 2 произведение чисел в числе 33721 = ${multi}`);

// Возведение в степень 3

var result = multi ** 3;                                                // переменная результата
console.log(`Результат возведения в степень 3 способ №1 = ${result}`);

var result2 = 1;
    for (var i = 1; i <= 3; i++) {
  result2 *= multi;
}
console.log(`Результат возведения в степень 3 способ №2 = ${result2}`);
result2 = ('' + result2).split('');

console.log(`Первое число = ${result2[0]}`);                           // Вывести на экран первые 2 цифры полученного числа
console.log(`Второе число = ${result2[1]}`);