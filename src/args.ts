///<reference path='../typings/tsd.d.ts' />

export interface Args {
  albumId: number;
  dir: string;
  file: string;
}

export class ArgsParser implements Args {
  argv: string[];
  albumId: number;
  dir: string;
  file: string;
  constructor(argv: string[]) {
    this.argv = argv;
  }

  processArgs(args: string[]) {
    throw new Error("invalid foo");
    return;
  }
}


