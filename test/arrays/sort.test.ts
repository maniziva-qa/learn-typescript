test("Array - Sort", () => {
  let arr: number[] = [1, 3, 4, 5, 2];
  console.log("Without order: ", arr);

  arr.sort((a, b) => a - b);
  console.log("Ascending Order: ", arr);

  arr.sort((a, b) => b - a);
  console.log("Descending Order: ", arr);
});

test("Find Largest/Smallest - Sort", () => {
  let arr: number[] = [1, 3, 4, 5, 2];
  console.log("Without order: ", arr);

  arr.sort((a, b) => a - b);
  console.log("Smallest Number: ", arr[0]);
  console.log("Largest Number: ", arr[arr.length - 1]);
  console.log("second largest number: ", arr[arr.length - 2]);
});

test("without sort function", () => {
  const arr = [10, 2, 8, 7, 6, 3, 9, 1, 4, 5];

  function asc(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          // Swap elements
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }
  console.log(asc(arr)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
});

test("Sort with custom object", () => {
  const arr = [
    { name: "John", age: 25 },
    { name: "Jane", age: 22 },
    { name: "Doe", age: 30 },
  ];

  arr.sort((a, b) => a.age - b.age);
  console.log(arr); // Sorted by age in ascending order
});

test("Sort with spread Operator", () => {
  const arr = [10, 2, 8, 7, 6, 3, 9, 1, 4, 5];
  const sortedArr = [...arr].sort((a, b) => a - b);
  console.log(sortedArr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
});

test("Sort with localeCompare", () => {
  const arr = [
    "Banana",
    "apple",
    "Cherry",
    "Adaikalam",
    "123",
    "!",
    "#",
    "zebra",
    "*Mani",
  ];
  arr.sort((a, b) => a.localeCompare(b));
  console.log(arr); // ["apple", "banana", "cherry"]
});

test("Sort with localeCompare - case insensitive", () => {
  const arr = [
    "Banana",
    "apple",
    "Cherry",
    "Adaikalam",
    "123",
    "!",
    "#",
    "zebra",
    "*Mani",
  ];
  arr.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  console.log(arr); // ["!", "#", "*Mani", "123", "Adaikalam", "apple", "Banana", "Cherry", "zebra"]
});

test("Sort by using functions", () => {
  const arr: number[] = [10, 2, 8, 7, 6, 3, 9, 1, 4, 5];

  function ascending(arr: number[]): number[] {
    return arr.sort((a, b) => a - b);
  }

  function descending(arr: number[]): number[] {
    return arr.sort((a, b) => b - a);
  }

  console.log("Ascending Order: ", ascending(arr));
  console.log("Descending Order: ", descending(arr));

  console.log(`Largest number is: ${ascending(arr).slice(-1)}`);
  console.log(`Largest number is: ${ascending(arr)[arr.length - 1]}`);
});

test("Sort without mutating original array", () => {
  const arr = [10, 2, 8, 7, 6, 3, 9, 1, 4, 5];
  const sortedArr = [...arr].sort((a, b) => a - b);
  console.log("Original Array: ", arr); // Original array remains unchanged
  console.log("Sorted Array: ", sortedArr); // Sorted array
  expect(arr).toEqual([10, 2, 8, 7, 6, 3, 9, 1, 4, 5]);
  expect(sortedArr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const arr2 = [10, 2, 8, 7, 6, 3, 9, 1, 4, 5];
  const sortedArr2 = arr2.slice().sort((a, b) => a - b);
  console.log("Original Array: ", arr2); // Original array remains unchanged
  console.log("Sorted Array: ", sortedArr2); // Sorted array
});

test("Find if the array is sorted or not", () => {
  const arr: number[] = [1, 3, 4, 5, 1];
  const isSorted = (arr: number[]) => {
    let isAsc: boolean = true;
    let isDesc: boolean = true;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[i - 1]) isDesc = false;
      if (arr[i] < arr[i - 1]) isAsc = false;
    }

    if (isAsc) return "Array is sorted in ascending order";
    if (isDesc) return "Array is sorted in descending order";
    return "Array is not sorted";
  };

  console.log(isSorted(arr)); // Output: Array is not sorted
});

test("Ascending order - using Bubble Sort Algorithm", () => {
  function bubbleSort(arr: number[]): number[] {
    let n = arr.length;
    let swapped: boolean;

    // Outer loop for passes
    for (let i = 0; i < n - 1; i++) {
      swapped = false;

      // Inner loop for pairwise comparisons
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap arr[j] and arr[j+1]
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          swapped = true;
        }
      }

      // If no elements were swapped, array is already sorted
      if (!swapped) {
        break;
      }
    }

    return arr;
  }

  const numbers = [5, 2, 9, 1, 5, 6];
  console.log(`Original Array: ${numbers}`);

  const sortedArray = bubbleSort(numbers);
  console.log(`Sorted Array: ${sortedArray}`);
});

test("Descending order - using Bubble Sort Algorithm", () => {
  function bubbleSortDescending(arr: number[]): number[] {
    let n = arr.length;
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] < arr[j + 1]) {
          // Swap arr[j] and arr[j+1]
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          swapped = true;
        }
      }

      if (!swapped) {
        break;
      }
    }

    return arr;
  }

  const numbers = [5, 2, 9, 1, 5, 6];
  console.log(`Original Array: ${numbers}`);

  const sortedDescending = bubbleSortDescending(numbers);
  console.log(`Sorted in Descending Order: ${sortedDescending}`);
});

test("Find sorted or not", () => {
  const arr: number[] = [1, 3, 5, 7, 4];

  const isAsc: number[] = [...arr].sort((a, b) => a - b);
  const isDesc: number[] = [...arr].sort((a, b) => b - a);

  if (arr.join("") === isAsc.join("")) console.log("Its ascending order");
  else if (arr.join("") === isDesc.join(""))
    console.log("Its descending order");
  else console.log("Not in order");
});

test("Find sorted or not - using every method", () => {
  const arr: number[] = [44, 38, 15, 27];

  const isAsc = arr.every((val, i, a) => i === 0 || a[i - 1] <= val);
  const isDesc = arr.every((val, i, a) => i === 0 || a[i - 1] >= val);

  isAsc
    ? console.log("Ascending")
    : isDesc
    ? console.log("Descending")
    : console.log("Not sorted");
});

test("Sort without using built-in method", () => {
  const num: number[] = [0, -1, 2, 7, 4, 5, 90, 99, 121, -1];

  for (let i = 0; i < num.length - 1; i++) {
    for (let j = 0; j < num.length - 1; j++) {
      if (num[j] > num[j + 1]) {
        [num[j], num[j + 1]] = [num[j + 1], num[j]];
      }
    }
  }

  console.log(num);
});
