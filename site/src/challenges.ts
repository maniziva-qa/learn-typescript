import type { Challenge } from './types';

export const challenges: Challenge[] = [
  // ── BASICS ────────────────────────────────────────────────────────────────
  {
    id: 'basics-1',
    title: 'TypeScript Variable Types',
    category: 'basics',
    difficulty: 'easy',
    description: `Declare variables using every TypeScript primitive type:\n- number, string, boolean\n- null, undefined\n- any, unknown\n- void (as a return type)\n- symbol\nAlso declare a typed array and a typed function.`,
    starterCode: `// Declare one variable of each primitive type
const age: number =
const name: string =
const isActive: boolean =

// Also declare:
// null, undefined, any, unknown, symbol, string[], and a function returning void
`,
    hints: [
      'Use `const` for values that never change',
      '`any` opts out of type checking; `unknown` is the safe version',
      'Symbol creates a unique identifier: `Symbol("label")`',
    ],
    testCases: [
      { input: 'typeof age', expected: '"number"' },
      { input: 'typeof isActive', expected: '"boolean"' },
    ],
  },
  {
    id: 'basics-2',
    title: 'Loop Patterns',
    category: 'basics',
    difficulty: 'easy',
    description: `Given an array of numbers, demonstrate all four loop patterns:\n1. Classic \`for\` loop — print each value\n2. \`for...in\` — print each index\n3. \`for...of\` — print each value\n4. \`forEach\` — print index and value together`,
    starterCode: `const nums: number[] = [10, 20, 30, 40, 50];

// 1. for loop


// 2. for...in


// 3. for...of


// 4. forEach

`,
    hints: [
      '`for...in` gives you keys (indices as strings)',
      '`for...of` gives you values directly',
      'forEach callback receives (value, index, array)',
    ],
    testCases: [
      { input: 'nums.length', expected: '5' },
    ],
  },
  {
    id: 'basics-3',
    title: 'var vs let vs const Hoisting',
    category: 'basics',
    difficulty: 'medium',
    description: `Explain the hoisting behaviour of \`var\`, \`let\`, and \`const\` by writing three functions:\n1. \`varHoist()\` — log a var before and after declaration\n2. \`letHoist()\` — show why let throws a ReferenceError if used before declaration\n3. \`functionHoist()\` — call a function declaration before it is defined`,
    starterCode: `function varHoist(): void {
  // var is hoisted as undefined

}

function functionHoist(): void {
  // function declarations are fully hoisted

}

// Explain in a comment: why does let throw an error before its declaration?
`,
    hints: [
      '`var` is hoisted and initialized to `undefined`',
      '`let`/`const` exist in a "temporal dead zone" until their declaration line',
      'Function *declarations* are fully hoisted (body and all)',
    ],
    testCases: [],
  },

  // ── STRINGS ───────────────────────────────────────────────────────────────
  {
    id: 'strings-1',
    title: 'Reverse a String',
    category: 'strings',
    difficulty: 'easy',
    description: `Write three functions that each reverse a string:\n1. \`reverseBuiltin(s)\` — using \`.split().reverse().join()\`\n2. \`reverseLoop(s)\` — using a for loop\n3. \`reverseSentence(s)\` — reverse word order in a sentence`,
    starterCode: `function reverseBuiltin(s: string): string {

}

function reverseLoop(s: string): string {

}

function reverseSentence(s: string): string {

}

console.log(reverseBuiltin("hello"));       // "olleh"
console.log(reverseLoop("TypeScript"));     // "tpircSepyT"
console.log(reverseSentence("hello world")); // "world hello"
`,
    hints: [
      '`s.split("").reverse().join("")` is the one-liner',
      'For the loop, build a new string by prepending each char',
      'Split on space, reverse the array, join back with space',
    ],
    testCases: [
      { input: 'reverseBuiltin("hello")', expected: '"olleh"' },
      { input: 'reverseSentence("hello world")', expected: '"world hello"' },
    ],
  },
  {
    id: 'strings-2',
    title: 'Palindrome Check',
    category: 'strings',
    difficulty: 'easy',
    description: `Write two palindrome checkers:\n1. \`isPalindromeBuiltin(s)\` — using built-in methods\n2. \`isPalindromeTwoPointer(s)\` — using the two-pointer technique (no split/reverse)\nBoth should be case-insensitive and ignore spaces.`,
    starterCode: `function isPalindromeBuiltin(s: string): boolean {

}

function isPalindromeTwoPointer(s: string): boolean {

}

console.log(isPalindromeBuiltin("racecar"));  // true
console.log(isPalindromeTwoPointer("A man a plan a canal Panama")); // true
console.log(isPalindromeBuiltin("hello"));    // false
`,
    hints: [
      'Normalize: `.toLowerCase().replace(/\\s/g, "")`',
      'Two-pointer: start `left=0, right=s.length-1`, move inward',
      'Stop as soon as `s[left] !== s[right]`',
    ],
    testCases: [
      { input: 'isPalindromeBuiltin("racecar")', expected: 'true' },
      { input: 'isPalindromeBuiltin("hello")', expected: 'false' },
    ],
  },
  {
    id: 'strings-3',
    title: 'Character Analysis with Regex',
    category: 'strings',
    difficulty: 'medium',
    description: `Given a string, count:\n1. Vowels (a e i o u)\n2. Consonants\n3. Digits\n4. Spaces\n5. Special characters\nReturn an object with all five counts.`,
    starterCode: `interface CharStats {
  vowels: number;
  consonants: number;
  digits: number;
  spaces: number;
  special: number;
}

function analyzeString(s: string): CharStats {

}

console.log(analyzeString("Hello World! 123"));
// { vowels: 3, consonants: 7, digits: 3, spaces: 2, special: 1 }
`,
    hints: [
      'Use `/[aeiou]/i.test(char)` for vowels',
      'Use `/[a-z]/i.test(char)` for letters (then exclude vowels for consonants)',
      'Use `/\\d/.test(char)` for digits',
    ],
    testCases: [
      { input: 'analyzeString("aeiou").vowels', expected: '5' },
      { input: 'analyzeString("abc").consonants', expected: '2' },
    ],
  },
  {
    id: 'strings-4',
    title: 'String Replace & Pad',
    category: 'strings',
    difficulty: 'easy',
    description: `Practice string manipulation:\n1. \`removeSpaces(s)\` — remove all spaces\n2. \`replaceVowels(s, ch)\` — replace all vowels with a given character\n3. \`padCenter(s, width)\` — center a string within a fixed width using \`padStart\`/\`padEnd\``,
    starterCode: `function removeSpaces(s: string): string {

}

function replaceVowels(s: string, ch: string): string {

}

function padCenter(s: string, width: number): string {

}

console.log(removeSpaces("hello world"));    // "helloworld"
console.log(replaceVowels("hello", "*"));    // "h*ll*"
console.log(padCenter("hi", 10));            // "    hi    "
`,
    hints: [
      '`s.replace(/\\s+/g, "")` removes all whitespace',
      '`s.replace(/[aeiou]/gi, ch)` replaces all vowels',
      'Calculate left/right padding from `(width - s.length) / 2`',
    ],
    testCases: [
      { input: 'removeSpaces("hello world")', expected: '"helloworld"' },
      { input: 'replaceVowels("hello", "*")', expected: '"h*ll*"' },
    ],
  },

  // ── NUMBERS ───────────────────────────────────────────────────────────────
  {
    id: 'numbers-1',
    title: 'Factorial',
    category: 'numbers',
    difficulty: 'easy',
    description: `Implement factorial three ways:\n1. \`factRecursive(n)\` — recursive\n2. \`factIterative(n)\` — using a for loop\n3. \`factReduce(n)\` — using \`Array.from\` + \`.reduce()\``,
    starterCode: `function factRecursive(n: number): number {

}

function factIterative(n: number): number {

}

function factReduce(n: number): number {
  // Hint: Array.from({ length: n }, (_, i) => i + 1)

}

console.log(factRecursive(5));  // 120
console.log(factIterative(5));  // 120
console.log(factReduce(5));     // 120
`,
    hints: [
      'Base case: `if (n <= 1) return 1`',
      'Iterative: start with `result = 1`, multiply `i` from 1 to n',
      '`Array.from({ length: n }, (_, i) => i + 1)` gives `[1, 2, …, n]`',
    ],
    testCases: [
      { input: 'factRecursive(5)', expected: '120' },
      { input: 'factIterative(0)', expected: '1' },
    ],
  },
  {
    id: 'numbers-2',
    title: 'Fibonacci Series',
    category: 'numbers',
    difficulty: 'easy',
    description: `1. \`fibonacci(n)\` — return an array of the first n Fibonacci numbers\n2. \`fibEvenOnly(n)\` — return only the even numbers from the first n Fibonacci numbers\n3. \`fibRecursive(n)\` — return the nth Fibonacci number recursively`,
    starterCode: `function fibonacci(n: number): number[] {

}

function fibEvenOnly(n: number): number[] {

}

function fibRecursive(n: number): number {

}

console.log(fibonacci(8));      // [0,1,1,2,3,5,8,13]
console.log(fibEvenOnly(8));    // [0,2,8]
console.log(fibRecursive(7));   // 13
`,
    hints: [
      'Start with `[0, 1]` then push `arr[i-1] + arr[i-2]`',
      'Filter the result with `.filter(n => n % 2 === 0)`',
      'Recursive base: `if (n <= 1) return n`',
    ],
    testCases: [
      { input: 'fibonacci(5)', expected: '[0,1,1,2,3]' },
      { input: 'fibRecursive(6)', expected: '8' },
    ],
  },
  {
    id: 'numbers-3',
    title: 'Prime Numbers',
    category: 'numbers',
    difficulty: 'medium',
    description: `1. \`isPrime(n)\` — return true if n is prime\n2. \`primesInRange(start, end)\` — return all primes between start and end inclusive\n3. \`nextPrime(n)\` — return the first prime greater than n`,
    starterCode: `function isPrime(n: number): boolean {

}

function primesInRange(start: number, end: number): number[] {

}

function nextPrime(n: number): number {

}

console.log(isPrime(17));           // true
console.log(primesInRange(1, 20));  // [2,3,5,7,11,13,17,19]
console.log(nextPrime(10));         // 11
`,
    hints: [
      'Check divisors only up to `Math.sqrt(n)` for efficiency',
      '`n < 2` is never prime; 2 is the only even prime',
      'For nextPrime, start at `n + 1` and increment until isPrime returns true',
    ],
    testCases: [
      { input: 'isPrime(2)', expected: 'true' },
      { input: 'isPrime(4)', expected: 'false' },
      { input: 'nextPrime(10)', expected: '11' },
    ],
  },

  // ── ARRAYS ────────────────────────────────────────────────────────────────
  {
    id: 'arrays-1',
    title: 'Array Filter',
    category: 'arrays',
    difficulty: 'easy',
    description: `Using \`.filter()\`:\n1. \`filterOdd(arr)\` — return only odd numbers\n2. \`filterEven(arr)\` — return only even numbers\n3. \`secondLargest(arr)\` — return the second largest unique number`,
    starterCode: `function filterOdd(arr: number[]): number[] {

}

function filterEven(arr: number[]): number[] {

}

function secondLargest(arr: number[]): number {

}

console.log(filterOdd([1,2,3,4,5]));          // [1,3,5]
console.log(filterEven([1,2,3,4,5]));          // [2,4]
console.log(secondLargest([3,1,4,1,5,9,2,6])); // 6
`,
    hints: [
      'Odd: `n % 2 !== 0`',
      'For secondLargest, deduplicate with Set, sort descending, take index 1',
    ],
    testCases: [
      { input: 'filterOdd([1,2,3]).length', expected: '2' },
      { input: 'secondLargest([5,3,8,1])', expected: '5' },
    ],
  },
  {
    id: 'arrays-2',
    title: 'Array Map',
    category: 'arrays',
    difficulty: 'easy',
    description: `Using \`.map()\`:\n1. \`doubleAll(arr)\` — multiply every number by 2\n2. \`markOddEven(arr)\` — map each number to "odd" or "even"\n3. \`reverseWords(sentence)\` — reverse every word in a sentence`,
    starterCode: `function doubleAll(arr: number[]): number[] {

}

function markOddEven(arr: number[]): string[] {

}

function reverseWords(sentence: string): string {

}

console.log(doubleAll([1,2,3]));              // [2,4,6]
console.log(markOddEven([1,2,3]));            // ["odd","even","odd"]
console.log(reverseWords("hello world"));     // "olleh dlrow"
`,
    hints: [
      'map returns a new array of the same length',
      'Ternary: `n % 2 === 0 ? "even" : "odd"`',
      'Split sentence, map each word through reverseBuiltin, join',
    ],
    testCases: [
      { input: 'doubleAll([1,2,3])[2]', expected: '6' },
      { input: 'markOddEven([4])[0]', expected: '"even"' },
    ],
  },
  {
    id: 'arrays-3',
    title: 'Array Reduce',
    category: 'arrays',
    difficulty: 'medium',
    description: `Using \`.reduce()\`:\n1. \`sumAll(arr)\` — sum all numbers\n2. \`maxValue(arr)\` — find the maximum\n3. \`longestWord(arr)\` — find the longest string in an array\n4. \`wordFrequency(arr)\` — return a frequency map of words`,
    starterCode: `function sumAll(arr: number[]): number {

}

function maxValue(arr: number[]): number {

}

function longestWord(arr: string[]): string {

}

function wordFrequency(arr: string[]): Record<string, number> {

}

console.log(sumAll([1,2,3,4,5]));                   // 15
console.log(maxValue([3,1,4,1,5,9,2,6]));            // 9
console.log(longestWord(["hi","hello","hey"]));       // "hello"
console.log(wordFrequency(["a","b","a","c","b","a"])); // {a:3, b:2, c:1}
`,
    hints: [
      'Accumulator starts at 0 for sum',
      '`Math.max(acc, cur)` works as reducer for max',
      'For frequency: `acc[cur] = (acc[cur] || 0) + 1`',
    ],
    testCases: [
      { input: 'sumAll([1,2,3,4,5])', expected: '15' },
      { input: 'maxValue([3,1,9,2])', expected: '9' },
    ],
  },
  {
    id: 'arrays-4',
    title: 'Array Sort',
    category: 'arrays',
    difficulty: 'medium',
    description: `1. \`sortAsc(arr)\` — sort numbers ascending (immutable, don't mutate input)\n2. \`sortDesc(arr)\` — sort numbers descending\n3. \`sortByLength(arr)\` — sort strings by length (shortest first)\n4. \`bubbleSort(arr)\` — implement bubble sort manually`,
    starterCode: `function sortAsc(arr: number[]): number[] {

}

function sortDesc(arr: number[]): number[] {

}

function sortByLength(arr: string[]): string[] {

}

function bubbleSort(arr: number[]): number[] {

}

console.log(sortAsc([3,1,4,1,5,9]));             // [1,1,3,4,5,9]
console.log(sortByLength(["banana","apple","fig"])); // ["fig","apple","banana"]
console.log(bubbleSort([5,3,8,1,9,2]));           // [1,2,3,5,8,9]
`,
    hints: [
      'Use `[...arr].sort(...)` to avoid mutating the original',
      'Compare: `(a, b) => a - b` for ascending',
      'Bubble sort: nested loops, swap adjacent elements if out of order',
    ],
    testCases: [
      { input: 'sortAsc([3,1,2])[0]', expected: '1' },
      { input: 'sortDesc([3,1,2])[0]', expected: '3' },
    ],
  },

  // ── COLLECTIONS ───────────────────────────────────────────────────────────
  {
    id: 'collections-1',
    title: 'Set Operations',
    category: 'collections',
    difficulty: 'easy',
    description: `Using \`Set\`:\n1. \`removeDuplicates(arr)\` — remove duplicates from an array\n2. \`findDuplicates(arr)\` — return the elements that appear more than once\n3. \`mergeUnique(a, b)\` — merge two arrays keeping only unique values`,
    starterCode: `function removeDuplicates<T>(arr: T[]): T[] {

}

function findDuplicates<T>(arr: T[]): T[] {

}

function mergeUnique<T>(a: T[], b: T[]): T[] {

}

console.log(removeDuplicates([1,2,2,3,3,3])); // [1,2,3]
console.log(findDuplicates([1,2,2,3,1]));      // [2,1]
console.log(mergeUnique([1,2,3],[2,3,4]));      // [1,2,3,4]
`,
    hints: [
      '`[...new Set(arr)]` is the idiomatic dedup',
      'For duplicates: iterate and track a `seen` Set + `dupes` Set',
      'Merge then dedup: `removeDuplicates([...a, ...b])`',
    ],
    testCases: [
      { input: 'removeDuplicates([1,1,2]).length', expected: '2' },
      { input: 'mergeUnique([1,2],[2,3]).length', expected: '3' },
    ],
  },
  {
    id: 'collections-2',
    title: 'HashMap / Map Operations',
    category: 'collections',
    difficulty: 'medium',
    description: `Using \`Map\` or plain objects:\n1. \`charCount(s)\` — count each character's frequency\n2. \`firstNonRepeated(s)\` — find the first non-repeated character\n3. \`areAnagrams(a, b)\` — check if two strings are anagrams`,
    starterCode: `function charCount(s: string): Map<string, number> {

}

function firstNonRepeated(s: string): string | null {

}

function areAnagrams(a: string, b: string): boolean {

}

console.log(charCount("hello"));              // Map { h:1, e:1, l:2, o:1 }
console.log(firstNonRepeated("aabbcde"));     // "c"
console.log(areAnagrams("listen", "silent")); // true
`,
    hints: [
      '`map.set(ch, (map.get(ch) ?? 0) + 1)` increments safely',
      'For firstNonRepeated, build the map then find first entry with count 1',
      'Anagram: sort both strings and compare, or compare their charCount maps',
    ],
    testCases: [
      { input: 'firstNonRepeated("aabb")', expected: 'null' },
      { input: 'areAnagrams("listen","silent")', expected: 'true' },
    ],
  },
  {
    id: 'collections-3',
    title: 'Object Array Search',
    category: 'collections',
    difficulty: 'easy',
    description: `Given an array of Person objects, implement:\n1. \`findByName(people, query)\` — find people whose name contains the query (case-insensitive)\n2. \`groupByAge(people)\` — group people into \`{ young: Person[], senior: Person[] }\` (young < 40)`,
    starterCode: `interface Person {
  name: string;
  age: number;
  email?: string;
}

function findByName(people: Person[], query: string): Person[] {

}

function groupByAge(people: Person[]): { young: Person[]; senior: Person[] } {

}

const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 45 },
  { name: "Alan", age: 22 },
];

console.log(findByName(people, "al")); // Alice, Alan
console.log(groupByAge(people));       // young: [Alice, Alan], senior: [Bob]
`,
    hints: [
      '`name.toLowerCase().includes(query.toLowerCase())`',
      'Use `.reduce()` or two `.filter()` calls for grouping',
    ],
    testCases: [
      { input: 'findByName(people, "al").length', expected: '2' },
    ],
  },

  // ── ALGORITHMS ────────────────────────────────────────────────────────────
  {
    id: 'algorithms-1',
    title: 'Min / Max',
    category: 'algorithms',
    difficulty: 'easy',
    description: `Without using \`Math.min\`/\`Math.max\` or \`.sort()\`:\n1. \`findMin(arr)\` — return the minimum\n2. \`findMax(arr)\` — return the maximum\n3. \`secondLargestUnique(arr)\` — return the second largest unique value`,
    starterCode: `function findMin(arr: number[]): number {

}

function findMax(arr: number[]): number {

}

function secondLargestUnique(arr: number[]): number | null {

}

console.log(findMin([3,1,4,1,5,9,2,6]));         // 1
console.log(findMax([3,1,4,1,5,9,2,6]));         // 9
console.log(secondLargestUnique([3,1,4,1,5,9])); // 5
`,
    hints: [
      'Initialise with the first element, then iterate',
      'For secondLargest: track `max` and `second` in one pass',
      'Handle duplicates by updating `second` only when `cur < max`',
    ],
    testCases: [
      { input: 'findMax([3,1,9,2])', expected: '9' },
      { input: 'findMin([3,1,9,2])', expected: '1' },
    ],
  },
  {
    id: 'algorithms-2',
    title: 'Swap Variables',
    category: 'algorithms',
    difficulty: 'easy',
    description: `Swap two values in three different ways:\n1. \`swapDestructure(a, b)\` — ES6 destructuring\n2. \`swapTemp(a, b)\` — using a temporary variable\n3. \`swapXOR(a, b)\` — XOR bit trick (integers only)\nEach should return \`[newA, newB]\`.`,
    starterCode: `function swapDestructure(a: number, b: number): [number, number] {

}

function swapTemp(a: number, b: number): [number, number] {

}

function swapXOR(a: number, b: number): [number, number] {

}

console.log(swapDestructure(3, 7)); // [7, 3]
console.log(swapTemp(3, 7));        // [7, 3]
console.log(swapXOR(3, 7));         // [7, 3]
`,
    hints: [
      'Destructuring: `[a, b] = [b, a]`',
      'XOR swap: `a ^= b; b ^= a; a ^= b`',
    ],
    testCases: [
      { input: 'swapDestructure(3,7)[0]', expected: '7' },
      { input: 'swapTemp(3,7)[1]', expected: '3' },
    ],
  },
  {
    id: 'algorithms-3',
    title: 'Duplicate Detection',
    category: 'algorithms',
    difficulty: 'medium',
    description: `1. \`hasDuplicates(arr)\` — return true if any value repeats\n2. \`firstDuplicate(arr)\` — return the first element that appears more than once\n3. \`firstNonDuplicate(arr)\` — return the first element that appears exactly once`,
    starterCode: `function hasDuplicates<T>(arr: T[]): boolean {

}

function firstDuplicate<T>(arr: T[]): T | null {

}

function firstNonDuplicate<T>(arr: T[]): T | null {

}

console.log(hasDuplicates([1,2,3,2]));       // true
console.log(firstDuplicate([1,2,3,2,1]));    // 2
console.log(firstNonDuplicate([1,2,3,2,1])); // 3
`,
    hints: [
      '`new Set(arr).size !== arr.length` detects duplicates in O(1) space',
      'Use a Set and check if element was already `seen.has(el)` before adding',
      'Build a frequency map, then find the first element with count 1',
    ],
    testCases: [
      { input: 'hasDuplicates([1,2,3])', expected: 'false' },
      { input: 'firstDuplicate([1,2,2,3])', expected: '2' },
    ],
  },

  // ── OOP ───────────────────────────────────────────────────────────────────
  {
    id: 'oop-1',
    title: 'Class & Methods',
    category: 'oop',
    difficulty: 'medium',
    description: `Build an \`Inventory\` class that manages items:\n- \`add(name, qty)\` — add or update quantity\n- \`remove(name, qty)\` — decrease quantity (throw if insufficient)\n- \`get(name)\` — return current quantity (0 if not found)\n- \`list()\` — return all items as an array of \`{ name, qty }\``,
    starterCode: `class Inventory {
  private items: Map<string, number> = new Map();

  add(name: string, qty: number): void {

  }

  remove(name: string, qty: number): void {

  }

  get(name: string): number {

  }

  list(): { name: string; qty: number }[] {

  }
}

const inv = new Inventory();
inv.add("apple", 5);
inv.add("apple", 3);
console.log(inv.get("apple")); // 8
inv.remove("apple", 2);
console.log(inv.get("apple")); // 6
console.log(inv.list());
`,
    hints: [
      '`this.items.get(name) ?? 0` safely handles missing keys',
      'Throw `new Error("Insufficient stock")` when qty would go negative',
      '`Array.from(this.items.entries()).map(([name, qty]) => ({ name, qty }))`',
    ],
    testCases: [
      { input: 'inv.get("apple") after add(5)+add(3)', expected: '8' },
    ],
  },
  {
    id: 'oop-2',
    title: 'Interfaces & Type Guards',
    category: 'oop',
    difficulty: 'medium',
    description: `1. Define a \`User\` interface with \`id\`, \`name\`, \`email\`, and optional \`age\`\n2. Define an \`Admin\` interface that extends \`User\` with a \`role\` field\n3. Write a type guard \`isAdmin(u)\` that narrows \`User | Admin\` to \`Admin\`\n4. Write \`greet(u)\` that returns different messages for users vs admins`,
    starterCode: `interface User {

}

interface Admin extends User {

}

function isAdmin(u: User | Admin): u is Admin {

}

function greet(u: User | Admin): string {

}

const user: User = { id: 1, name: "Alice", email: "a@example.com" };
const admin: Admin = { id: 2, name: "Bob", email: "b@example.com", role: "superadmin" };

console.log(greet(user));  // "Hello, Alice"
console.log(greet(admin)); // "Hello Admin Bob (superadmin)"
`,
    hints: [
      'Type guard: check `"role" in u`',
      'Inside the type guard body, return a boolean',
      'The `u is Admin` return type is the type predicate syntax',
    ],
    testCases: [
      { input: 'isAdmin(admin)', expected: 'true' },
      { input: 'isAdmin(user)', expected: 'false' },
    ],
  },
  {
    id: 'oop-3',
    title: 'Enum Usage',
    category: 'oop',
    difficulty: 'easy',
    description: `1. Create a string enum \`Direction\` with \`Up, Down, Left, Right\`\n2. Create a numeric enum \`Status\` starting at 1: \`Active, Inactive, Pending\`\n3. Write \`move(dir)\` that returns a descriptive string\n4. Write \`statusLabel(s)\` that returns the enum name as a string`,
    starterCode: `enum Direction {

}

enum Status {

}

function move(dir: Direction): string {

}

function statusLabel(s: Status): string {

}

console.log(move(Direction.Up));         // "Moving up"
console.log(Status.Active);             // 1
console.log(statusLabel(Status.Pending)); // "Pending"
`,
    hints: [
      'String enum: `Up = "UP"` etc.',
      'Numeric enum without values auto-increments from 0 (set first to 1)',
      'Reverse mapping: `Status[s]` gives the name for numeric enums',
    ],
    testCases: [
      { input: 'Status.Active', expected: '1' },
      { input: 'move(Direction.Down)', expected: '"Moving down"' },
    ],
  },
  {
    id: 'oop-4',
    title: 'Static Members',
    category: 'oop',
    difficulty: 'medium',
    description: `Build a \`Counter\` class demonstrating all static concepts:\n1. Static property \`count\` (tracks total instances ever created)\n2. Private static \`maxAllowed\` limit (set to 5)\n3. Static method \`getCount()\`\n4. Static method \`reset()\`\n5. Static block that logs "Counter class loaded"\n6. Instance method \`describe()\` that uses both instance and static data`,
    starterCode: `class Counter {
  // static properties


  // static block


  private name: string;

  constructor(name: string) {
    this.name = name;
    // increment count on each instantiation
  }

  // static methods


  // instance method
  describe(): string {

  }
}

const c1 = new Counter("alpha");
const c2 = new Counter("beta");
console.log(Counter.getCount()); // 2
console.log(c1.describe());      // "alpha — instance 1 of 2"
Counter.reset();
console.log(Counter.getCount()); // 0
`,
    hints: [
      'Static properties belong to the class, not instances',
      'Access static from instance method via `Counter.count` or `(this.constructor as typeof Counter).count`',
      'Static blocks run once when the class is first loaded',
    ],
    testCases: [
      { input: 'Counter.getCount() after 2 instantiations', expected: '2' },
      { input: 'Counter.getCount() after reset()', expected: '0' },
    ],
  },
];

export const CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: 'basics',      label: 'Basics',      icon: '📘' },
  { id: 'strings',     label: 'Strings',     icon: '🔤' },
  { id: 'numbers',     label: 'Numbers',     icon: '🔢' },
  { id: 'arrays',      label: 'Arrays',      icon: '📦' },
  { id: 'collections', label: 'Collections', icon: '🗂️' },
  { id: 'algorithms',  label: 'Algorithms',  icon: '⚙️' },
  { id: 'oop',         label: 'OOP',         icon: '🏗️' },
];
