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

test("For In - Loop through an array", () => {
  const arr: number[] = [1, 2, 3, 4, 5];
  console.log("Without order: ", arr);

  for (let index in arr) {
    console.log(`Index: ${index}, Value: ${arr[index]}`);
  }
});

test("For Of - Loop through an array", () => {
  const arr: number[] = [1, 2, 3, 4, 5];
  console.log("Without order: ", arr);

  for (let value of arr) {
    console.log(`Value: ${value}`);

    for (let value of arr) {
      if (value % 2 === 0) console.log(`${value} is Even numver`);
      else console.log(`${value} is Odd numver`);
    }
  }
});

test("For Each - Loop through an array", () => {
  const arr: number[] = [1, 2, 3, 4, 5];
  console.log("Without order: ", arr);

  arr.forEach((value, index) => {
    console.log(`Index: ${index}, Value: ${value}`);
  });
});

test("Count number of duplicates in an array", () => {
  const arr: number[] = [1, 2, 3, 2, 4, 5, 1, 6, 4, 2, 2, 2, 2];

  const seen: number[] = [];
  const duplicates: number[] = [];

  arr.forEach((num: number) => {
    if (seen.includes(num)) {
      duplicates.push(num);
    } else {
      seen.push(num);
    }
  });
  const Count = [...new Set(duplicates)];
  console.log(Count); // Output: [2, 1, 4]
  console.log(Count.length); // Output: [2, 1, 4]
});

test("Find index of an element in an array", () => {
  const arr: string[] = ["1", "2", "3", "4", "5", "8"];

  function findIndex(arr: string[], element: string): number {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === element) {
        return i;
      }
    }
    return -1; // Element not found
  }
  const index: number = findIndex(arr, "3");
  console.log("Index of element: ", index); // Output: 2
});

test("search for an element in an array and return its index", () => {
  const num: number[] = [12, 10, 2, 52, -12];
  console.log(num);
  const tar: number = 12;

  if (num.includes(tar)) {
    console.log(`${tar} is at the inde of ${num.indexOf(tar)}`);
  } else console.log(`Element ${tar} not found in the array.`);
});
