import test from 'ava';
import { Command, Directions } from './command';
import { Robot } from './robot';

test('Command should read the user input', (t) => {
  const cmd = new Command(5, 5);
  const input = `PLACE 0,0,NORTH
    MOVE
    REPORT`;

  t.deepEqual(cmd.parse(input), ['PLACE 0,0,NORTH', 'MOVE', 'REPORT']);
  t.deepEqual(cmd.parse(''), []);
});

test('Command should place the robot at a specific location', (t) => {
  const cmd = new Command(5, 5);
  const data = [
    {
      input: 'PLACE 0,0,NORTH',
      output: '0,0,NORTH',
    },
    {
      input: 'PLACE 3,3,SOUTH',
      output: '3,3,SOUTH',
    },
    {
      input: [
        '',
        'PLACEE 3,3,SOUTH',
        'PLACE A,5,EAST',
        'PLACE A,5,SAUTH',
        'PALACE 1,E,SAUTH',
      ],
      output: '',
    },
  ];

  for (const d of data) {
    cmd.control(new Robot());

    if (Array.isArray(d.input)) {
      for (const i of d.input) {
        cmd.place(i);
        t.deepEqual(cmd.robot.report(), d.output);
      }
    } else {
      cmd.place(d.input);
      t.deepEqual(cmd.robot.report(), d.output);
    }
  }
});

test('Command should control the robot', (t) => {
  const cmd = new Command(5, 5);
  t.falsy(cmd.robot);

  cmd.control(new Robot());
  t.truthy(cmd.robot);
});

test('Command should turn the robot to the left', (t) => {
  const robot = new Robot();
  robot.x = 0;
  robot.y = 0;
  robot.direction = Directions.North;
  const cmd = new Command(5, 5);
  cmd.control(robot).turnLeft();
  t.is(cmd.robot.report(), '0,0,WEST');

  cmd.turnLeft();
  t.is(cmd.robot.report(), '0,0,SOUTH');
});

test('Command should turn the robot to the right', (t) => {
  const robot = new Robot();
  robot.x = 0;
  robot.y = 0;
  robot.direction = Directions.South;
  const cmd = new Command(5, 5);
  cmd.control(robot).turnRight();
  t.is(cmd.robot.report(), '0,0,WEST');

  cmd.turnRight();
  t.is(cmd.robot.report(), '0,0,NORTH');

  cmd.turnRight();
  t.is(cmd.robot.report(), '0,0,EAST');
});

test('Command should move the robot', (t) => {
  const robot = new Robot();
  const cmd = new Command(5, 5);
  const data = [
    {
      input: { x: 0, y: 0, direction: Directions.North },
      output: '0,1,NORTH',
    },
    {
      input: { x: 4, y: 3, direction: Directions.East },
      output: '5,3,EAST',
    },
    {
      input: { x: 2, y: 4, direction: Directions.South },
      output: '2,3,SOUTH',
    },
    {
      input: { x: 2, y: 0, direction: Directions.South },
      output: '2,0,SOUTH',
    },
    {
      input: { x: 1, y: 4, direction: Directions.West },
      output: '0,4,WEST',
    },
    {
      input: { x: 0, y: 4, direction: Directions.West },
      output: '0,4,WEST',
    },
  ];

  for (const d of data) {
    robot.x = d.input.x;
    robot.y = d.input.y;
    robot.direction = d.input.direction;
    cmd.control(robot).move();
    t.is(cmd.robot.report(), d.output);
  }
});

test('Command should process the input', (t) => {
  const cmd = new Command(5, 5);
  const data = [
    {
      input: `PLACEE 0,0,WEST
      REPORT`,
      output: '',
    },
    {
      input: `PLACE 0,0,EAST
      MUVE
      LEFT
      MOVE
      REPORT`,
      output: '0,1,NORTH',
    },
    {
      input: `PLACE 0,0,WEST
      REPORT`,
      output: '0,0,WEST',
    },
    {
      input: `PLACE 0,0,NORTH
      MOVE
      REPORT`,
      output: '0,1,NORTH',
    },
    {
      input: `PLACE 2,4,EAST
      MOVE
      MOVE
      REPORT`,
      output: '4,4,EAST',
    },
    {
      input: `PLACE 5,0,EAST
      MOVE
      REPORT`,
      output: '5,0,EAST',
    },
    {
      input: `PLACE 0,5,NORTH
      MOVE
      REPORT`,
      output: '0,5,NORTH',
    },
    {
      input: `PLACE 5,5,NORTH
      MOVE
      RIGHT
      MOVE
      RIGHT
      MOVE
      RIGHT
      MOVE
      LEFT
      MOVE
      RIGHT
      RIGHT
      MOVE
      REPORT`,
      output: '4,4,NORTH',
    },
    {
      input: `PLACE 2,3,NORTH
      MOVE
      LEFTRIGHT
      REPORT`,
      output: '2,4,NORTH',
    },
    {
      input: `MOVE
      REPORT`,
      output: '',
    },
    {
      input: `LEFT
      RIGHT
      REPORT`,
      output: '',
    },
    {
      input: `REPORT`,
      output: '',
    },
    {
      input: `LEFT
      RIGHT
      MOVE
      REPORT
      PLACE 5,5,NORTH
      REPORT`,
      output: '5,5,NORTH',
    },
  ];

  for (const d of data) {
    cmd.control(new Robot);
    const report = cmd.process(cmd.parse(d.input));
    t.is(report, d.output);
  }
});
