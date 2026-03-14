test("Find Duplicate elements - using loop", () => {
  const str: string = "Manikandan";
  console.log(`Original String: ${str}`);

  let seen: string[] = [];
  let duplicate: string[] = [];

  for (let i = 0; i < str.length; i++) {
    if (seen.includes(str[i])) {
      duplicate.push(str[i]);
    } else seen.push(str[i]);
  }

  console.log(`Duplicated characters: ${duplicate}`);
});

test("Find Duplicate elements - using filter", () => {
  const str: string = "Manikandan";
  console.log(`Original String: ${str}`);
  const duplicate: string[] = [
    ...new Set(
      str.split("").filter((item, index) => str.indexOf(item) !== index)
    ),
  ];
  console.log(`Duplicated characters: `, duplicate);
});

test("Find Duplicate elements - using hashmap", () => {
  const str: string = "Manikandan";
  console.log(`Original String: ${str}`);
  const charCount: { [key: string]: number } = {};

  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  console.log(charCount);

  const duplicate = Object.keys(charCount).filter(
    (char) => charCount[char] > 1
  );
  console.log(duplicate);
});


test('Find first/second repeated and non-repeated character in a string - using hashmap', () => {
  const str: string = "Manikandan";
  const charCount: { [key: string]: number } = {};

  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  console.log(charCount);
  
  // use find method to get the first non-repeated character
  const firstNonRepeated = str.split("").find((char) => charCount[char] === 1);
  const firstRepeated = str.split("").find((char) => charCount[char] > 1);

  const repeated = str.split("").filter((char) => charCount[char] > 1);
  const nonRepeated = str.split("").filter((char) => charCount[char] === 1);

  console.log(firstNonRepeated);
  // Only print the index if firstNonRepeated is defined
  console.log(str.indexOf(firstNonRepeated || "Not Found"));
    
  console.log(firstRepeated);
  console.log(repeated);
  console.log(nonRepeated);

  //find second non-repeated character
  const secondNonRepeated = str.split("").find((char) => charCount[char] === 1 && char !== firstNonRepeated);
  console.log(secondNonRepeated);

  //find second repeated character
  const secondRepeated = str.split("").find((char) => charCount[char] > 1 && char !== firstRepeated);
  console.log(secondRepeated);
});