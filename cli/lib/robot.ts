import { State } from './interface/state.interface';

export class Robot {
  private _state: State = { x: null, y: null, direction: null };

  get direction() {
    if (!this.isInPlace()) {
      return null;
    }

    return this._state.direction;
  }

  set direction(direction: string) {
    this._state = {
      ...this._state,
      direction,
    };
  }

  get x() {
    return this._state.x;
  }

  set x(xPosition: number) {
    this._state = {
      ...this._state,
      x: xPosition,
    };
  }

  get y() {
    return this._state.y;
  }

  set y(yPosition: number) {
    this._state = {
      ...this._state,
      y: yPosition,
    };
  }

  isInPlace() {
    return this._state.direction !== null;
  }

  report() {
    if (!this.isInPlace()) {
      return '';
    }

    const { x, y, direction } = this._state;
    return `${x},${y},${direction.toUpperCase()}`;
  }

  reset() {
    this._state = { x: null, y: null, direction: null };
  }
}
