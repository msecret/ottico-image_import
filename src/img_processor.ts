///<reference path='../typings/tsd.d.ts' />

import fs = require('fs');
import util = require('util');

import args = require('./args');
import Promise = require('tspromise');
import Q = require('q');

var fs_readdir = Q.denodeify(fs.readdir),
    fs_readFile = Q.denodeify(fs.readFile);

export function getFiles(params: args.IArgs): Promise<any> {
  var dirs = fs_readdir(params.dirName);

  return dirs.then(function(files: string[]) {
    var i: number,
        ilen: number,
        file: string,
        filePromises = [];

    for (i = 0, ilen = files.length; i < ilen; i++) {
      file = params.dirName + files[i];
      filePromises.push(fs_readFile(files));
    }

    filePromises[0].then(function(thing) {
      console.log('alsjkfaslkjdfal;skjdfalksdjaf;ls');
      console.log(thing);
    }, function(err) {
      console.log('err');
      console.log(err);
    });

    return Promise.all(filePromises);
  });
}
