export interface Commands {
  commands: Array<Task>;
}

interface Task {
  input: string;
  output: string;
}
