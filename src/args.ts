///<reference path='../typings/tsd.d.ts' />


export class Args {
  albumId: number;
  dir: string;
  file: string;
  constructor(argv: NodeJS.Process) { this.processArgs(argv); }
  processArgs(process: NodeJS.Process) {}
}

