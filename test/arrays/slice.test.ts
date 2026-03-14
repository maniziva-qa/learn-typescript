test("Find second largest number in an array - using sort and slice", () => {
  const arr: number[] = [1, 2, 3, 4, 5, 8];
  console.log("Without order: ", arr);

  const sortedArr = arr.sort((a, b) => a - b);
  const secondLargest = sortedArr.slice(-2, -1);
  console.log("Second largest number: ", secondLargest); // Output: 5
});
