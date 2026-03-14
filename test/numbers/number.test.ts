import dayjs from "dayjs";

test("Get Date and Time", () => {
  const currentDate = dayjs().format("YYYYMMDDHHmmss");
  console.log(currentDate); // 2025-04-28

  const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(currentDateTime); // 2025-04-28 10:26:45
});

test("Find factorial of a number", () => {
  function factorial(num: number) {
    if (num < 0) throw new Error("Given input is negative");
    let fact: number = 1;
    for (let i = 1; i <= num; i++) {
      fact *= i;
    }
    return fact;
  }

  console.log(factorial(5));
});

test("Find factorial of a number array", () => {
  function factorial(n: number) {
    if (n < 0) throw new Error("Given input is negative");

    let fact: number = 1;
    for (let i = 1; i <= n; i++) {
      fact *= i;
    }
    return fact;
  }

  const numbers = [3, 4, 5];
  const result = numbers.map(factorial);

  console.log(result);
});

test("without dayjs lib", () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  console.log(`${year}/${month}/${day} ${hour}:${minute}:${second}`);
  console.log(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
  console.log(`${year}${month}${day}${hour}${minute}${second}`);
  console.log(`${year}${month}${day}`);
  console.log(`${year}${month}${day}${hour}${minute}${second}`);

  // Need month or date if single digit it shoutld be 0
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = day < 10 ? `0${day}` : day;
  const formattedHour = hour < 10 ? `0${hour}` : hour;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;
  const formattedSecond = second < 10 ? `0${second}` : second;
  console.log(
    `${year}${formattedMonth}${formattedDate}${formattedHour}${formattedMinute}${formattedSecond}`
  );
});

test("Get birth year of given number array", () => {
  function birthYear(n: number) {
    const now = new Date();
    const year = now.getFullYear();

    let age: number = year - n;
    return age;
  }
  const numbers = [1996, 2003, 2004, 2005];

  numbers.forEach((year) => {
    console.log(`Born in ${year} → Age: ${birthYear(year)}`);
  });
});

test("Find the maximum number of consecutive 1s in a binary array", () => {
  const arr: number[] = [1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0];

  let max: number = 0;
  let count: number = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      count = count + 1;
      max = Math.max(max, count);
    } else count = 0;
  }

  console.log(max);
});

test("Find missing number in array", () => {
  const arr = [1, 2, 4, 5, 6];

  const n = arr.length + 1;
  const total = (n * (n + 1)) / 2;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const miss = total - sum;

  console.log(miss);
});

test("Find missing number in array - 2", () => {
  const arr: number[] = [6, 7, 8, 9, 11];
  const min: number = Math.min(...arr);
  const max: number= Math.max(...arr);

  const Exptotal: number = (max * (max + 1)) / 2 - (min * (min - 1)) / 2;
  const ActualSum: number = arr.reduce((a, b) => a + b);

  console.log(Exptotal - ActualSum);
});
