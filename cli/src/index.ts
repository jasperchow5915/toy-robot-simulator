import { readFileSync } from 'fs';
import { Commands } from '../lib/interface/commands.interface';
import { Simulator } from '../lib/simulator';

function main() {
  const buffer = readFileSync('commands.txt');
  const commands: Commands = JSON.parse(buffer.toString());
  const simulator = new Simulator();
  simulator.simulate(commands);
}

main();
