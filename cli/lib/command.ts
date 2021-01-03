import { State } from './interface/state.interface';
import { Robot } from './robot';

export enum Directions {
  North = 'north',
  East = 'east',
  South = 'south',
  West = 'west',
}

export class Command {
  gridLimit = { x: 0, y: 0 };
  directionKeys = Object.keys(Directions).map((d) => d.toLowerCase());
  robot: Robot;

  constructor(xRange: number, yRange: number) {
    this.gridLimit = { x: xRange, y: yRange };
  }

  control(robot: Robot) {
    this.robot = robot;
    return this;
  }

  turnLeft() {
    if (!this.robot.isInPlace()) {
      return;
    }

    const { directionKeys, robot } = this;
    const currentDirectionIndex = directionKeys.indexOf(robot.direction);

    if (currentDirectionIndex === 0) {
      return (robot.direction = directionKeys[directionKeys.length - 1]);
    }

    return (robot.direction = directionKeys[currentDirectionIndex - 1]);
  }

  turnRight() {
    if (!this.robot.isInPlace()) {
      return;
    }

    const { directionKeys, robot } = this;
    const currentDirectionIndex = directionKeys.indexOf(robot.direction);

    if (currentDirectionIndex === directionKeys.length - 1) {
      return (robot.direction = directionKeys[0]);
    }

    return (robot.direction = directionKeys[currentDirectionIndex + 1]);
  }

  move() {
    const { gridLimit, robot } = this;

    switch (robot.direction) {
      case Directions.North:
        if (robot.y === gridLimit.y) {
          return robot.y;
        }

        return (robot.y += 1);

      case Directions.East:
        if (robot.x === gridLimit.x) {
          return robot.x;
        }

        return (robot.x += 1);

      case Directions.South:
        if (robot.y === 0) {
          return robot.y;
        }

        return (robot.y -= 1);

      case Directions.West:
        if (robot.x === 0) {
          return robot.x;
        }

        return (robot.x -= 1);
    }
  }

  parse(input: string): string[] {
    if (input === '') {
      return [];
    }

    return input.split('\n').map((command) => command.trim());
  }

  place(input: string): State {
    if (input === '') {
      return;
    }

    const regex = /^PLACE\s(\d),(\d),(NORTH|EAST|SOUTH|WEST)/;
    const matches = input.match(regex);

    if (matches === null) {
      return;
    }

    this.robot.reset();
    this.robot.x = Number.parseInt(matches[1]);
    this.robot.y = Number.parseInt(matches[2]);
    this.robot.direction = matches[3].toLowerCase();
  }

  process(commands: string[]) {
    let report = '';

    for (const cmd of commands) {
      if (!this.isCommandValid(cmd)) {
        continue;
      }

      if (this.isPlaceCommand(cmd)) {
        this.place(cmd);
      }

      if (this.isMoveCommand(cmd)) {
        this.move();
      }

      if (this.isLeftCommand(cmd)) {
        this.turnLeft();
      }

      if (this.isRightCommand(cmd)) {
        this.turnRight();
      }

      if (this.isReportCommand(cmd)) {
        report = this.robot.report();
      }
    }

    return report;
  }

  private isCommandValid(cmd: string) {
    return /(PLACE\s|MOVE|LEFT|RIGHT|REPORT)/.test(cmd);
  }

  private isPlaceCommand(cmd: string) {
    return /PLACE\s/.test(cmd);
  }

  private isMoveCommand(cmd: string) {
    return /MOVE/.test(cmd);
  }

  private isLeftCommand(cmd: string) {
    return /LEFT/.test(cmd);
  }

  private isRightCommand(cmd: string) {
    return /RIGHT/.test(cmd);
  }

  private isReportCommand(cmd: string) {
    return /REPORT/.test(cmd);
  }
}
