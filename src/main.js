///<reference path='../typings/tsd.d.ts' />
///<reference path='./args.ts' />
/*
 *
 */
var args = require('./args');
var Args = args.Args;
var s = new Args(process);
console.log(s);
