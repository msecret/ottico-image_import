///<reference path='../typings/tsd.d.ts' />

import fs = require('fs');
import util = require('util');

import args = require('./args');
import Promise = require('bluebird');

var fs_readdir = Promise.promisify(fs.readdir),
    fs_readFile = Promise.promisify(fs.readFile);

export function getFiles(params: args.IArgs): Promise<any> {
  var files = fs.readdirSync(params.dirName);
  var i: number,
      ilen: number,
      file: string,
      filePromises = [];

  for (i = 0, ilen = files.length; i < ilen; i++) {
    file = params.dirName + files[i];
    filePromises.push(fs_readFile(file));
  }

  return Promise.all(filePromises);
}
