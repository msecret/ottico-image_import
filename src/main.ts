///<reference path='../typings/tsd.d.ts' />
///<reference path='./args.ts' />
/*
 *
 */

import args = require('./args');
var Args = args.Args;

var s = new Args(process);
console.log(s);

// oip --album-id 3 --dir ./

// arg_vars = process arguments
// for each .jpg file in $DIR
//   file = processor.process(file)
//   pictures.push(new Picture(file))
//   do stuff with picture
//   sqls.push(sql.writesql(picture))
// write sqls to $(FILE)

