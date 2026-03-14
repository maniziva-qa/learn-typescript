test("Sum of all elements - Reduce", () => {
  let arr: number[] = [1, 3, 4, 5, 2];
  console.log("Without order: ", arr);

  let sum: number = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  console.log("Sum of all elements: ", sum);
});

test("Find max/Min numbers", () => {
  let arr: number[] = [1, 3, 4, 5, 2];
  console.log("Without order: ", arr);

  let max: number = Math.max(...arr);
  console.log("Max number: ", max);

  let min: number = Math.min(...arr);
  console.log("Min number: ", min);

  // Using reduce
  let maxi: number = arr.reduce((a, b) => (a > b ? a : b));
  console.log(maxi);

  let mini: number = arr.reduce((a, b) => (a < b ? a : b));
  console.log(mini);
});

test("Find the longest word in an array of strings", () => {
  const str: string[] = ["Hello", "World", "JavaScript"];
  console.log("Without order: ", str);

  const longestWord: string = str.reduce((a, b) =>
    a.length > b.length ? a : b
  );
  console.log("Longest word: ", longestWord);
});

test("Find the shortest word in an array of strings", () => {
  const str: string[] = ["Hello", "World", "JavaScript"];
  console.log("Without order: ", str);

  const shortestWord: string = str.reduce((a, b) =>
    a.length < b.length ? a : b
  );
  console.log("Shortest word: ", shortestWord);
});
