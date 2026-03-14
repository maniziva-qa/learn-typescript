test("Given input is prime or not", () => {
  let num: number = 15;
  let isPrime: boolean = true;

  if (num < 2) isPrime = false;

  for (let i = 2; i < num; i++) {
    if (num % i === 0){
      isPrime = false;
      break;
    } 
  }

  isPrime ? console.log("Its Prime number") : console.log("Its not Prime number");
});

test("Print prime numbers", () => {
  let prime: number[] = [];
  let nonprime: number[] = [];
  for (let i = 20; i <= 40; i++) {
  
      let isPrime = true;
      if (i < 2) isPrime = false;
  
      for (let j = 2; j < i; j++) {
          if (i % j === 0) {
              isPrime = false;
              break;
          }
      }
  
      if (isPrime) {
          prime.push(i);
      } else nonprime.push(i);
  }
  
  console.log(prime); 
  console.log(nonprime);
});
