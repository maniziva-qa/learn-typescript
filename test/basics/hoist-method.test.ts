test("Hoist behaviour - Methods", () => {
  sayhello();

  function sayhello() {
    console.log("Hello");
  }
});
