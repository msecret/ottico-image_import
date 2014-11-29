///<reference path='../typings/tsd.d.ts' />

import fs = require('fs');

import Promise = require('bluebird');
import tape = require('tape');

import DI = require('./dependency_injection');
import args = require('./args');
import imgProcessor = require('./img_processor');

var mockFs = {
  readdirSync: function(path: string): string[] {
    return ['file1'];
  },
  readFile: fs.readFile,
  fs_readFile: function(fileName: string): Promise<any> {
    var p = Promise.defer();
    p.resolve('datadatadata');
    return p.promise;
  }
};

tape('exists', (t: tape.Test) => {
  t.ok(imgProcessor, 'Processor exists');
  t.end();
});
