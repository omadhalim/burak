// Task - Y
function findIntersection(arr1: number[], arr2: number[]): number[] {
  return arr1.filter((num) => arr2.includes(num)).filter(
    (num, index, arr) => arr.indexOf(num) === index
  );
}

console.log(findIntersection([1, 2, 3], [3, 2, 0])); 

// Task - X

// function countOccurrences(obj: Record<string, unknown>, targetKey: string): number {
//     let count = 0;

//     for (const key in obj) {
//         if (key === targetKey) count++;

//         const value = obj[key];
//         if (typeof value === "object" && value !== null)
//             count += countOccurrences(value as Record<string, unknown>, targetKey);
//     }

//     return count;
// }

// console.log(countOccurrences({ model: "A", s: { model: "B" } }, "model")); 


// Task - W


// function chunkArray(array: string | any[], size: number) {
//     const result = [];

//     for (let i = 0; i < array.length; i += size) {
//         result.push(array.slice(i, i + size));
//     }

//     return result;
// }

// console.log(chunkArray([1, 2, 3, 4, 5], 2));







// TASK - V


// function countChars(str: string): { [key: string]: number } {
//     const result: { [key: string]: number } = {};

//     for (const char of str) {
//         if (result[char]) {
//             result[char]++;
//         } else {
//             result[char] = 1;
//         }
//     }

//     return result;
// }

// console.log(countChars("hello"));







// T Task
// function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
//   return [...arr1, ...arr2].sort((a, b) => a - b);
// }

// console.log(mergeSortedArrays([0, 3, 4], [4, 6]));



// S Task




// TASK- R
// function calculate(str: string): number {
//   const [a, operator, b] = str.split(" ");

//   if (operator === "+") {
//     return Number(a) + Number(b);
//   }

//   return 0;
// }

// console.log(calculate("1 + 3")); 





// Task-Q

// function hasProperty(obj: any, property: string): boolean {
//   return property in obj;
// }

// console.log(hasProperty({ name: "BMW" }, "name"));

// // Task-P

// function objectToArray(obj: any) {
//   return Object.entries(obj);
// }

// console.log(objectToArray({ a: 10, b: 20 }));




// Task - O

// function calculateSumOfNumbers(arr: any[]) {
//   let sum = 0;

//   for (let i = 0; i < arr.length; i++) {
//     if (typeof arr[i] === "number") {
//       sum += arr[i];
//     }
//   }

//   return sum;
// }

// console.log(
//   calculateSumOfNumbers([10, "10", { son: 10 }, true, 35])
// );




/* Project Standards:
- Logging standards
- Naming standards
     function, method, variable => CAMEL    goHome
     class => PASCAL                        MemberService
     folder => KEBAB
     css => SNAKE                           button_style

- Error handling





*/




// Task - N

// function palindromCheck(str: string) {
//   let reversed = str.split("").reverse().join("");

//   return str === reversed;
// }

// console.log(palindromCheck("dad"));
// console.log(palindromCheck("hello"));



// Task - M

// function getSquareNumbers(arr: number[]) {
//   return arr.map(number => {
//     return {
//       number: number,
//       square: number * number
//     };
//   });
// }

// console.log(getSquareNumbers([1, 2, 3]));

// Task - L
// function reverseSentence(str: string) {
//   return str
//     .split(" ")
//     .map((word: string) => word.split("").reverse().join(""))
//     .join(" ");
// }

// console.log(reverseSentence("we like coding!"));