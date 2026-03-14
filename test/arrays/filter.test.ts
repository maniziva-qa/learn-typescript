test("Find Odd/Even an array", () => {
  let arr: number[] = [1, 3, 4, 5, 2];
  console.log("Without order: ", arr);

  let evenNumbers: number[] = arr.filter((num) => num % 2 === 0);
  console.log("Even Numbers: ", evenNumbers);

  let oddNumbers: number[] = arr.filter((num) => num % 2 !== 0);
  console.log("Odd Numbers: ", oddNumbers);
});

test("Filter - Loop through an array", () => {
  const arr: number[] = [1, 2, 3, 4, 5];
  console.log("Without order: ", arr);

  const filteredArray: number[] = arr.filter((value) => value > 2);
  console.log("Filtered Array: ", filteredArray);
});

test("Find second largest number in an array", () => {
  const arr: number[] = [1, 2, 3, 4, 5, 8];
  console.log("Without order: ", arr);

  const largest = Math.max(...arr);
  const secondLargest = Math.max(...arr.filter((num) => num !== largest));
  console.log("Second largest number: ", secondLargest); // Output: 5
});

test("Filter - Find duplicates from an array", () => {
  const arr: number[] = [1, 2, 3, 4, 5, 1, 2];
  console.log("Original array: ", arr);

  const duplicates: number[] = arr.filter(
    (item, index) => arr.indexOf(item) !== index
  );
  console.log("Duplicates: ", duplicates); // Output: [1, 2]
});

test("Filter - Find unique values from an array", () => {
  const arr: number[] = [1, 2, 3, 4, 5, 1, 2];
  console.log("Original array: ", arr);

  const uniqueValues: number[] = arr.filter(
    (item, index) => arr.indexOf(item) === index
  );
  console.log("Unique values: ", uniqueValues); // Output: [1, 2, 3, 4, 5]
});
