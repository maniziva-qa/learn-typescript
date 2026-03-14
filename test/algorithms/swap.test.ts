test("Swap two numbers", () => {
  let a = 10;
  let b = 20;

  console.log(`Before swap: a = ${a}, b = ${b}`);

  [a, b] = [b, a]; // Using array destructuring

  console.log(`After swap: a = ${a}, b = ${b}`);
});

test("Swap two number arrays", () => {
  let arr1 = [1, 2, 3];
  let arr2 = [4, 5, 6];

  console.log(`Before swap: arr1 = ${arr1}, arr2 = ${arr2}`);

  let temp = arr1;
  arr1 = arr2;
  arr2 = temp;

  console.log(`After swap: arr1 = ${arr1}, arr2 = ${arr2}`);
});

test("Swap two numbers using temp variable ", () => {
  let a = 10;
  let b = 20;

  console.log(`Before swap: a = ${a}, b = ${b}`);

  let temp = a;
  a = b;
  b = temp;

  console.log(`After swap: a = ${a}, b = ${b}`);
});

test("Swap two elements using Generic Function ", () => {
  function swap<T>(a: T, b: T): [T, T] {
    return [b, a];
  }

  let a = 10,
    b = 20;
  [a, b] = swap(a, b);
  console.log(`After swap: a = ${a}, b = ${b}`);
});
