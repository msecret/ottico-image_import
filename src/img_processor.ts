///<reference path='../typings/tsd.d.ts' />

import fs = require('fs');
import util = require('util');

import Promise = require('bluebird');

import args = require('./args');

var fs_readFile = Promise.promisify(fs.readFile);

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
export function setFsReadFiles(s: any) {
  fs_readFile = s;
}
