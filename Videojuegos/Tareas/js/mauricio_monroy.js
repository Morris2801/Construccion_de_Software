// -----------------------------------------------
// Mauricio Emilio Monroy González - A01029647
// 12-2-2025
// -----------------------------------------------
// Descripción: contiene 15 funciones que resuelven problemas de programación en JavaScript; se utilizan ciclos for, while, condicionales, operaciones matemáticas, operaciones de strings, arreglos y objetos.

"use strict";

// 1. firstNonRepeating(): encuentra primer caracter que no se repite en str
export function firstNonRepeating(text){
    for (let i = 0; i < text.length; i++){
        if (text.indexOf(text[i]) == text.lastIndexOf(text[i])){
            return text[i];
        }
    }
}
console.log("1. FirstNonRepeating: ", firstNonRepeating("abacddbec"));

// 2. bubbleSort(): ordena arreglo de números con algoritmo BubbleSort
export function bubbleSort(numList){
    for (let i = 0; i < numList.length; i++){
        for (let j = 0; j < numList.length - i - 1; j++){
            if (numList[j] > numList[j + 1]){
                let temp = numList[j];
                numList[j] = numList[j + 1];
                numList[j + 1] = temp;  
            }
        }
    } 
    return numList;
}
console.log("2. BubbleSort: ", bubbleSort([4, 3, 2, 1, 10, 29, 23]));

// 3. invertArray() + invertArrayInplace(): invierte arreglo de números
export function invertArray(numList){
    let invertedArray = numList.reverse();
    return invertedArray; 
}
console.log("3.1 InvertArray: ", invertArray([4, 3, 2, 1, 10, 29, 23]));
export function invertArrayInplace(numList){
    for (let i = 0; i < numList.length /2 ; i++ ){
        let temp = numList[i];
        numList[i] = numList[numList.length - i - 1];
        numList[numList.length - i - 1] = temp;
    }
    return numList; 
}
console.log("3.2 InvertArrayInplace: ", invertArrayInplace([4, 3, 2, 1, 10, 29, 23]));

// 4. capitalize(): cambia primera letra de cada palabra a mayúscula
export function capitalize(text){
    if (text.length == 0){
        return text; 
    }
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++){
        words[i] = words[i][0].toUpperCase() + words[i].slice(1); 
    }
    text = words.join(" "); 
    return text;
}
console.log("4. Capitalizar: ", capitalize("hello world"));

// 5. mcd(): devuelve máximo común denominador entre dos números
export function mcd(num1, num2){
    let mcd = 0;
    let res = 1;  
    if (num1 == 0 && num2 == 0){
        return 0;
    }
    while (res != 0){
        if (num1 > num2){
            res = num1 % num2; 
            num1 = num2;
            mcd = num2;
            num2 = res;  
        }
        else{
            res = num2 % num1; 
            num2 = num1;
            mcd = num1; 
            num1 = res;
        }   
    }
    return mcd; 
}
console.log("5. MCD: ", mcd(48,18));

// 6. hackerSpeak(): cambia determinados caracteres de frases
export function hackerSpeak(text){
    for (let i = 0; i < text.length; i++){
        text = text.replace("a", "4");
        text = text.replace("s", "5");
        text = text.replace("e", "3");
        text = text.replace("i", "1");
        text = text.replace("o", "0");
    }
    return text; 
}
console.log("6. HackerSpeak: ", hackerSpeak("Javascript es divertido"));

// 7. factorize(): encuentra lista de factores primos de dado número
export function factorize(num){
    let factors = [];
    for (let i = 1; i <= num; i++){
        if (num % i == 0){
            factors.push(i);
        }
    }
    return factors; 
}
console.log("7. Factorizar: ", factorize(12));

// 8. deduplicate(): encuentra valores únicos en lista
export function deduplicate(numList){
    let newlist = [];
    for (let i = 0; i < numList.length; i++){
        if (newlist.indexOf(numList[i]) == -1){
            newlist.push(numList[i]);
        }
    }
    return newlist; 
}
console.log("8. Deduplicate: ", deduplicate([1, 0, 1, 1, 0, 0]));

// 9. findShortestString(): encuentra string de longitud más corta dentro de array de strings
export function findShortestString(textList){
    if (textList.length == 0){
        return 0;
    }
    let short = textList[0].length;
    for (let i = 0; i < textList.length; i++){
        if (textList[i].length < short){
            short = textList[i].length;
        }
    }
    return short; 
}  
console.log("9. Shortest: ", findShortestString(["one", "two", "thr", "fou"]));

// 10. isPalindrome(): determina si string es palíndromo o no
export function isPalindrome(text){
    let words = text.split(" ");
    text = words.join();
    let reversed = "";
    for (let i = text.length - 1; i >= 0; i--){
        reversed += text[i];
    }
    return text == reversed; 
}
console.log("10. Palindromo: ", isPalindrome("yo hago yoga ho"));

// 11. sortStrings(): ordena alfabéticamente palabras
export function sortStrings(words){
    let sorted = words.sort(); 
    return sorted; 
}
console.log("11. SortStrings: ", sortStrings(["wasd", "hola", "adios", "idk", "javascript"]));

// 12. stats(): devuelve promedio y moda de lista de números
export function stats(numList) {
    if (numList.length == 0) {
        return [0, 0];
    }  
    let freq = {};
    let average = 0;
    let moda = numList[0];
    let maxCount = 0;
    for (let i = 0; i < numList.length; i++) {
        average += numList[i];
        if (freq[numList[i]]) {
            freq[numList[i]]++;
        } else {
            freq[numList[i]] = 1;
        }
        if (freq[numList[i]] > maxCount) {
            maxCount = freq[numList[i]];
            moda = numList[i];
        }
    }
    average = average / numList.length;
    return [average, moda];
}
console.log("12. Stats: ", stats([8, 4, 2, 6, 8, 13, 17, 2, 4, 8]));

// 13. popularString(): devuelve palabra con más frecuencia entre lista de palabras
export function popularString(textList){
    if (textList.length == 0) {
        return "";
    }
    let freq = {};
    let moda = textList[0];
    let maxCount = 0;
    for (let i = 0; i < textList.length; i++) {
        if (freq[textList[i]]) {
            freq[textList[i]]++;
        } else {
            freq[textList[i]] = 1;
        }
        if (freq[textList[i]] > maxCount) {
            maxCount = freq[textList[i]];
            moda = textList[i];
        }
    }
    return moda; 
}
console.log("13. PopularString: ", popularString(["hola", "adios", "hola", "hola", "adios", "hola", "hola", "adios"]));

// 14. isPowerOf2(): determina si dado número es resultado de elevar 2 a potencia n
export function isPowerOf2(num){
    if (num == 1){
        return true;
    }
    let power = 1; 
    while (2**power <= num){
        if (2**power == num){
            return true; 
        }
        power++;
    }
    return false;
}
console.log("14. PowerOf2: ", isPowerOf2(32));

// 15. sortDescending(): ordena descendientemente lista de números
export function sortDescending(numList){
    let sorted = bubbleSort(numList);
    sorted = sorted.reverse();
    return sorted;
}
console.log("15. SortDescending: ", sortDescending([4, 3, 2, 1, 10, 29, 23]));
