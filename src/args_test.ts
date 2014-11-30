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

  expected = ['node', '/file.js', 'one', 'two', 'three'];
  testArgs = new args.ArgsParser(expected);

  t.equals(expected, testArgs.argv, 'Sets argv to string[] passed in');
  t.end();
});

tape('ArgsParser processArgs should fail if theres less then 2 arguments',
    (t: tape.Test) => {
  var testArgs;

  t.plan(1);


  try {
    testArgs = new args.ArgsParser(['node', 'file/js', 'one']);
  } catch (e) {
    t.pass('Threw an error');
  }
  t.end();
});

tape('ArgsParser processArgs should set albumId, and dirName to the ' +
    'first passed in', (t: tape.Test) => {
  var expected : string[],
      testArgs;

  expected = ['node', '/file.js', '1', 'two'];
  testArgs = new args.ArgsParser(expected);

  t.equals(parseInt(expected[2], 10), testArgs.albumId);
  t.equals(expected[3], testArgs.dirName);
  t.end();
});
