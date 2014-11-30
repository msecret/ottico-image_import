///<reference path='../typings/tsd.d.ts' />
/*
 *
 */

import args = require('./args');
import imgprocessor = require('./img_processor');
import p = require('./picture');
import sql = require('./sql');

try {
  var parameters = new args.ArgsParser(process.argv);
} catch (e) {
  console.error(e);
  process.exit(1);
}

var files = imgprocessor.lsFiles(parameters);
var filesPromise = imgprocessor.getFiles(files);
filesPromise.then(function(files) {
  return files;
}).then(function(files) {
  return imgprocessor.processPictures(files);
}, function(error) {
  console.error('ERROR:Files not readable');
  console.error(error);
  process.exit(1);
});

var metaDataPromise = imgprocessor.processPictures(files);
metaDataPromise.then(function(metaDatas) {
  return metaDatas;
}).then(function(metaDatas) {
  var i: number,
      ilen: number,
      sqls = '',
      picture: p.Picture,
      pictures = [];

  for (i = 0, ilen = metaDatas.length; i < ilen; i++) {
    if (i === 2) break;
    picture = new p.Picture(metaDatas[i], parameters.albumId);
    sqls += sql.insertPicture(picture);
    sqls += "\n";
  }
  console.log(sqls);
}, function(err) {
  console.error('ERROR:Files not metadatable');
  console.log(err);
});

// oip --album-id 3 --dir ./

// arg_vars = process arguments
// for each .jpg file in $DIR
//   file = processor.process(file)
//   pictures.push(new Picture(file))
//   do stuff with picture
//   sqls.push(sql.writesql(picture))
// write sqls to $(FILE)
