test("Static Keyword", () => {
  class Demo {

    // 1️⃣ Static Property
    static appName: string = "Static Demo App";

    // 2️⃣ Static Private Property
    private static counter: number = 0;

    // 3️⃣ Static Method
    static greet(name: string): string {
      return `Hello, ${name}`;
    }

    // 4️⃣ Static Method accessing Static Property
    static showAppName(): string {
      return this.appName;
    }

    // 5️⃣ Static Method accessing Private Static
    static incrementCounter(): void {
      this.counter++;
    }

    static getCounter(): number {
      return this.counter;
    }

    // 6️⃣ Instance Property
    userName: string;

    constructor(userName: string) {
      this.userName = userName;
    }

    // 7️⃣ Instance Method
    getUserName(): string {
      return this.userName;
    }

    // 8️⃣ Static Block
    static {
      console.log("Static block executed - Class Loaded");
      (this as any).initialized = true;
    }
  }

  // Static usage
  expect(Demo.appName).toBe("Static Demo App");
  expect(Demo.greet("Mani")).toBe("Hello, Mani");

  Demo.incrementCounter();
  Demo.incrementCounter();
  expect(Demo.getCounter()).toBe(2);

  // Instance usage
  const user1 = new Demo("Manikandan");
  expect(user1.getUserName()).toBe("Manikandan");

});