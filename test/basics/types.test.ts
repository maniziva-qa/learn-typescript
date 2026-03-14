//import { sum } from '../yourModule'; // Adjust the import based on your module

test("Basic test - Variables", () => {
  let a: number = 20;
  console.log(`a value is ${a}`);
  let b: string = "hello";
  console.log(b);
  let c: boolean = true;
  console.log(c);
  let d: null = null;
  console.log(d);
  let e: undefined = undefined;
  console.log(e);
});

test("Other test - Variables", () => {
  let f: object = { name: "John", age: 30 };
  console.log(f);
  let g: any = "hello";
  console.log(g);
  let h: unknown = "hello";
  console.log(h);
  // let i : never;
  // console.log(i);
  // let j : bigint = 1234567890123456789012345678901234567890n;
  // console.log(j);
  let k: symbol = Symbol("symbol");
  console.log(k);
  let l: void = undefined;
  console.log(l);
  let m: Function = function () {
    return "hello";
  };
  console.log(m);
  let n: Array<number> = [1, 2, 3];
  console.log(n);
});
