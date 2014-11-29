///<reference path='../typings/tsd.d.ts' />

import fs = require('fs');
import path = require('path');
import vm = require('vm');

export function loadModule (filePath: string, mocks?: any): any {
  mocks = mocks || {};


  // this is necessary to allow relative path modules within loaded file
  // i.e. requiring ./some inside file /a/b.js needs to be resolved to /a/some
  var resolveModule = function(module: string) {
    if (module.charAt(0) !== '.') return module;
    return path.resolve(path.dirname(filePath), module);
  };

  var exports = {};
  var context = {
    require: function(name: string) {
      return mocks[name] || require(resolveModule(name));
    },
    console: console,
    exports: exports,
    module: {
      exports: exports
    }
  };

  vm.runInNewContext(fs.readFileSync('./build/js/' + filePath), context);
  return context;
}
