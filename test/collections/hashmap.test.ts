test("Count repeated characters in a string", () => {
  const str = "Manikandan Adaikalam";
  const charCount: { [key: string]: number } = {};
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  console.log(charCount);
  const repeatedChars = Object.entries(charCount).filter(
    ([char, count]) => count > 1
  );
  console.log(repeatedChars);

  const [maxChar, maxCount] = Object.entries(charCount).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );
  console.log(`Character :${maxChar} is repeated at :${maxCount} times`);
});

test("Count repeated numbers in a string - using regex", () => {
  const str = "Manikandan Adaikalam1232";
  const charCount: { [key: string]: number } = {};
  const regex = /[0-9]/g;
  const matches = str.match(regex);
  if (matches) {
    for (const char of matches) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
  }
  console.log(charCount);
  const repeatedChars = Object.entries(charCount).filter(
    ([char, count]) => count > 1
  );
  console.log(repeatedChars);
});

test("Count repeated characters in a string array", () => {
  const str: string[] = ["Manikandan", "Adaikalam"];
  const charCount: { [key: string]: number } = {};
  for (const word of str) {
    for (const char of word) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
  }
  console.log(charCount);
  const repeatedChars = Object.entries(charCount).filter(
    ([char, count]) => count > 1
  );
  console.log(repeatedChars);
});

test("Count repeated characters in a each string array", () => {
  const arr = ["adaikalam", "Manikandan", "ManiZiva"];
  arr.forEach((word) => {
    const charCount: { [key: string]: number } = {};

    // Step 1: Count characters
    for (const char of word.toLowerCase()) {
      // Optional: .toLowerCase()
      charCount[char] = (charCount[char] || 0) + 1;
    }

    // Step 2: Get repeated characters
    const repeated = Object.entries(charCount).filter(
      ([char, count]) => count > 1
    );

    const repeatmap = Object.fromEntries(repeated);

    console.log(`In "${word}" → Repeated chars:`, repeatmap);
  });
});

test("Find the first non-repeated character in a string", () => {
  const str: string = "Manikandan";
  const charCount: { [key: string]: number } = {};

  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  console.log(charCount);
  const nonRepeated = Object.entries(charCount).find(
    ([char, count]) => count === 1
  );

  if (nonRepeated) {
    const nonRepeatedmap = Object.fromEntries([nonRepeated]);
    console.log("Non Repeated character is: ", nonRepeatedmap);
  } else console.log("There is no - non repeated characters");

  const repkey = nonRepeated ? nonRepeated[0] : null;
  console.log(repkey); // returns key alone
});

test("Find the frequency of each word in a sentence", () => {
  const sentence = "I am learning TypeScript and I love learning";
  const wordCount: { [key: string]: number } = {};

  // Step 1: Split sentence into words
  const words = sentence.split(" ");

  // Step 2: Count frequency of each word
  for (const word of words) {
    wordCount[word] = (wordCount[word] || 0) + 1;
  }

  console.log(wordCount);
});

test("check if two string are anagram", () => {
  function isAnagram(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;

    const count1: { [key: string]: number } = {};
    const count2: { [key: string]: number } = {};

    for (const char of str1) {
      count1[char] = (count1[char] || 0) + 1;
    }

    for (const char of str2) {
      count2[char] = (count2[char] || 0) + 1;
    }

    const sortedCount1 = Object.entries(count1).sort();
    const sortedCount2 = Object.entries(count2).sort();

    return JSON.stringify(sortedCount1) === JSON.stringify(sortedCount2);
  }

  const str1: string = "anim";
  const str2: string = "mani";

  console.log(isAnagram(str1, str2)); // ✅ true
});

test("Replace the characters using hashmap", () => {
  const str: string = "tomorrow";

  const map: { [key: string]: string } = {
    o: "3",
    r: "2",
  };

  let result = "";

  for (const char of str) {
    result += map[char] || char;
  }

  console.log(result);
});

test("Replace the characters using hashmap and replace method", () => {
  const str: string = "tomorrow";

  const map: { [key: string]: string } = { o: "3", r: "2", t: "4" };

  const rep = str.replace(/[ort]/gi, (char) => map[char]);
  console.log(rep);
});

test("Input is aabbbcccc and out should be a2b3c4", () => {
  const str: string = "aabbbcccc";

  const map: { [key: string]: number } = {};

  for (const char of str) {
    map[char] = (map[char] || 0) + 1;
  }

  let result = "";
  for (const key in map) {
    result += key + map[key];
  }

  console.log(result);
});
