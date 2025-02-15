// Mauricio Emilio Monroy González - A01029647
// 12-2-2025
// Descripción: contiene 15 funciones que resuelven problemas de programación en JavaScript; se utilizan ciclos for, while, condicionales, operaciones matemáticas, operaciones de strings, arreglos y objetos.

"use strict";

function firstNonRepeating(text){
    for (let i = 0; i < text.length; i++){
        if (text.indexOf(text[i]) == text.lastIndexOf(text[i])){
            return text[i];
        }
    }
}
console.log("1. FirstNonRepeating: ", firstNonRepeating("abacddbec"));


function bubbleSort(numList){
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


function invertArray(numList){
    let invertedArray = numList.reverse();
    return invertedArray; 
}
console.log("3.1 InvertArray: ", invertArray([4, 3, 2, 1, 10, 29, 23]));
function invertArrayInplance(numList){
    for (let i = 0; i < numList.length /2 ; i++ ){
        let temp = numList[i];
        numList[i] = numList[numList.length - i - 1];
        numList[numList.length - i - 1] = temp;
    }
    return numList; 
}
console.log("3.2 InvertArrayInplace: ", invertArrayInplance([4, 3, 2, 1, 10, 29, 23]));


function capitalize(text){
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++){
        words[i] = words[i][0].toUpperCase() + words[i].slice(1); 
    }
    text = words.join(" "); 
    return text;
}
console.log("4. Capitalizar: ", capitalize("hello world"));


function mcd(num1, num2){
    let mcd = 0;
    let res = 1;  
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


function hackerSpeak(text){
    text = text.replace("a", "4");
    text = text.replace("s", "5"); 
    text = text.replace("r", "1"); 
    text = text.replace("e", "3");
    text = text.replace("i", "1");
    text = text.replace("o", "0");
    return text; 
}
console.log("6. HackerSpeak: ", hackerSpeak("Javascript es divertido"));


function factorize(num){
    let factors = [];
    for (let i = 1; i <= num; i++){
        if (num % i == 0){
            factors.push(i);
        }
    }
    return factors; 
}
console.log("7. Factorizar: ", factorize(12));


function deduplicate(numList){
    let newlist = [];
    for (let i = 0; i < numList.length; i++){
        if (newlist.indexOf(numList[i]) == -1){
            newlist.push(numList[i]);
        }
    }
    return newlist; 
}
console.log("8. Deduplicate: ", deduplicate([1, 0, 1, 1, 0, 0]));


function findShortestString(textList){
    let words = textList.split(" ");
    let short = words[0]; 
    for (let i = 0; i < words.length; i++){
        if (words[i].length < short.length){
            short = words[i];
        }
    }
    return short; 
}  
console.log("9. Shortest: ", findShortestString("aaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaa a aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));


function isPalindrome(text){
    let words = text.split(" ");
    text = words.join();
    let reversed = "";
    for (let i = text.length - 1; i >= 0; i--){
        reversed += text[i];
    }
    return text == reversed; 
}
console.log("10. Palindromo: ", isPalindrome("yo hago yoga ho"));

function sortStrings(words){
    let sorted = words.sort(); 
    return sorted; 
}
console.log("11. SortStrings: ", sortStrings(["wasd", "hola", "adios", "idk", "javascript"]));

function stats(numList) {
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


function popularString(textList){
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


function isPowerOf2(num){
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


function sortDescending(numList){
    let sorted = bubbleSort(numList);
    sorted = sorted.reverse();
    return sorted;
}
console.log("15. SortDescending: ", sortDescending([4, 3, 2, 1, 10, 29, 23]));