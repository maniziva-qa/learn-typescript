test("Find vowels in an array of strings", () => {
  const str: string[] = ["Hello", "World", "JavaScript"];
  console.log("Without order: ", str);

  const vowels: string[] = str.join("").match(/[aeiou]/gi) || [];
  console.log("Vowels in the array of strings: ", vowels);
  // const vowels: string[] = str.join("").match(/[^aeiou]/gi) || []; - To find Consonants
});

test("Regular expression to find String", () => {
  const str: string = "Manikandan Adaikalam";
  console.log("Without order: ", str);

  const regex: RegExp = /(.*?)Adaikalam/i;
  const matches: string[] = str.match(regex) || [];
  console.log("Matches: ", matches[1]);
});

test("To find vowels, consonants, spaces, digits, special characters in a string", () => {
  const str: string = "Manik andan Adaik alam-123";
  console.log(`String length: ${str.length}`);

  const spaces = str.match(/\s/g) || [];
  console.log(`Number of spaces: ${spaces.length}`);

  const vowels = str.match(/[aeiou]/gi) || [];
  console.log(`Number of vowels: ${vowels.length}`);

  const consonants =
    str.match(/[a-z]/gi)?.filter((item) => !/[aeiou]/i.test(item)) || [];
  console.log(`Number of consonants: ${consonants.length}`);

  const digits = str.match(/\d/g) || [];
  console.log(`Number of digits: ${digits.length}`);

  const specialChar = str.match(/[^a-z0-9\s]/gi) || [];
  console.log(`Number of special characters: ${specialChar.length}`);
});

test('print the sum of digits from a given string (e.g., "abcd23")', () => {
  const str: string = "abcd23";

  const spl = str.match(/\d/gi)?.reduce((a,b) => a + parseInt(b), 0);
  console.log(spl);
});