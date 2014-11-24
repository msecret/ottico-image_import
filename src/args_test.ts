///<reference path='../typings/tsd.d.ts' />
///<reference path='../src/args.ts' />

import tape = require('tape');
import args = require('./args');
var Args = args.Args;

tape('exits', (t: tape.Test) => {
  t.ok(Args);
  t.end();
});
