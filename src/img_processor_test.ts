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

tape('imageProcessor getFiles should return a promise with val',
    (t: tape.Test) => {
  var imgProcessor = DI.loadModule('./img_processor.js', {fs: mockFs});
  var expected = ['datadatadata'],
      testFilesPromise,
      testArgs;

  imgProcessor.setFsReadFiles(mockFs.fs_readFile);
  testArgs = new args.ArgsParser(['node', './', 'one', 'two', 'three']);
  testFilesPromise = imgProcessor.getFiles(testArgs);
  testFilesPromise.then(function(files) {
    t.ok(files, 'File data passed back is there');
    t.deepEquals(expected, files, 'Returns the correct file data');
  }, function(error) {
    t.fail(error);
  });
  t.end();
});

