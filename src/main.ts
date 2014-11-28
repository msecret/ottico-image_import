///<reference path='../typings/tsd.d.ts' />
/*
 *
 */

import args = require('./args');
import imgprocessor = require('./img_processor');

try {
  var parameters = new args.ArgsParser(process.argv);
} catch (e) {
  console.error(e);
  process.exit(1);
}

var filesPromise = imgprocessor.getFiles(parameters);
filesPromise.then(function(files) {
  console.log(files);
}, function(error) {
  console.error('ERROR:Files not readable');
  console.error(error);
  process.exit(1);
});

// oip --album-id 3 --dir ./

// arg_vars = process arguments
// for each .jpg file in $DIR
//   file = processor.process(file)
//   pictures.push(new Picture(file))
//   do stuff with picture
//   sqls.push(sql.writesql(picture))
// write sqls to $(FILE)
