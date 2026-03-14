//will learn about enum in typescript


test('enum', () => {
  enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
  }

  let move: Direction = Direction.Up;

  console.log(`Current direction: ${move}`);

  // Change direction
  move = Direction.Left;
  console.log(`Changed direction: ${move}`);

  // Using enum in a function
  function getDirection(direction: Direction): string {
    return `Moving in direction: ${direction}`;
  }

  console.log(getDirection(Direction.Right));
});


test('enum with numeric values', () => {
  enum Status {
    Active = 1,
    Inactive= 2,
    Pending = 3,
  }

  let currentStatus: Status = Status.Active;

  console.log(`Current status: ${currentStatus}`); // Outputs: Current status: 1

  // Change status
  currentStatus = Status.Pending;
  console.log(`Changed status: ${currentStatus}`); // Outputs: Changed status: 3

  // Using enum in a function
  function getStatus(status: Status): string {
    return `Current status is: ${status}`;
  }

  console.log(getStatus(Status.Inactive)); // Outputs: Current status is: 2
});