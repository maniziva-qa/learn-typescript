interface User {
  firstName: string;
  lastName: string;
  age?: number;
}

test("check interface", () => {
  function getUser(user: User) {
    return `My full name is ${user.firstName} ${user.lastName} and my Age is ${user.age || "No Input"}`;
  }

  let user1 = [{ firstName: "Manikandan", lastName: "Adaikalam", age: 27 }, { firstName: "Palaniyammal", lastName: "Adaikalam" }, ];

  for(const item of user1){
    console.log(getUser(item));
  }
});
