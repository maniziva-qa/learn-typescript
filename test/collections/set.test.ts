test("Remove duplicates from an array", () => {
  let arr: number[] = [1, 3, 4, 5, 1];
  const removeDuplicates = [...new Set(arr)];
  console.log("Remove duplicate from an number array: ", removeDuplicates); // Output: [1, 3, 4, 5]

  let arr2: string[] = ["apple", "banana", "apple", "orange"];
  const removeDuplicates2 = [...new Set(arr2)];
  console.log("Remove duplicate from an string array: ", removeDuplicates2); // Output: ["apple", "banana", "orange"]
});

test("find duplicates in an array", () => {
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

  console.log([...new Set(duplicates)]); // Output: [2, 1, 4]
});

test("find duplicates in an string array", () => {
  const str: string[] = [
    "apple",
    "banana",
    "orange",
    "banana",
    "apple",
    "apple",
  ];

  const seen: string[] = [];
  const duplicate: string[] = [];

  str.forEach((item) => {
    if (seen.includes(item)) {
      duplicate.push(item);
    } else {
      seen.push(item);
    }
  });
  console.log([...new Set(duplicate)]);
});

test("Merge two arrays", () => {
  const arr1: number[] = [1, 2, 3];
  const arr2: number[] = [4, 5, 6, 1];

  const mergedArray: number[] = [...arr1, ...arr2];
  const uniqueMergedArray: number[] = [...new Set(mergedArray)];
  console.log("Merged array:", uniqueMergedArray); // Output: [1, 2, 3, 4, 5, 6]
});
