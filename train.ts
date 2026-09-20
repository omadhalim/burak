// Task - L
function reverseSentence(str: string) {
  return str
    .split(" ")
    .map((word: string) => word.split("").reverse().join(""))
    .join(" ");
}

console.log(reverseSentence("we like coding!"));