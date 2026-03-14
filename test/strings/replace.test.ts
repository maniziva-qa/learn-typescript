test("Remove all whitsepaces from a string", () => {
  const str: string = "Manikandan Adaikalam";
  const removedStr = str.replace(/\s+/g, "");
  console.log(removedStr);
  const remove = str.split(" ").join("");
  console.log(remove);
});

test("Replace the string", () => {
  const str: string = "Manikandan Adaikalam";
  const replaceStr = str.replace(/a/gi, "A");
  console.log(replaceStr);
});

test("Replace the string array", () => {
  const str: string[] = ["Manikandan", "Adaikalam"];
  const replaceStr = str.map((item) => item.replace(/a/gi, "A"));
  console.log(replaceStr);
});

test("Input is 'My name is so and so' and Output is '{My-name-is-so-and-so}'", () => {
  const str1 = "My name is so and so";
  const result = str1
    .replace(/\s/g, "-")
    .padStart(str1.length + 1, "{")
    .padEnd(str1.length + 2, "}");
  console.log(result);
});
