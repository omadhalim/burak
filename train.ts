// Task - M

function getSquareNumbers(arr: number[]) {
  return arr.map(number => {
    return {
      number: number,
      square: number * number
    };
  });
}

console.log(getSquareNumbers([1, 2, 3]));

// Task - L
// function reverseSentence(str: string) {
//   return str
//     .split(" ")
//     .map((word: string) => word.split("").reverse().join(""))
//     .join(" ");
// }

// console.log(reverseSentence("we like coding!"));