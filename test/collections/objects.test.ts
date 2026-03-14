test("Grab firstname value", () => {
    interface Person {
      firstName: string;
      LastName?: string;
      Mobile?: number;
    };
  
    const str: Person[] = [
      {
        firstName: "Manikandan",
        LastName: "Adaiaklam",
        Mobile: 8098606447,
      },
      {
        firstName: "Mani",
        LastName: "Ziva",
        Mobile: 8098606357,
      },
    ];
    
    str.push({
      firstName: "MS",
    });
    console.log(JSON.stringify(str));

    const result = str.find((item: any) => item.firstName === "Manikandan");
    console.log(result?.Mobile); 
  });
  
  test('Grab firstname value - using regex', () => {
  
    type Person = {
      firstName: string;
      LastName: string;
      Mobile: string;
    };
  
    const str: Person[] = [
      {
        firstName: "Manikandan",
        LastName: "Adaiaklam",
        Mobile: "8098606447",
      },
      {
        firstName: "Mani",
        LastName: "Ziva",
        Mobile: "8098606357",
      },
    ];
  
    const result = str.filter((item: any) => item.firstName.match(/Mani/));
    console.log(result.map((item: any) => item.Mobile));
    });