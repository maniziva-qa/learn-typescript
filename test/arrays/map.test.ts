test("Reverse each word in a string arrays", () => {
  const str: string[] = ["Hello", "World", "JavaScript"];
  console.log("Without order: ", str);

  const reversedWords: string[] = str.map((word) =>
    word.split("").reverse().join("")
  );
  console.log("Reversed words: ", reversedWords);
});

test("Map - Loop through an array", () => {
  const arr: number[] = [1, 2, 3, 4, 5];
  console.log("Without order: ", arr);

  const mappedArray: number[] = arr.map((value) => value * 2);
  console.log("Mapped Array: ", mappedArray);
});

test("Map - Odd Even for all elemets", () => {
  const arr = [1, 4, 3, 5, 6, 7, 199901, 1];
  const small = arr.map((a) => {
    if (a % 2 === 0) return `${a} - is even number`;
    else return `${a} - is odd number`;
  });
  console.log(small);
});
