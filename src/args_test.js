///<reference path='../typings/tsd.d.ts' />
///<reference path='../src/args.ts' />
var tape = require('tape');
var args = require('./args');
var Args = args.Args;
tape('exits', function (t) {
    t.ok(Args);
    t.end();
});
