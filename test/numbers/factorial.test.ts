test("Find factorial of a number", () => {
  function factorial(num: number): number {
    if (num < 0) throw new Error("Given input is negative");
    return num === 0 ? 1 : num * factorial(num - 1);
  }

  console.log(factorial(5));
});

test("Find factorial of a number - for loop", () => {
  function factorial(num: number): number {
    if (num < 0) throw new Error("Given input is negative");
    let fact: number = 1;
    for (let i = 1; i <= num; i++) {
      fact *= i;
    }
    return fact;
  }

  console.log(factorial(5));
});
