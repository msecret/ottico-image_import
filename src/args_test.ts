///<reference path='../typings/tsd.d.ts' />
///<reference path='../src/args.ts' />

import tape = require('tape');
import args = require('./args');

tape('exists', (t: tape.Test) => {
  t.ok(args.ArgsParser, 'Args exists');
  t.end();
});

tape('ArgsParser constructor() should set argv to string[] passed in',
    (t: tape.Test) => {
  var expected : string[],
      testArgs;

  expected = ['node', '/file.js', 'one'];
  testArgs = new args.ArgsParser(expected);

  t.equals(expected, testArgs.argv, 'Sets argv to string[] passed in');
  t.end();
});

tape('ArgsParser processArgs should fail if theres less then 3 arguments',
    (t: tape.Test) => {
  var testArgs;

  t.plan(1);

  testArgs = new args.ArgsParser(['node', 'file/js', 'one']);

  try {
    testArgs.processArgs()
  } catch (e) {
    t.pass('Threw an error');
  }
  t.end();
});
