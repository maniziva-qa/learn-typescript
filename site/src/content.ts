import type { Topic } from './types';

export const topics: Topic[] = [
  // ═══════════════════════════════════════════════════════════════
  // 1. PRIMITIVE TYPES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'primitives',
    title: 'Primitive Types',
    icon: '🔷',
    tagline: 'number, string, boolean, null, undefined, symbol, bigint',
    theory: [
      {
        title: 'The 7 Primitive Types',
        body: 'TypeScript inherits JavaScript\'s primitives and adds static typing on top. You can annotate variables explicitly with ": Type" or let TypeScript infer the type from the initial value. Both styles are valid — prefer inference when the value makes the type obvious.',
        code: `// Explicit annotation
let age: number = 25;
let username: string = "Alice";
let isActive: boolean = true;

// Type inference (preferred when obvious)
let score = 100;          // inferred: number
let greeting = "hello";   // inferred: string
let done = false;         // inferred: boolean

// Other primitives
let id: symbol = Symbol("userId");
let big: bigint = 9007199254740991n;
let nothing: null = null;
let missing: undefined = undefined;`,
      },
      {
        title: 'any vs unknown',
        body: '"any" disables the type checker completely — it is an escape hatch. "unknown" is the type-safe alternative: it forces you to narrow the type before using it. Prefer unknown over any whenever you receive data from an external source (API responses, user input, JSON parsing).',
        code: `// any — dangerous, skips all checks
let value: any = "hello";
value.toFixed(2);     // no compile error, but crashes at runtime!
value = 42;           // also fine — any accepts anything

// unknown — safe, must narrow first
let data: unknown = fetchData();

if (typeof data === "string") {
  console.log(data.toUpperCase()); // ✅ OK after narrowing
}

if (typeof data === "number") {
  console.log(data.toFixed(2));    // ✅ OK after narrowing
}

// data.toUpperCase(); // ❌ Error: data is still 'unknown' here`,
      },
      {
        title: 'void and never',
        body: '"void" is the return type of functions that do not return a value (they return undefined implicitly). "never" is the return type of functions that NEVER complete — they either always throw an error or run forever. TypeScript uses "never" for exhaustiveness checks.',
        code: `// void — function that returns nothing
function logMessage(msg: string): void {
  console.log(msg);
  // implicitly returns undefined
}

// never — function that never returns
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) { /* runs forever */ }
}

// never in exhaustiveness checking
type Shape = "circle" | "square";

function area(s: Shape): number {
  if (s === "circle") return Math.PI;
  if (s === "square") return 1;
  const _: never = s; // TS errors if Shape grows and you forget a case
  return _;
}`,
      },
    ],
    quiz: [
      {
        question: 'What type does TypeScript infer for the variable below?',
        code: 'let score = 100;',
        options: [
          { text: 'any' },
          { text: 'number' },
          { text: 'integer' },
          { text: 'Number (object wrapper)' },
        ],
        correctIndex: 1,
        explanation: 'TypeScript infers `number` (the primitive) from the numeric literal 100. It never infers the object wrapper `Number`.',
      },
      {
        question: 'Which type forces you to narrow before calling methods on it?',
        options: [
          { text: 'any' },
          { text: 'object' },
          { text: 'unknown' },
          { text: 'void' },
        ],
        correctIndex: 2,
        explanation: '`unknown` is the type-safe counterpart to `any`. You must use a type guard (typeof, instanceof, etc.) to narrow it before accessing properties or methods.',
      },
      {
        question: 'What does typeof return at runtime for a variable declared as `any`?',
        code: 'let x: any = 42;\nconsole.log(typeof x); // ?',
        options: [
          { text: '"any"' },
          { text: '"number"' },
          { text: '"any_number"' },
          { text: 'TypeError' },
        ],
        correctIndex: 1,
        explanation: '`any` is a TypeScript-only concept erased at compile time. At runtime, `typeof 42` is `"number"` — the actual JS value is unchanged.',
      },
      {
        question: 'What is the correct return type for a function that always throws?',
        code: 'function fail(msg: string): ??? {\n  throw new Error(msg);\n}',
        options: [
          { text: 'void' },
          { text: 'undefined' },
          { text: 'null' },
          { text: 'never' },
        ],
        correctIndex: 3,
        explanation: '`never` represents values that never occur. Functions that always throw or run forever have return type `never` because they never produce a value.',
      },
      {
        question: 'What does the non-null assertion operator `!` do?',
        code: 'const el = document.getElementById("app")!;',
        options: [
          { text: 'Converts the value to boolean' },
          { text: 'Throws a runtime error if null' },
          { text: 'Tells TypeScript to treat the value as non-null/non-undefined' },
          { text: 'Removes null from memory' },
        ],
        correctIndex: 2,
        explanation: 'The `!` postfix operator is a compile-time assertion — it tells TypeScript you know the value is not null/undefined. It does nothing at runtime, so use it sparingly.',
      },
    ],
    challenge: {
      title: 'Type-Safe Value Inspector',
      description: `Write a function \`inspect(value: unknown): string\` that returns a description of the value:\n- Numbers → "number: 42"\n- Strings → "string: hello"\n- Booleans → "boolean: true"\n- Arrays → "array[3]" (length in brackets)\n- null → "null"\n- undefined → "undefined"\n- Objects → "object{key1,key2}" (sorted keys)\n- Anything else → "other"\n\nUse only typeof, Array.isArray, and null checks — no casting to any.`,
      starterCode: `function inspect(value: unknown): string {
  // your implementation here
}

// Expected output:
console.log(inspect(42));           // "number: 42"
console.log(inspect("hello"));      // "string: hello"
console.log(inspect(true));         // "boolean: true"
console.log(inspect([1, 2, 3]));    // "array[3]"
console.log(inspect(null));         // "null"
console.log(inspect(undefined));    // "undefined"
console.log(inspect({ a: 1, b: 2 })); // "object{a,b}"`,
      hints: [
        'Check for null first: `value === null` before using typeof',
        '`Array.isArray(value)` correctly identifies arrays',
        'For objects, use `Object.keys(value as object).sort().join(",")`',
        'typeof returns one of: "number", "string", "boolean", "undefined", "object", "function", "symbol", "bigint"',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. FUNCTIONS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'functions',
    title: 'Functions',
    icon: '⚡',
    tagline: 'typed parameters, return types, optional, default, rest, overloads',
    theory: [
      {
        title: 'Parameter & Return Types',
        body: 'TypeScript requires you to annotate function parameters. Return types are often inferred, but annotating them explicitly is good practice — it acts as documentation and catches mistakes early. Arrow functions follow the same rules.',
        code: `// Named function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const greet = (name: string): string => \`Hello, \${name}!\`;

// Inferred return type (OK, but explicit is clearer)
function multiply(a: number, b: number) {
  return a * b; // inferred as number
}

// void return
function logError(msg: string): void {
  console.error(msg);
}

// Function as a parameter (callback)
function repeat(n: number, action: (i: number) => void): void {
  for (let i = 0; i < n; i++) action(i);
}`,
      },
      {
        title: 'Optional, Default & Rest Parameters',
        body: 'Optional parameters use "?" and must come after required ones. Default parameters get a fallback value when the argument is omitted or undefined. Rest parameters collect extra arguments into a typed array.',
        code: `// Optional parameter (must come after required)
function greet(name: string, title?: string): string {
  return title ? \`Hello, \${title} \${name}\` : \`Hello, \${name}\`;
}
greet("Alice");           // "Hello, Alice"
greet("Alice", "Dr.");    // "Hello, Dr. Alice"

// Default parameter
function power(base: number, exp: number = 2): number {
  return base ** exp;
}
power(3);    // 9 (uses default)
power(3, 3); // 27

// Rest parameters — must be last
function sum(label: string, ...nums: number[]): string {
  const total = nums.reduce((a, b) => a + b, 0);
  return \`\${label}: \${total}\`;
}
sum("Total", 1, 2, 3, 4); // "Total: 10"`,
      },
      {
        title: 'Function Types & Overloads',
        body: 'You can describe function shapes with type aliases or interfaces. Overloads let you declare multiple call signatures for the same function — useful when the return type depends on the input type. The implementation signature is not visible to callers.',
        code: `// Function type alias
type Comparator = (a: number, b: number) => number;
const ascending: Comparator = (a, b) => a - b;

// Function interface
interface Transformer {
  (input: string): string;
}

// Overloads
function format(x: number): string;
function format(x: string): string;
function format(x: number | string): string {
  if (typeof x === "number") return x.toFixed(2);
  return x.trim();
}

format(3.14159); // "3.14"
format("  hi  "); // "hi"

// Generic function (preview — covered in Generics topic)
function identity<T>(value: T): T {
  return value;
}`,
      },
    ],
    quiz: [
      {
        question: 'What is the TypeScript syntax for an optional parameter?',
        code: 'function greet(name: string, ???title: string): string {}',
        options: [
          { text: 'title: string = undefined' },
          { text: 'title?: string' },
          { text: '?title: string' },
          { text: 'title: string | void' },
        ],
        correctIndex: 1,
        explanation: 'Optional parameters use `?` after the parameter name: `title?: string`. This means the parameter can be `string` or `undefined`.',
      },
      {
        question: 'Where must optional parameters be placed relative to required ones?',
        options: [
          { text: 'Before required parameters' },
          { text: 'After required parameters' },
          { text: 'Anywhere in the list' },
          { text: 'Only at the end, after rest parameters' },
        ],
        correctIndex: 1,
        explanation: 'Optional parameters must come after all required parameters. TypeScript enforces this because callers fill arguments positionally.',
      },
      {
        question: 'What is the inferred type of `...args` in the function below?',
        code: 'function sum(...args: number[]) { return args.reduce((a,b) => a+b, 0); }',
        options: [
          { text: 'number' },
          { text: 'number[]' },
          { text: '...number' },
          { text: 'IArguments' },
        ],
        correctIndex: 1,
        explanation: 'Rest parameters are collected into a typed array. Inside the function, `args` has type `number[]`.',
      },
      {
        question: 'What does a void return type mean?',
        options: [
          { text: 'The function must return null' },
          { text: 'The function returns undefined' },
          { text: 'The caller should ignore the return value' },
          { text: 'Both B and C' },
        ],
        correctIndex: 3,
        explanation: 'A `void` return type means the function is not intended to return a meaningful value. It returns `undefined`, and callers should not use the return value.',
      },
      {
        question: 'In function overloads, which signature is NOT visible to callers?',
        code: `function f(x: string): string;   // (1)
function f(x: number): number;   // (2)
function f(x: any): any { ... }  // (3)`,
        options: [
          { text: 'Signature 1' },
          { text: 'Signature 2' },
          { text: 'Signature 3 (implementation)' },
          { text: 'All are visible' },
        ],
        correctIndex: 2,
        explanation: 'The implementation signature (3) is hidden from callers. Only the overload signatures (1) and (2) appear in IDE autocomplete and type checking.',
      },
    ],
    challenge: {
      title: 'Typed Pipeline',
      description: `Implement a \`pipe\` function that chains transformations:\n\`pipe(value, fn1, fn2, fn3)\` applies each function in sequence, passing the result of one to the next.\n\nRequirements:\n1. \`pipe<T>(value: T, ...fns: Array<(x: T) => T>): T\`\n2. Works with any type T\n3. Returns the original value if no functions are provided\n4. Also implement \`pipe2<A, B, C>(value: A, f1: (x: A) => B, f2: (x: B) => C): C\` — a 2-step pipe with different types at each step`,
      starterCode: `// Single-type pipe
function pipe<T>(value: T, ...fns: Array<(x: T) => T>): T {
  // apply each fn in sequence
}

// Two-step pipe with type transformation
function pipe2<A, B, C>(value: A, f1: (x: A) => B, f2: (x: B) => C): C {
  // apply f1 then f2
}

// Test pipe
const result = pipe(
  "  hello world  ",
  (s) => s.trim(),
  (s) => s.toUpperCase(),
  (s) => s.replace(" ", "_"),
);
console.log(result); // "HELLO_WORLD"

// Test pipe2
const len = pipe2("hello", (s) => s.length, (n) => n * 2);
console.log(len); // 10`,
      hints: [
        'Use `.reduce()` to apply each function: `fns.reduce((acc, fn) => fn(acc), value)`',
        'pipe2 simply calls f2(f1(value))',
        'The generic type parameter T ensures all functions in pipe share the same type',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. INTERFACES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'interfaces',
    title: 'Interfaces',
    icon: '📐',
    tagline: 'shape contracts, optional props, readonly, extending, declaration merging',
    theory: [
      {
        title: 'Defining Interfaces',
        body: 'An interface describes the shape of an object — the properties it must have and their types. TypeScript uses structural typing: an object satisfies an interface if it has all required properties, regardless of how it was created (no explicit "implements" needed for plain objects).',
        code: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;          // optional property
  readonly createdAt: Date; // cannot be reassigned after creation
}

// Satisfies the interface structurally
const alice: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date(),
};

// alice.createdAt = new Date(); // ❌ Error: readonly

// Functions in interfaces
interface Logger {
  log(message: string): void;
  warn(message: string): void;
  error?: (message: string) => void; // optional method
}`,
      },
      {
        title: 'Extending Interfaces',
        body: 'Interfaces can extend one or more other interfaces, inheriting all their members. This is great for building type hierarchies. A class can implement an interface, forcing it to provide all required members.',
        code: `interface Animal {
  name: string;
  speak(): string;
}

interface Pet extends Animal {
  owner: string;
}

interface ServiceAnimal extends Animal, Pet {
  registrationId: string;
}

// Class implementation
class Dog implements Pet {
  constructor(public name: string, public owner: string) {}
  speak(): string { return "Woof!"; }
}

// Multiple interface extension
const guide: ServiceAnimal = {
  name: "Rex",
  owner: "Bob",
  registrationId: "SA-001",
  speak: () => "Woof",
};`,
      },
      {
        title: 'Index Signatures & Declaration Merging',
        body: 'Index signatures describe objects used as dictionaries. Declaration merging lets you add properties to an existing interface across multiple declarations — useful for augmenting library types.',
        code: `// Index signature: any string key, number value
interface ScoreMap {
  [player: string]: number;
}
const scores: ScoreMap = { alice: 95, bob: 87 };

// Index + known properties (known props must match index type)
interface Config {
  [key: string]: string | number;
  timeout: number;   // must be string | number
  host: string;      // must be string | number
}

// Declaration merging (same name = merged)
interface Window {
  myApp: string;  // adds to the global Window interface
}`,
      },
    ],
    quiz: [
      {
        question: 'What does the `readonly` modifier on an interface property mean?',
        options: [
          { text: 'The property cannot exist at all' },
          { text: 'The property can be read but not reassigned after object creation' },
          { text: 'The property is optional' },
          { text: 'The property is private' },
        ],
        correctIndex: 1,
        explanation: '`readonly` prevents the property from being reassigned after the object is created. The property must still be set during initialization.',
      },
      {
        question: 'TypeScript uses structural typing. What does this mean?',
        options: [
          { text: 'Objects must use the "implements" keyword' },
          { text: 'Types are compatible if they have the same structure (same properties)' },
          { text: 'Class hierarchies must match interface hierarchies' },
          { text: 'All interfaces must be declared in a single file' },
        ],
        correctIndex: 1,
        explanation: 'Structural typing (duck typing) means: if an object has all the required properties of an interface, it satisfies it — regardless of how it was created or what it\'s explicitly declared as.',
      },
      {
        question: 'Can an interface extend multiple interfaces?',
        code: 'interface C extends A, B { ... }',
        options: [
          { text: 'No, only one at a time' },
          { text: 'Yes, comma-separated' },
          { text: 'Yes, but only with type aliases' },
          { text: 'Only if A and B have no overlapping properties' },
        ],
        correctIndex: 1,
        explanation: 'Interfaces can extend multiple interfaces: `interface C extends A, B`. If A and B have a property with the same name, the types must be compatible.',
      },
      {
        question: 'What is "declaration merging" in TypeScript?',
        options: [
          { text: 'Combining two files into one during compilation' },
          { text: 'Declaring the same interface name twice to add more properties' },
          { text: 'Merging a class and an interface' },
          { text: 'Joining two type unions' },
        ],
        correctIndex: 1,
        explanation: 'When you declare an interface with the same name multiple times, TypeScript merges them. This is commonly used to augment library types (e.g., adding properties to the global `Window` interface).',
      },
      {
        question: 'Which property syntax makes a property optional in an interface?',
        options: [
          { text: 'name: string | undefined' },
          { text: 'name?: string' },
          { text: 'optional name: string' },
          { text: 'name: string = ""' },
        ],
        correctIndex: 1,
        explanation: '`name?: string` makes the property optional — it can be `string` or absent entirely. `name: string | undefined` still requires the key to be present (just with a possibly-undefined value).',
      },
    ],
    challenge: {
      title: 'Builder Pattern with Interfaces',
      description: `Design a \`QueryBuilder\` interface and implement it:\n\nThe builder should:\n1. \`select(...fields: string[])\` — specify fields to select (returns \`this\`)\n2. \`from(table: string)\` — set the table (returns \`this\`)\n3. \`where(condition: string)\` — add a WHERE clause (returns \`this\`)\n4. \`limit(n: number)\` — limit results (returns \`this\`)\n5. \`build(): string\` — return the final SQL string\n\nChaining should work: \`new Query().from("users").select("id","name").where("age > 18").limit(10).build()\``,
      starterCode: `interface IQueryBuilder {
  select(...fields: string[]): this;
  from(table: string): this;
  where(condition: string): this;
  limit(n: number): this;
  build(): string;
}

class QueryBuilder implements IQueryBuilder {
  private _fields: string[] = ["*"];
  private _table = "";
  private _where = "";
  private _limit = 0;

  select(...fields: string[]): this {
    // your code
    return this;
  }

  from(table: string): this {
    // your code
    return this;
  }

  where(condition: string): this {
    // your code
    return this;
  }

  limit(n: number): this {
    // your code
    return this;
  }

  build(): string {
    // Assemble: SELECT fields FROM table [WHERE condition] [LIMIT n]
  }
}

const sql = new QueryBuilder()
  .from("users")
  .select("id", "name", "email")
  .where("age > 18")
  .limit(10)
  .build();

console.log(sql);
// SELECT id, name, email FROM users WHERE age > 18 LIMIT 10`,
      hints: [
        'Store state in private properties, update them in each method, return `this`',
        'In `build()`, conditionally append WHERE and LIMIT only if they were set',
        '`return this` enables method chaining; TypeScript infers the return type as `this` for subclass support',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. TYPE ALIASES & UNION TYPES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'types-unions',
    title: 'Type Aliases & Unions',
    icon: '🔀',
    tagline: 'type aliases, union |, intersection &, literal types, discriminated unions',
    theory: [
      {
        title: 'Type Aliases',
        body: 'The `type` keyword creates an alias for any type — primitives, unions, tuples, objects, functions. Unlike interfaces, type aliases cannot be re-opened (no declaration merging), but they are more flexible: you can alias unions, intersections, tuples, and mapped types.',
        code: `// Alias a primitive
type UserId = number;
type Username = string;

// Alias an object shape (similar to interface)
type Point = { x: number; y: number };

// Alias a function type
type Formatter = (value: unknown) => string;

// Alias a tuple
type RGB = [red: number, green: number, blue: number];
const red: RGB = [255, 0, 0];

// Alias a union (only possible with type, not interface)
type ID = number | string;
type Status = "active" | "inactive" | "pending";`,
      },
      {
        title: 'Union & Intersection Types',
        body: 'A union type (|) means a value can be one of several types. An intersection type (&) combines multiple types — the value must satisfy ALL of them. Intersections are often used to merge object types.',
        code: `// Union: one OR another
type Result = string | number | boolean;

function formatId(id: string | number): string {
  if (typeof id === "string") return id.toUpperCase();
  return id.toString();
}

// Intersection: both at the same time
type Named = { name: string };
type Aged  = { age: number };
type Person = Named & Aged;

const alice: Person = { name: "Alice", age: 30 }; // must have both

// Merging with spread equivalent
type AdminUser = Person & { role: string; permissions: string[] };`,
      },
      {
        title: 'Literal Types & Discriminated Unions',
        body: 'Literal types narrow a type to a specific value ("GET", 200, true). Discriminated unions use a shared literal property (the "discriminant") to let TypeScript narrow the type in a switch/if block — this is one of the most powerful TypeScript patterns.',
        code: `// Literal types
type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Bit = 0 | 1;

// Discriminated union — "kind" is the discriminant
type Shape =
  | { kind: "circle";    radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle";  base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return 0.5 * shape.base * shape.height;
  }
}`,
      },
    ],
    quiz: [
      {
        question: 'What is the key difference between `interface` and `type`?',
        options: [
          { text: 'type is faster than interface' },
          { text: 'interface can be extended and merged; type cannot be re-opened but can alias unions/tuples' },
          { text: 'type cannot describe objects' },
          { text: 'interface is deprecated in modern TypeScript' },
        ],
        correctIndex: 1,
        explanation: 'Both can describe object shapes. Key difference: interfaces support declaration merging (adding properties later); type aliases are closed but can alias unions, tuples, mapped types, and other complex forms.',
      },
      {
        question: 'What does this union mean: `type ID = string | number`?',
        options: [
          { text: 'ID must be both a string AND a number' },
          { text: 'ID must be a string that contains a number' },
          { text: 'ID can be either a string OR a number' },
          { text: 'ID must be a string, then converted to a number' },
        ],
        correctIndex: 2,
        explanation: 'Union types (`|`) mean "either this or that". A value of type `string | number` can hold a string or a number, but TypeScript will require you to check which one before using type-specific methods.',
      },
      {
        question: 'What does an intersection type `A & B` require?',
        options: [
          { text: 'A value that satisfies A or B' },
          { text: 'A value that satisfies both A and B' },
          { text: 'A new type that combines A and B into an array' },
          { text: 'Types A and B must not have overlapping properties' },
        ],
        correctIndex: 1,
        explanation: 'Intersection types (`&`) require a value to satisfy ALL combined types simultaneously. For object types, the result has all properties from both types.',
      },
      {
        question: 'What is a "discriminated union" discriminant?',
        options: [
          { text: 'A required property that is unique to each union member' },
          { text: 'A shared literal-typed property used to narrow the type' },
          { text: 'A private class property' },
          { text: 'A runtime type tag added by the compiler' },
        ],
        correctIndex: 1,
        explanation: 'A discriminant is a shared property with a unique literal type in each union member (like `kind: "circle"` vs `kind: "square"`). TypeScript uses it to narrow the type in switch/if blocks automatically.',
      },
      {
        question: 'What TypeScript feature ensures all cases are handled in a switch?',
        code: `type Shape = "circle" | "square";
function draw(s: Shape): void {
  switch (s) {
    case "circle": return;
    case "square": return;
    default:
      const _exhaustive: never = s; // <-- what does this do?
  }
}`,
        options: [
          { text: 'Nothing — it is just a comment' },
          { text: 'Assigns never at runtime for performance' },
          { text: 'Causes a compile error if a Shape variant is added but not handled' },
          { text: 'Prevents JavaScript from executing the default block' },
        ],
        correctIndex: 2,
        explanation: 'If you add a new variant to `Shape` but forget to handle it, TypeScript will error at `const _exhaustive: never = s` because `s` would have that unhandled type, which is not assignable to `never`. This is exhaustiveness checking.',
      },
    ],
    challenge: {
      title: 'Result Type (Error Handling)',
      description: `Implement a \`Result<T, E>\` discriminated union for error handling without exceptions:\n\n\`type Result<T, E = Error> = Ok<T> | Err<E>\`\n\nImplement:\n1. The \`Ok<T>\` and \`Err<E>\` types (with discriminant \`ok: true/false\`)\n2. Helper functions \`ok(value)\` and \`err(error)\`\n3. \`map<T, U, E>(result, fn): Result<U, E>\` — transform the value if Ok, pass through if Err\n4. \`unwrapOr<T, E>(result, fallback): T\` — get the value or a fallback\n5. Use it: parse a JSON string safely, returning \`Ok<unknown>\` or \`Err<Error>\``,
      starterCode: `type Ok<T> = { ok: true; value: T };
type Err<E> = { ok: false; error: E };
type Result<T, E = Error> = Ok<T> | Err<E>;

function ok<T>(value: T): Ok<T> {
  // your code
}

function err<E>(error: E): Err<E> {
  // your code
}

function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  // your code
}

function unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
  // your code
}

// Safe JSON parser
function parseJSON(input: string): Result<unknown> {
  // your code — wrap JSON.parse in try/catch
}

// Test
const r1 = parseJSON('{"name":"Alice"}');
const r2 = parseJSON("not valid json");

console.log(r1); // Ok { value: { name: "Alice" } }
console.log(r2); // Err { error: SyntaxError... }

const name = map(r1, (v) => (v as any).name);
console.log(unwrapOr(name, "unknown")); // "Alice"`,
      hints: [
        '`ok(value)` returns `{ ok: true, value }`; `err(error)` returns `{ ok: false, error }`',
        'In `map`, check `result.ok` — if true, return `ok(fn(result.value))`; else return the Err unchanged',
        'In `parseJSON`, wrap `JSON.parse(input)` in a try/catch and return ok/err accordingly',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. CLASSES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'classes',
    title: 'Classes',
    icon: '🏗️',
    tagline: 'access modifiers, inheritance, abstract classes, static, parameter properties',
    theory: [
      {
        title: 'Access Modifiers & Parameter Properties',
        body: 'TypeScript adds access modifiers to classes: public (default), private, protected, and readonly. A shorthand "parameter property" in the constructor prefixes a parameter with an access modifier — TypeScript automatically creates and assigns the property.',
        code: `class Person {
  // Explicit property declarations
  readonly id: number;
  protected age: number;
  private _secret: string = "shh";

  // Parameter properties (shorthand — same as above but inline)
  constructor(
    public name: string,    // creates and assigns this.name
    readonly createdAt = new Date()
  ) {
    this.id = Math.random();
    this.age = 0;
  }

  greet(): string {
    return \`Hi, I'm \${this.name}\`;
  }
}

const p = new Person("Alice");
console.log(p.name);       // ✅ public
// console.log(p._secret); // ❌ private
// console.log(p.age);     // ❌ protected (accessible in subclasses)`,
      },
      {
        title: 'Inheritance & Method Overriding',
        body: 'Classes extend one parent class. The `super()` call in the constructor runs the parent\'s constructor. Methods can be overridden; use `override` keyword (TS 4.3+) to make the intent explicit and catch typos. Abstract methods must be implemented by subclasses.',
        code: `class Animal {
  constructor(public name: string) {}

  speak(): string {
    return \`\${this.name} makes a noise\`;
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // must call before using 'this'
  }

  override speak(): string {    // override keyword (TS 4.3+)
    return \`\${this.name} barks!\`;
  }
}

// Abstract class — cannot be instantiated directly
abstract class Shape {
  abstract area(): number;      // must be implemented
  toString(): string {
    return \`Area: \${this.area()}\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}`,
      },
      {
        title: 'Static Members & Getters/Setters',
        body: 'Static properties and methods belong to the class itself, not instances. They are accessed via the class name. Getters and setters let you control property access with computed logic.',
        code: `class Counter {
  private static _count = 0;

  static getCount(): number { return Counter._count; }
  static reset(): void      { Counter._count = 0; }

  constructor(public name: string) {
    Counter._count++;
  }
}

const a = new Counter("alpha");
const b = new Counter("beta");
console.log(Counter.getCount()); // 2

// Getters and setters
class Temperature {
  private _celsius: number = 0;

  get fahrenheit(): number {
    return this._celsius * 9/5 + 32;
  }

  set fahrenheit(f: number) {
    this._celsius = (f - 32) * 5/9;
  }

  get celsius(): number { return this._celsius; }
  set celsius(c: number) { this._celsius = c; }
}

const temp = new Temperature();
temp.fahrenheit = 212;
console.log(temp.celsius); // 100`,
      },
    ],
    quiz: [
      {
        question: 'What does `protected` mean on a class property?',
        options: [
          { text: 'Accessible only within the class itself' },
          { text: 'Accessible within the class and its subclasses' },
          { text: 'Accessible from anywhere (same as public)' },
          { text: 'Accessible only in the same file' },
        ],
        correctIndex: 1,
        explanation: '`protected` makes a member accessible within the declaring class and all its subclasses, but not from outside. `private` restricts to the class itself; `public` is unrestricted.',
      },
      {
        question: 'What is a "parameter property"?',
        code: 'constructor(public name: string, private age: number) {}',
        options: [
          { text: 'A parameter with a default value' },
          { text: 'A shorthand that creates and assigns a class property from a constructor parameter' },
          { text: 'A parameter passed to a parent constructor' },
          { text: 'An optional constructor parameter' },
        ],
        correctIndex: 1,
        explanation: 'Prefixing a constructor parameter with `public`, `private`, `protected`, or `readonly` creates a class property and assigns the argument to it automatically — equivalent to declaring the property and `this.name = name` inside the body.',
      },
      {
        question: 'What does the `abstract` keyword prevent?',
        options: [
          { text: 'The class from being exported' },
          { text: 'The class from being instantiated with `new`' },
          { text: 'Subclasses from overriding methods' },
          { text: 'Static methods from being called' },
        ],
        correctIndex: 1,
        explanation: 'An abstract class cannot be directly instantiated with `new`. It serves as a base class template. Concrete subclasses must implement all abstract methods.',
      },
      {
        question: 'How do you access a static property of a class?',
        options: [
          { text: 'Via `this.property` inside any method' },
          { text: 'Via `ClassName.property` (on the class itself)' },
          { text: 'Via `super.property` in subclasses' },
          { text: 'Via `instance.property` on any instance' },
        ],
        correctIndex: 1,
        explanation: 'Static members belong to the class constructor, not instances. Access them via `ClassName.property`. Inside the class, you can also use `this.constructor` (with careful typing).',
      },
      {
        question: 'What happens if you call `super()` AFTER using `this` in a subclass constructor?',
        options: [
          { text: 'TypeScript silently reorders the calls' },
          { text: 'A compile-time error: super must be called before this' },
          { text: 'Nothing — the order does not matter' },
          { text: 'Only a runtime error, not a compile error' },
        ],
        correctIndex: 1,
        explanation: 'TypeScript enforces that `super()` is called before any reference to `this` in a subclass constructor. This matches JavaScript\'s runtime requirement.',
      },
    ],
    challenge: {
      title: 'Event Emitter',
      description: `Build a typed \`EventEmitter<Events>\` class where Events is a map of event names to their payload types:\n\nExample: \`EventEmitter<{ click: MouseEvent; resize: { width: number; height: number } }>\`\n\nImplement:\n1. \`on(event, listener)\` — register a listener\n2. \`off(event, listener)\` — remove a listener\n3. \`emit(event, payload)\` — call all listeners for that event\n4. \`once(event, listener)\` — fire once then auto-remove\n\nAll methods must be fully typed — the listener's parameter type should match the payload type of the event.`,
      starterCode: `type EventMap = Record<string, unknown>;

class EventEmitter<Events extends EventMap> {
  private listeners: {
    [K in keyof Events]?: Array<(payload: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): this {
    // your code
    return this;
  }

  off<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): this {
    // your code
    return this;
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    // your code
  }

  once<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): this {
    // wrap listener: call original, then call off
    return this;
  }
}

// Test
type AppEvents = {
  login: { userId: string; timestamp: Date };
  logout: { userId: string };
  error: Error;
};

const emitter = new EventEmitter<AppEvents>();

emitter.on("login", ({ userId }) => console.log("Logged in:", userId));
emitter.once("error", (err) => console.log("Error:", err.message));

emitter.emit("login", { userId: "u1", timestamp: new Date() });
emitter.emit("error", new Error("something went wrong"));
emitter.emit("error", new Error("this won't print — once already fired"));`,
      hints: [
        'Initialize `this.listeners[event]` as an empty array if it does not exist',
        'For `off`, use `.filter()` to remove the specific listener function reference',
        'For `once`, create a wrapper function that calls the original listener then calls `this.off(event, wrapper)`',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. GENERICS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'generics',
    title: 'Generics',
    icon: '🧬',
    tagline: 'type parameters, constraints, defaults, generic interfaces & classes',
    theory: [
      {
        title: 'Generic Functions',
        body: 'Generics let you write reusable code that works with multiple types while preserving type information. A type parameter (conventionally T, U, K, V) acts as a placeholder filled in when the function is called — either explicitly or inferred from the argument.',
        code: `// Without generics: loses type info
function firstAny(arr: any[]): any { return arr[0]; }
const x = firstAny([1, 2, 3]); // type: any 😕

// With generics: type preserved
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const n = first([1, 2, 3]);        // type: number ✅
const s = first(["a", "b"]);       // type: string ✅
const e = first<boolean>([]);      // type: boolean | undefined ✅

// Multiple type parameters
function zip<A, B>(a: A[], b: B[]): [A, B][] {
  return a.map((item, i) => [item, b[i]]);
}
zip([1, 2], ["a", "b"]); // [number, string][]`,
      },
      {
        title: 'Generic Constraints',
        body: 'Use `extends` to restrict which types can be passed as a type argument. This lets you access properties on the type parameter that would otherwise be unknown. You can also constrain one type parameter relative to another with `keyof`.',
        code: `// Constraint: T must have a .length property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest("hello", "hi");          // ✅ strings have length
longest([1, 2, 3], [1, 2]);      // ✅ arrays have length
// longest(10, 20);               // ❌ number has no length

// keyof constraint — K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { id: 1, name: "Alice", active: true };
getProperty(user, "name");     // type: string ✅
getProperty(user, "id");       // type: number ✅
// getProperty(user, "foo");   // ❌ "foo" not a key of user`,
      },
      {
        title: 'Generic Interfaces, Classes & Defaults',
        body: 'Interfaces and classes can also be generic. Default type parameters (like default function parameters) let callers omit the type argument when the default is acceptable.',
        code: `// Generic interface
interface Repository<T, ID = number> {
  findById(id: ID): T | undefined;
  save(entity: T): T;
  delete(id: ID): void;
  findAll(): T[];
}

// Generic class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  get size(): number { return this.items.length; }
  isEmpty(): boolean { return this.items.length === 0; }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
console.log(numStack.pop()); // 2

// Default type parameter
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
}`,
      },
    ],
    quiz: [
      {
        question: 'What does the type parameter `T` represent in `function first<T>(arr: T[]): T`?',
        options: [
          { text: 'A class named T' },
          { text: 'A placeholder type filled in by the caller or inferred from the argument' },
          { text: 'The string "T"' },
          { text: 'The TypeScript built-in top type' },
        ],
        correctIndex: 1,
        explanation: '`T` is a type variable — it captures whatever type is passed (or inferred). When you call `first([1,2,3])`, TypeScript infers `T = number`, so the return type is `number`.',
      },
      {
        question: 'What does `T extends { length: number }` mean?',
        options: [
          { text: 'T must be a class that extends LengthClass' },
          { text: 'T is constrained to types that have a numeric length property' },
          { text: 'T extends the number type' },
          { text: 'T must be exactly { length: number }' },
        ],
        correctIndex: 1,
        explanation: 'Generic constraints use `extends` to require the type argument to satisfy a minimum shape. `T extends { length: number }` means T can be any type that has a `length: number` property (strings, arrays, etc.).',
      },
      {
        question: 'What is the type of `x` below?',
        code: `function identity<T>(value: T): T { return value; }
const x = identity("hello");`,
        options: [
          { text: 'any' },
          { text: 'unknown' },
          { text: 'string' },
          { text: 'T' },
        ],
        correctIndex: 2,
        explanation: 'TypeScript infers `T = string` from the argument `"hello"`, so the return type is `string`. Generics preserve the specific type — that\'s their purpose.',
      },
      {
        question: 'What does `K extends keyof T` constrain K to?',
        options: [
          { text: 'K must be a subclass of T' },
          { text: 'K must be one of the property names (keys) of type T' },
          { text: 'K must be the same type as T' },
          { text: 'K must be a string key' },
        ],
        correctIndex: 1,
        explanation: '`keyof T` produces a union of all property names of T. `K extends keyof T` means K must be one of those names — enabling safe property access with `obj[key]`.',
      },
      {
        question: 'How do you provide a default type parameter?',
        code: 'interface Response<T ???> { data: T; status: number; }',
        options: [
          { text: 'T = unknown' },
          { text: 'T: unknown' },
          { text: 'T | unknown' },
          { text: 'T extends unknown = unknown' },
        ],
        correctIndex: 0,
        explanation: 'Default type parameters use `=`: `interface Response<T = unknown>`. Callers can omit T (using the default `unknown`) or provide a specific type: `Response<User>`.',
      },
    ],
    challenge: {
      title: 'Generic Data Structures',
      description: `Implement two generic data structures:\n\n**1. Queue<T>** — FIFO:\n- \`enqueue(item: T): void\`\n- \`dequeue(): T | undefined\`\n- \`peek(): T | undefined\`\n- \`size: number\` (getter)\n\n**2. LRU Cache<K, V>** (Least Recently Used):\n- Constructor takes \`capacity: number\`\n- \`get(key: K): V | undefined\` — returns value and marks as recently used\n- \`set(key: K, value: V): void\` — adds entry; if at capacity, evicts least recently used\n- \`has(key: K): boolean\``,
      starterCode: `class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void { /* */ }
  dequeue(): T | undefined { /* */ }
  peek(): T | undefined { /* */ }
  get size(): number { return 0; }
}

class LRUCache<K, V> {
  private capacity: number;
  // Hint: use a Map to maintain insertion/access order
  private cache = new Map<K, V>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    // Move to most-recently-used position when accessed
  }

  set(key: K, value: V): void {
    // Evict oldest if at capacity
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }
}

// Tests
const q = new Queue<number>();
q.enqueue(1); q.enqueue(2); q.enqueue(3);
console.log(q.dequeue()); // 1
console.log(q.size);      // 2

const lru = new LRUCache<string, number>(3);
lru.set("a", 1); lru.set("b", 2); lru.set("c", 3);
lru.get("a");   // access a -> b is now LRU
lru.set("d", 4); // evicts b
console.log(lru.has("b")); // false
console.log(lru.has("a")); // true`,
      hints: [
        'Queue: `enqueue` uses `.push()`, `dequeue` uses `.shift()`',
        'LRU: JavaScript `Map` maintains insertion order. When you `get` a key, delete it and re-insert it to move it to the end',
        'LRU `set`: if key exists, delete first (to re-insert at end). If at capacity, delete the first entry: `this.cache.delete(this.cache.keys().next().value)`',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. ENUMS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'enums',
    title: 'Enums',
    icon: '🏷️',
    tagline: 'numeric enums, string enums, const enums, reverse mapping',
    theory: [
      {
        title: 'Numeric & String Enums',
        body: 'Numeric enums auto-increment from 0 (or a given start). String enums require explicit string values and are more debuggable — the value is a readable string, not an opaque number. Prefer string enums in most cases.',
        code: `// Numeric enum — auto-increments
enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right,  // 3
}
console.log(Direction.Up);    // 0
console.log(Direction[0]);    // "Up"  ← reverse mapping (numeric only)

// Custom start value
enum HttpStatus {
  OK         = 200,
  Created    = 201,
  BadRequest = 400,
  NotFound   = 404,
  ServerError = 500,
}

// String enum — no reverse mapping, but more readable
enum Color {
  Red   = "RED",
  Green = "GREEN",
  Blue  = "BLUE",
}
console.log(Color.Red);  // "RED"`,
      },
      {
        title: 'Const Enums & Enum as Types',
        body: 'Const enums are inlined at compile time — the enum object is completely erased, replaced by its literal values. This produces smaller output. You can use enum members as types and use "keyof typeof" to get the set of enum names.',
        code: `// const enum — fully erased, inlined at compile time
const enum Weekday {
  Mon = 1, Tue, Wed, Thu, Fri,
}
const day: Weekday = Weekday.Mon; // compiled to: const day = 1;

// Using enum members as types
enum Permission {
  Read  = "READ",
  Write = "WRITE",
  Admin = "ADMIN",
}

interface UserRole {
  name: string;
  permissions: Permission[]; // array of Permission members
}

// keyof typeof — get names of enum members as a union
type PermissionKey = keyof typeof Permission; // "Read" | "Write" | "Admin"

// Iterating enum values
const allPermissions = Object.values(Permission);
// ["READ", "WRITE", "ADMIN"]`,
      },
      {
        title: 'When to Use Enums vs Union Types',
        body: 'Enums exist at runtime as objects, which means they can be iterated. Union literal types are compile-only and have zero runtime cost. For simple flag sets or when you need to iterate all values, enums are good. For most other cases, union types are lighter and preferred by many style guides.',
        code: `// Enum: exists at runtime, can iterate
enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }
const statuses = Object.values(Status); // ["ACTIVE", "INACTIVE"]

// Union type: compile-only, zero runtime cost
type StatusType = "ACTIVE" | "INACTIVE";
// Cannot iterate all values without an explicit array

// A common pattern: union type + const array
const STATUS_VALUES = ["ACTIVE", "INACTIVE"] as const;
type StatusType2 = (typeof STATUS_VALUES)[number]; // "ACTIVE" | "INACTIVE"

// Enum as a namespace for related constants
enum Config {
  MaxRetries = 3,
  TimeoutMs  = 5000,
  BaseUrl    = "https://api.example.com",
}`,
      },
    ],
    quiz: [
      {
        question: 'What value does `Direction.Down` have in this enum?',
        code: `enum Direction { Up, Down, Left, Right }`,
        options: [
          { text: '0' },
          { text: '1' },
          { text: '"Down"' },
          { text: 'undefined' },
        ],
        correctIndex: 1,
        explanation: 'Numeric enums auto-increment from 0. `Up = 0`, `Down = 1`, `Left = 2`, `Right = 3`.',
      },
      {
        question: 'Which kind of enum supports reverse mapping (e.g., `Status[200]` → `"OK"`)?',
        options: [
          { text: 'String enums' },
          { text: 'Numeric enums' },
          { text: 'Both numeric and string enums' },
          { text: 'const enums' },
        ],
        correctIndex: 1,
        explanation: 'Only numeric enums support reverse mapping — TypeScript compiles them with a bidirectional object. String enums do NOT have reverse mapping.',
      },
      {
        question: 'What does `const enum` do differently from a regular enum?',
        options: [
          { text: 'It makes all members readonly at runtime' },
          { text: 'It is inlined as literals at compile time — the enum object is erased' },
          { text: 'It allows only constant expressions as values' },
          { text: 'It prevents the enum from being exported' },
        ],
        correctIndex: 1,
        explanation: '`const enum` values are inlined (substituted) at every usage site during compilation. The resulting JavaScript has no enum object — just the literal values. This reduces output size.',
      },
      {
        question: 'How do you get all the member names of an enum as a TypeScript union type?',
        code: 'enum Color { Red = "RED", Green = "GREEN" }',
        options: [
          { text: 'keyof Color' },
          { text: 'keyof typeof Color' },
          { text: 'typeof Color' },
          { text: 'Color.keys()' },
        ],
        correctIndex: 1,
        explanation: '`keyof typeof Color` gives `"Red" | "Green"` — the enum member names. `typeof Color` gives the type of the enum object itself; `keyof` then extracts its keys.',
      },
      {
        question: 'When is a union of string literals preferred over an enum?',
        options: [
          { text: 'When you need to iterate all possible values at runtime' },
          { text: 'When you want zero runtime overhead and compile-only types' },
          { text: 'When values need to auto-increment' },
          { text: 'When using const enums is not possible' },
        ],
        correctIndex: 1,
        explanation: 'Union types like `"active" | "inactive"` exist only at compile time with zero runtime cost. They are preferred when you don\'t need to iterate values or use the enum as a runtime object.',
      },
    ],
    challenge: {
      title: 'State Machine with Enums',
      description: `Build a typed traffic light state machine using enums:\n\n1. Define a \`TrafficLight\` string enum: Red, Yellow, Green\n2. Define a \`Transition\` string enum: Stop, Slow, Go\n3. Implement \`transition(state: TrafficLight, action: Transition): TrafficLight\` — returns the next state\n4. Define the valid transitions:\n   - Green + Slow → Yellow\n   - Yellow + Stop → Red\n   - Red + Go → Green\n   - Any invalid combo → throw an Error\n5. Implement \`cycle(state: TrafficLight): TrafficLight\` — auto-advances to next state in the cycle`,
      starterCode: `enum TrafficLight {
  Red    = "RED",
  Yellow = "YELLOW",
  Green  = "GREEN",
}

enum Transition {
  Stop = "STOP",
  Slow = "SLOW",
  Go   = "GO",
}

function transition(state: TrafficLight, action: Transition): TrafficLight {
  // implement valid transitions
  // throw Error for invalid combos
}

function cycle(state: TrafficLight): TrafficLight {
  // Green -> Yellow -> Red -> Green
}

// Test
console.log(transition(TrafficLight.Green, Transition.Slow));   // YELLOW
console.log(transition(TrafficLight.Yellow, Transition.Stop));  // RED
console.log(transition(TrafficLight.Red, Transition.Go));       // GREEN

console.log(cycle(TrafficLight.Green));   // YELLOW
console.log(cycle(TrafficLight.Yellow));  // RED
console.log(cycle(TrafficLight.Red));     // GREEN`,
      hints: [
        'Use a switch on state, then a nested switch/if on action',
        'Or use a lookup object: `const transitions: Record<TrafficLight, Partial<Record<Transition, TrafficLight>>> = { ... }`',
        'For cycle, a simple object map works: `{ [TrafficLight.Green]: TrafficLight.Yellow, ... }`',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. UTILITY TYPES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'utility-types',
    title: 'Utility Types',
    icon: '🛠️',
    tagline: 'Partial, Required, Pick, Omit, Record, Readonly, ReturnType, and more',
    theory: [
      {
        title: 'Object Transformation Utilities',
        body: 'TypeScript ships with built-in generic utility types that transform existing types. These are the most commonly used ones in real-world code.',
        code: `interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

// Partial<T> — all properties optional
type UserDraft = Partial<User>;
// { id?: number; name?: string; email?: string; role?: ... }

// Required<T> — all properties required (removes ?)
type StrictUser = Required<UserDraft>;

// Readonly<T> — all properties readonly
type FrozenUser = Readonly<User>;
// frozen.id = 2; // ❌ Error

// Pick<T, K> — keep only specified keys
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit<T, K> — remove specified keys
type PublicUser = Omit<User, "role">;
// { id: number; name: string; email: string }`,
      },
      {
        title: 'Record, Exclude, Extract, NonNullable',
        body: 'More utilities for mapping and filtering types.',
        code: `// Record<K, V> — object type with keys K and values V
type UserMap = Record<string, User>;
type RoleMap = Record<"admin" | "user" | "guest", string[]>;

// Exclude<T, U> — remove members of U from union T
type NonAdmin = Exclude<"admin" | "user" | "guest", "admin">;
// "user" | "guest"

// Extract<T, U> — keep only members in both T and U
type OnlyAdmin = Extract<"admin" | "user" | "guest", "admin" | "superadmin">;
// "admin"

// NonNullable<T> — removes null and undefined
type SafeString = NonNullable<string | null | undefined>;
// string

// Practical example
type EventNames = "click" | "hover" | "focus" | "blur";
type MouseEvents = Extract<EventNames, "click" | "hover">;  // "click" | "hover"
type KeyboardEvents = Exclude<EventNames, MouseEvents>;     // "focus" | "blur"`,
      },
      {
        title: 'Function Utilities: ReturnType, Parameters, Awaited',
        body: 'These utilities let you extract types from function signatures — useful for typing wrappers, decorators, and middleware without repeating type definitions.',
        code: `// ReturnType<T> — infer return type of a function
function fetchUser(id: number) {
  return { id, name: "Alice", role: "admin" as const };
}
type FetchResult = ReturnType<typeof fetchUser>;
// { id: number; name: string; role: "admin" }

// Parameters<T> — infer parameter types as a tuple
type FetchParams = Parameters<typeof fetchUser>;
// [id: number]

// Awaited<T> — unwrap Promise (like await)
async function loadData(): Promise<string[]> { return []; }
type LoadedData = Awaited<ReturnType<typeof loadData>>;
// string[]

// InstanceType<T> — type of a class instance
class Connection { host = ""; port = 0; }
type Conn = InstanceType<typeof Connection>;
// same as: Connection`,
      },
    ],
    quiz: [
      {
        question: 'What does `Partial<User>` do?',
        options: [
          { text: 'Makes all User properties required' },
          { text: 'Makes all User properties optional' },
          { text: 'Removes all optional properties from User' },
          { text: 'Creates a partial (incomplete) User object' },
        ],
        correctIndex: 1,
        explanation: '`Partial<T>` maps every property in T to optional (`?`). It is the opposite of `Required<T>`.',
      },
      {
        question: 'What is the result of `Pick<User, "id" | "name">`?',
        code: 'interface User { id: number; name: string; email: string; role: string; }',
        options: [
          { text: 'Removes id and name, keeps the rest' },
          { text: 'Creates a new type with only id and name' },
          { text: 'Makes id and name required, others optional' },
          { text: 'Marks id and name as readonly' },
        ],
        correctIndex: 1,
        explanation: '`Pick<T, K>` creates a new type with only the specified keys. The result is `{ id: number; name: string }` — all other properties are dropped.',
      },
      {
        question: 'What does `Record<string, number>` represent?',
        options: [
          { text: 'An array of [string, number] tuples' },
          { text: 'An object with string keys and number values' },
          { text: 'A Map from string to number' },
          { text: 'A string that contains numbers' },
        ],
        correctIndex: 1,
        explanation: '`Record<K, V>` is equivalent to `{ [key: K]: V }`. `Record<string, number>` is a plain object where every value is a number, like a word-count map.',
      },
      {
        question: 'What does `Exclude<"a" | "b" | "c", "a">` produce?',
        options: [
          { text: '"a"' },
          { text: '"b" | "c"' },
          { text: '"a" | "b" | "c"' },
          { text: 'never' },
        ],
        correctIndex: 1,
        explanation: '`Exclude<T, U>` removes from T the members that are assignable to U. Removing `"a"` from `"a" | "b" | "c"` leaves `"b" | "c"`.',
      },
      {
        question: 'How do you get the return type of an existing function?',
        code: 'function getUser(id: number) { return { id, name: "Alice" }; }',
        options: [
          { text: 'typeof getUser' },
          { text: 'ReturnType<getUser>' },
          { text: 'ReturnType<typeof getUser>' },
          { text: 'Parameters<typeof getUser>[0]' },
        ],
        correctIndex: 2,
        explanation: '`ReturnType<T>` takes a function type, not a value. Use `typeof getUser` to get the function type, then wrap it: `ReturnType<typeof getUser>` gives `{ id: number; name: string }`.',
      },
    ],
    challenge: {
      title: 'DeepPartial & DeepReadonly',
      description: `TypeScript\'s built-in \`Partial\` and \`Readonly\` only work one level deep. Implement recursive versions:\n\n1. \`DeepPartial<T>\` — makes all properties (and nested properties) optional\n2. \`DeepReadonly<T>\` — makes all properties (and nested properties) readonly\n\nAlso implement a utility function \`mergeDeep<T>(target: T, patch: DeepPartial<T>): T\` that merges a partial update recursively.`,
      starterCode: `// Recursive utility types
type DeepPartial<T> = {
  // your code — for each property, if it's an object, recurse; otherwise make optional
};

type DeepReadonly<T> = {
  // your code — for each property, if it's an object, recurse; otherwise make readonly
};

// Test types
interface Config {
  server: {
    host: string;
    port: number;
    ssl: { enabled: boolean; cert: string };
  };
  database: {
    url: string;
    poolSize: number;
  };
  debug: boolean;
}

type PartialConfig = DeepPartial<Config>;
// server.ssl.cert should be optional ✅

type ReadonlyConfig = DeepReadonly<Config>;
// cannot assign to any nested property ✅

// Merge function
function mergeDeep<T extends object>(target: T, patch: DeepPartial<T>): T {
  // recursively merge patch into target
  // for each key in patch: if value is an object, recurse; otherwise replace
}

const config: Config = {
  server: { host: "localhost", port: 8080, ssl: { enabled: false, cert: "" } },
  database: { url: "postgres://localhost/db", poolSize: 5 },
  debug: true,
};

const updated = mergeDeep(config, {
  server: { port: 443, ssl: { enabled: true } },
  debug: false,
});
console.log(updated.server.port);         // 443
console.log(updated.server.ssl.enabled); // true
console.log(updated.server.host);        // "localhost" (unchanged)`,
      hints: [
        'DeepPartial: `[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]`',
        'DeepReadonly: same pattern but `readonly` instead of `?`',
        'mergeDeep: use `typeof val === "object" && val !== null` to check for recursion',
        'In mergeDeep, use `{ ...target, [key]: mergeDeep(target[key], patch[key]) }` for objects',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. TYPE GUARDS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'type-guards',
    title: 'Type Guards',
    icon: '🛡️',
    tagline: 'typeof, instanceof, in, type predicates, discriminated union narrowing',
    theory: [
      {
        title: 'Built-in Narrowing',
        body: 'TypeScript narrows union types inside conditional blocks. The typeof, instanceof, and equality checks all narrow the type automatically. TypeScript tracks the type through control flow — this is called "control flow analysis".',
        code: `function process(value: string | number | null): string {
  // null check
  if (value === null) return "null";

  // typeof narrowing
  if (typeof value === "string") {
    return value.toUpperCase(); // value is string here
  }

  // value is number here
  return value.toFixed(2);
}

// instanceof narrowing
function format(date: Date | string): string {
  if (date instanceof Date) {
    return date.toISOString(); // Date here
  }
  return date.trim();          // string here
}

// in narrowing — checks for property existence
interface Cat { meow(): void }
interface Dog { bark(): void }

function makeNoise(animal: Cat | Dog): void {
  if ("meow" in animal) {
    animal.meow(); // Cat here
  } else {
    animal.bark(); // Dog here
  }
}`,
      },
      {
        title: 'Custom Type Guards (Type Predicates)',
        body: 'When built-in narrowing isn\'t enough, write a custom type guard function. The return type `value is T` tells TypeScript that if the function returns true, the argument has type T. This works even across function call boundaries.',
        code: `interface Cat  { kind: "cat";  meow(): void  }
interface Dog  { kind: "dog";  bark(): void  }
interface Bird { kind: "bird"; chirp(): void }
type Pet = Cat | Dog | Bird;

// Custom type predicate
function isCat(pet: Pet): pet is Cat {
  return pet.kind === "cat";
}

// General-purpose type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNonNull<T>(value: T | null | undefined): value is T {
  return value != null;
}

// Practical use
const pets: Pet[] = getPets();
const cats = pets.filter(isCat); // type: Cat[]  ← filter narrows!

const items: (string | null)[] = ["a", null, "b", null, "c"];
const strings = items.filter(isNonNull); // type: string[]`,
      },
      {
        title: 'Assertion Functions',
        body: 'Assertion functions (using `asserts`) narrow the type for the rest of the function body — they throw if the condition fails, so if they return, TypeScript knows the type is narrowed. This is useful for validating input at runtime.',
        code: `// asserts value is T — throws if false, else narrows
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new TypeError(\`Expected string, got \${typeof value}\`);
  }
}

function assertDefined<T>(value: T | null | undefined): asserts value is T {
  if (value == null) {
    throw new Error("Expected a defined value");
  }
}

// After assertion, TypeScript knows the type
function parseConfig(raw: unknown): void {
  assertIsString(raw);
  // raw is string from here on
  const parts = raw.split(",");
  console.log(parts);
}

// asserts condition
function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}

const x: number | undefined = getX();
assert(x !== undefined, "x must be defined");
// x is number from here`,
      },
    ],
    quiz: [
      {
        question: 'What does TypeScript do inside the `if` block below?',
        code: `function fn(x: string | number) {
  if (typeof x === "string") {
    x.toUpperCase(); // what is the type of x here?
  }
}`,
        options: [
          { text: 'x is still string | number' },
          { text: 'x is narrowed to string' },
          { text: 'x is widened to any' },
          { text: 'TypeScript cannot determine the type' },
        ],
        correctIndex: 1,
        explanation: 'Control flow analysis: inside `if (typeof x === "string")`, TypeScript narrows `x` to `string`. After the block, it returns to `string | number`.',
      },
      {
        question: 'What does the return type `pet is Cat` mean on a function?',
        options: [
          { text: 'The function returns a boolean value named "is Cat"' },
          { text: 'If the function returns true, TypeScript narrows the parameter to Cat' },
          { text: 'The function can only be called with Cat arguments' },
          { text: 'A runtime check that throws if pet is not a Cat' },
        ],
        correctIndex: 1,
        explanation: 'A type predicate (`param is Type`) is a compile-time assertion. When the function returns `true`, TypeScript narrows the parameter\'s type to `Cat` in the calling code.',
      },
      {
        question: 'Which operator narrows based on property existence?',
        code: 'if (??? "bark" in animal) { animal.bark(); }',
        options: [
          { text: 'typeof' },
          { text: 'instanceof' },
          { text: 'in' },
          { text: 'hasOwnProperty' },
        ],
        correctIndex: 2,
        explanation: 'The `in` operator (`"property" in object`) narrows to types that have that property. TypeScript understands this as a type guard.',
      },
      {
        question: 'Why does `items.filter(isNonNull)` produce `string[]` when `items: (string | null)[]`?',
        options: [
          { text: 'filter always removes null by default' },
          { text: 'isNonNull has a type predicate return type that TypeScript uses to narrow the array element type' },
          { text: 'TypeScript infers it from the array type' },
          { text: 'Only works with built-in filter overloads' },
        ],
        correctIndex: 1,
        explanation: 'When a type predicate function (`value is T`) is passed to `.filter()`, TypeScript uses it to narrow the element type of the resulting array. This is one of the most useful applications of type predicates.',
      },
      {
        question: 'What is the difference between `asserts value is string` and `value is string` return types?',
        options: [
          { text: 'No difference — both narrow the type' },
          { text: '`asserts` throws if false and narrows for the REST of the function body; `value is string` narrows only at the call site' },
          { text: '`asserts` works at runtime; `value is string` is compile-only' },
          { text: '`asserts` requires a boolean return; `value is string` requires void' },
        ],
        correctIndex: 1,
        explanation: 'Assertion functions (`asserts value is T`) throw if the condition fails — they return void. After the call, TypeScript narrows the variable for the rest of the enclosing scope. Type predicates narrow at the call site in `if` conditions.',
      },
    ],
    challenge: {
      title: 'Runtime Schema Validator',
      description: `Build a simple runtime type validation library using type guards:\n\n1. \`isNumber(v: unknown): v is number\`\n2. \`isString(v: unknown): v is string\`\n3. \`isBoolean(v: unknown): v is boolean\`\n4. \`isArrayOf<T>(arr: unknown, guard: (v: unknown) => v is T): arr is T[]\`\n5. \`isShape<T>(obj: unknown, schema: { [K in keyof T]: (v: unknown) => v is T[K] }): obj is T\`\n\n\`isShape\` should validate that an object has the right shape at runtime — useful for validating API responses.`,
      starterCode: `function isNumber(v: unknown): v is number {
  // your code
}

function isString(v: unknown): v is string {
  // your code
}

function isBoolean(v: unknown): v is boolean {
  // your code
}

function isArrayOf<T>(arr: unknown, guard: (v: unknown) => v is T): arr is T[] {
  // your code — check it's an array, then every element passes guard
}

function isShape<T extends object>(
  obj: unknown,
  schema: { [K in keyof T]: (v: unknown) => v is T[K] }
): obj is T {
  // your code — check every key in schema passes its guard on obj[key]
}

// Test
interface ApiUser {
  id: number;
  name: string;
  active: boolean;
  tags: string[];
}

const userSchema = {
  id:     isNumber,
  name:   isString,
  active: isBoolean,
  tags:   (v: unknown): v is string[] => isArrayOf(v, isString),
};

const raw: unknown = JSON.parse('{"id":1,"name":"Alice","active":true,"tags":["ts","dev"]}');

if (isShape<ApiUser>(raw, userSchema)) {
  console.log(raw.name.toUpperCase()); // ALICE — fully typed ✅
}`,
      hints: [
        '`isNumber`: `return typeof v === "number" && !isNaN(v)`',
        '`isArrayOf`: `return Array.isArray(arr) && arr.every(guard)`',
        '`isShape`: check `obj !== null && typeof obj === "object"`, then iterate schema keys',
        'In isShape: `Object.keys(schema).every(k => schema[k]((obj as any)[k]))`',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. ASYNC TYPESCRIPT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'async',
    title: 'Async TypeScript',
    icon: '⏳',
    tagline: 'Promise<T>, async/await types, error handling, concurrent patterns',
    theory: [
      {
        title: 'Promise<T> and async/await',
        body: 'An async function always returns a Promise. TypeScript infers the generic type T from whatever the function returns (or resolves with). You annotate async functions with `Promise<T>` return types explicitly for clarity.',
        code: `// Explicit Promise return type
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error("Not found");
  return response.json() as Promise<User>;
}

// TypeScript infers Promise<number>
async function countItems() {
  const items = await getItems();
  return items.length; // inferred: Promise<number>
}

// Typing resolved values
const userPromise: Promise<User> = fetchUser(1);
const user: User = await userPromise; // inside async context

// Promise.resolve / reject types
const p1 = Promise.resolve(42);        // Promise<number>
const p2 = Promise.reject(new Error()); // Promise<never>`,
      },
      {
        title: 'Error Handling in Async Code',
        body: 'Caught errors in try/catch are always typed as `unknown` (since TS 4.0 with useUnknownInCatchVariables). You must narrow them before accessing properties. A common pattern is a helper that wraps async calls and returns [data, error] tuples.',
        code: `// try/catch: error is unknown
async function safe() {
  try {
    const data = await fetchUser(1);
    return data;
  } catch (err: unknown) {
    // Must narrow
    if (err instanceof Error) {
      console.error(err.message);  // ✅
    }
    throw err;
  }
}

// Helper: returns [data, null] or [null, Error]
async function tryAsync<T>(
  promise: Promise<T>
): Promise<[T, null] | [null, Error]> {
  try {
    return [await promise, null];
  } catch (e) {
    return [null, e instanceof Error ? e : new Error(String(e))];
  }
}

// Clean usage
const [user, error] = await tryAsync(fetchUser(1));
if (error) { console.error(error.message); return; }
console.log(user.name); // user is User here ✅`,
      },
      {
        title: 'Concurrent Patterns',
        body: 'Promise.all, Promise.allSettled, Promise.race, and Promise.any all have generic overloads in TypeScript. Promise.all in particular preserves the tuple type when given a const-asserted array or tuple literal.',
        code: `// Promise.all — typed tuple result
const [user, posts, comments] = await Promise.all([
  fetchUser(1),          // Promise<User>
  fetchPosts(1),         // Promise<Post[]>
  fetchComments(1),      // Promise<Comment[]>
]);
// user: User, posts: Post[], comments: Comment[]

// Promise.allSettled — each result is PromiseSettledResult<T>
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(999),
]);
for (const r of results) {
  if (r.status === "fulfilled") console.log(r.value); // User
  if (r.status === "rejected")  console.log(r.reason); // unknown
}

// Promise.race — returns whichever resolves/rejects first
async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  return Promise.race([p, timeout]);
}`,
      },
    ],
    quiz: [
      {
        question: 'What is the return type of an async function that returns a string?',
        code: 'async function getMessage(): ??? { return "hello"; }',
        options: [
          { text: 'string' },
          { text: 'Promise<string>' },
          { text: 'Awaited<string>' },
          { text: 'async<string>' },
        ],
        correctIndex: 1,
        explanation: 'Every `async` function returns a `Promise`. If the function body returns a `string`, the function\'s return type is `Promise<string>`.',
      },
      {
        question: 'What type does `err` have in a catch block in modern TypeScript?',
        code: `try { ... } catch (err) { /* type of err? */ }`,
        options: [
          { text: 'Error' },
          { text: 'any' },
          { text: 'unknown' },
          { text: 'string' },
        ],
        correctIndex: 2,
        explanation: 'Since TypeScript 4.0, caught errors have type `unknown` by default (with `useUnknownInCatchVariables`). You must narrow with `instanceof Error` before accessing `.message`.',
      },
      {
        question: 'What does `Promise.all` return when given heterogeneous promises?',
        code: 'const result = await Promise.all([fetchNumber(), fetchString()]);',
        options: [
          { text: 'Promise<any[]>' },
          { text: 'Promise<(number | string)[]>' },
          { text: 'A tuple: Promise<[number, string]>' },
          { text: 'Promise<unknown[]>' },
        ],
        correctIndex: 2,
        explanation: 'TypeScript has overloads for `Promise.all` that preserve tuple types when given a fixed-length array. The result is typed as `[number, string]`, not `(number | string)[]`.',
      },
      {
        question: 'What utility type unwraps a Promise type?',
        code: 'type A = Awaited<Promise<string>>; // A = ???',
        options: [
          { text: 'Promise<string>' },
          { text: 'string' },
          { text: 'unknown' },
          { text: 'never' },
        ],
        correctIndex: 1,
        explanation: '`Awaited<T>` recursively unwraps promises: `Awaited<Promise<string>>` gives `string`. It handles nested promises too: `Awaited<Promise<Promise<number>>>` gives `number`.',
      },
      {
        question: 'What is `Promise.race` useful for?',
        options: [
          { text: 'Running all promises sequentially' },
          { text: 'Waiting for all promises to complete' },
          { text: 'Returning the first settled (resolved or rejected) promise' },
          { text: 'Retrying failed promises' },
        ],
        correctIndex: 2,
        explanation: '`Promise.race` settles as soon as the first promise settles (either resolves OR rejects). Common use case: implementing a timeout by racing a real operation against a rejection-after-delay.',
      },
    ],
    challenge: {
      title: 'Typed Async Queue',
      description: `Implement an \`AsyncQueue<T>\` — a queue where producers enqueue items and consumers await them:\n\n\`\`\`\nconst q = new AsyncQueue<number>();\n\n// Consumer waits even if queue is empty\nconst item = await q.dequeue(); // waits until something is enqueued\n\n// Producer\nq.enqueue(42); // wakes the waiting consumer\n\`\`\`\n\nImplement:\n1. \`enqueue(item: T): void\` — add item; if a consumer is waiting, resolve it immediately\n2. \`dequeue(): Promise<T>\` — if items are available return immediately; otherwise wait\n3. \`get size(): number\` — number of unprocessed items\n4. Also add \`close(): void\` and make \`dequeue()\` return \`Promise<T | null>\` where null means the queue is closed and empty`,
      starterCode: `class AsyncQueue<T> {
  private items: T[] = [];
  private waiting: Array<(item: T | null) => void> = [];
  private closed = false;

  enqueue(item: T): void {
    if (this.closed) throw new Error("Queue is closed");
    if (this.waiting.length > 0) {
      // resolve a waiting consumer immediately
    } else {
      this.items.push(item);
    }
  }

  dequeue(): Promise<T | null> {
    if (this.items.length > 0) {
      // return immediately
    }
    if (this.closed) {
      return Promise.resolve(null);
    }
    // return a promise that will be resolved later
    return new Promise((resolve) => {
      this.waiting.push(resolve);
    });
  }

  get size(): number {
    return this.items.length;
  }

  close(): void {
    this.closed = true;
    // resolve all waiting consumers with null
  }
}

// Test
async function demo() {
  const q = new AsyncQueue<string>();

  // Start a consumer (will wait)
  const consumer = q.dequeue().then(v => console.log("Got:", v));

  // Producer enqueues after a delay
  setTimeout(() => q.enqueue("hello"), 100);

  await consumer; // "Got: hello"

  q.enqueue("a");
  q.enqueue("b");
  console.log(q.size); // 2

  q.close();
  console.log(await q.dequeue()); // "a"
  console.log(await q.dequeue()); // "b"
  console.log(await q.dequeue()); // null (closed + empty)
}

demo();`,
      hints: [
        'When `enqueue` is called and `waiting.length > 0`, call `this.waiting.shift()!(item)` to resolve the oldest waiting consumer',
        'When `dequeue` finds items, use `return Promise.resolve(this.items.shift()!)`',
        'In `close()`, drain `this.waiting` by calling each resolver with `null`',
      ],
    },
  },
];
