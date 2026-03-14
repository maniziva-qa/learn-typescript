test("Reverse an Number built-in method", () => {
  let arr: number = 123;
  let spl = arr.toString().split('')
  let reversedArray = spl.reverse();
  console.log("Reversed Array: ", reversedArray.join(''));
});

test("Reverse an Number array built-in method", () => {
  let arr: number[] = [1, 3, 4, 5, 2];
  let reversedArray: number[] = arr.reverse();
  console.log("Reversed Array: ", reversedArray);
});

test("Reverse an string built-in method", () => {
  const arr: string = "Manikandan";
  let rev = arr.split('').reverse().join('');
  console.log(rev);
});

test("To reverse a sentence built-in method", () => {
  const str: string = "Im Manikandan from Rayavaram";
  let rev = str.split('').reverse().join('');
  console.log(rev);
});

test("To reverse a sentence but not themself built-in method", () => {
  const str: string = "Im Manikandan from Rayavaram";
  let rev = str.split('').reverse().join('');
  console.log(rev);
});

test("To reverse a word but not sentence built-in method", () => {
  const str: string = "Im Manikandan from Rayavaram";
  let rev = str.split(' ').map((item) => item.split('').reverse().join('')).join(' ');
  console.log(rev);
});

//--------------------------------------------------------

test("Reverse a Number without built-in methods", () => {
  let num: number = 123;
  let spl: string = num.toString();
  let rev = "";
  for(let i=spl.length-1; i>=0; i--){
      rev+=spl[i];
  }
  console.log(rev);
});

test("Reverse a number array without built-in methods", () => {
  let arr: number[] = [1, 3, 4, 5, 2];
  let reversedArray: number[] = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    reversedArray.push(arr[i]);
  }

  console.log("Reversed Array:", reversedArray); // Output: [2, 5, 4, 3, 1]
});

test("Reverse an string using for loop", () => {
  const arr: string = "Manikandan";
  let rev = "";

  for (let i = arr.length - 1; i >= 0; i--) {
    rev = rev + arr[i];
  }
  console.log(rev);
});


test("Reverse a sentence fully without built-in methods", () => {
  const str: string = "Im Manikandan from Rayavaram";
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  console.log("Reversed Sentence:", reversed);
});

test("Reverse a word without using buil-in method", () => {
  const str: string = "Im Manikandan from Rayavaram";

  let arr = str.split(" ");
  let rev = "";

  for (let i = arr.length - 1; i >= 0; i--) {
    rev = rev + arr[i] + " ";
  }
  console.log(rev.trim());
});

test("Reverse an array of each strings using for loop", () => {
  const str: string[] = ["Manikandan", "adaikalam"];

  let rev: string[] = [];
  let revword = "";

  for (let i = str.length - 1; i >= 0; i--) {
    const word = str[i];
    for (let j = word.length - 1; j >= 0; j--) {
      revword = revword + word[j];
    }
    rev.push(revword);
  }

  console.log(rev);
});












