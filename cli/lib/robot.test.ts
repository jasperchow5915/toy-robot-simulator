import test from 'ava';
import { Directions } from './command';
import { Robot } from './robot';

test('Robot should report', (t) => {
  const robot = new Robot();
  const data = [
    {
      input: { x: 0, y: 0, direction: Directions.North },
      output: '0,0,NORTH',
    },
    {
      input: { x: 5, y: 4, direction: Directions.East },
      output: '5,4,EAST',
    },
    {
      input: { x: 2, y: 4, direction: Directions.South },
      output: '2,4,SOUTH',
    },
  ];

  for (const d of data) {
    robot.x = d.input.x;
    robot.y = d.input.y;
    robot.direction = d.input.direction;
    t.is(robot.report(), d.output);
  }
});
