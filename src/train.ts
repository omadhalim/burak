// TASK- R
function calculate(str: string): number {
  const [a, operator, b] = str.split(" ");

  if (operator === "+") {
    return Number(a) + Number(b);
  }

  return 0;
}

console.log(calculate("1 + 3")); 





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