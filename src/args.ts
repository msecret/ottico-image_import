///<reference path='../typings/tsd.d.ts' />

export interface IArgs {
  albumId: number;
  dirName: string;
  fileName: string;
}

export class ArgsParser implements IArgs {
  argv: string[];
  albumId: number;
  dirName: string;
  fileName: string;
  constructor(argv: string[]) {
    this.argv = argv;
    this.processArgs(this.argv);
  }

  processArgs(args: string[]) {
    if (args.length < 4) {
      throw new Error('Incorrect amount of arguments');
    }
    this.albumId = parseInt(args[2], 10);
    this.dirName = args[3];
    return;
  }
}


