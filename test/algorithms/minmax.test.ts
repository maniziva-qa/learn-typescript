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

test("Find second largest number in an array - using sort and slice", () => {
  const arr: number[] = [1, 2, 3, 4, 5, 8];
  console.log("Without order: ", arr);

  const sortedArr = arr.sort((a, b) => a - b);
  const secondLargest = sortedArr.slice(-2, -1);
  console.log("Second largest number: ", secondLargest); // Output: 5
});

test("Find second largest number in an array", () => {
  const arr: number[] = [1, 2, 3, 4, 5, 8];
  console.log("Without order: ", arr);

  const largest = Math.max(...arr);
  const secondLargest = Math.max(...arr.filter((num) => num !== largest));
  console.log("Second largest number: ", secondLargest); // Output: 5
});

test("Find the longest word in an array of strings - using for loop", () => {
  const str: string[] = ["Hello", "World", "JavaScript"];
  console.log("Without order: ", str);

  let longestWord: string = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i].length > longestWord.length) {
      longestWord = str[i];
    }
  }
  console.log("Longest word: ", longestWord);
});

test("Find the longest word in an array of strings - using for forEach", () => {
  const str: string[] = ["Hello", "World", "JavaScript"];
  console.log("Without order: ", str);
  let longestWord: string = "";

  str.forEach((item: string) => {
    if (item.length > longestWord.length) {
      longestWord = item;
    }
  });
  console.log("Longest word: ", longestWord);
});
