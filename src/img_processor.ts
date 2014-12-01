///<reference path='../typings/tsd.d.ts' />

import fs = require('fs');
import path = require('path');
import util = require('util');

import Promise = require('bluebird');
import im = require('imagemagick');

import args = require('./args');

var fs_readFile = Promise.promisify(fs.readFile);
var im_readMetadata = Promise.promisify(im.readMetadata);
var im_identify = Promise.promisify(im.identify);

export function lsFiles(params: args.IArgs): string[] {
  var files = fs.readdirSync(params.dirName);

  for (var i = 0, ilen = files.length; i < ilen; i++) {
    var file = files[i];
    files[i] = params.dirName + file;
  }
  return files;
}
export function getFiles(files: string[]): Promise<any> {
  var i: number,
      ilen: number,
      file: string,
      filePromises = [];

  for (i = 0, ilen = files.length; i < ilen; i++) {
    file = files[i];
    if (path.extname(file) === '.jpg') {
      filePromises.push(fs_readFile(file));
    }
  }

  return Promise.all(filePromises);
}

export function processPictures(files: string[]): Promise<any> {
  var i = 0,
      ilen = files.length,
      metaDataPromises = [];

  for ( ; i < ilen; i++) {
    if (path.extname(files[i]) === '.jpg') {
      metaDataPromises.push(im_identify(files[i]));
    }
  }

  return Promise.all(metaDataPromises);
}

// TODO fix with dependency injection
export function setFsReadFiles(s: any) {
  fs_readFile = s;
}
