import { Command } from './command';
import { Commands } from './interface/commands.interface';
import { Robot } from './robot';

export class Simulator {
  simulate(data: Commands) {
    const cmd = new Command(5, 5);

    for (const task of data.commands) {
      cmd.control(new Robot());
      const report = cmd.process(cmd.parse(task.input));

      if (report !== '') {
        console.log(report);
      }
    }
  }
}
