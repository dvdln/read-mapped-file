'use strict';

var readMappedFile = require('../lib/read-mapped-file');

readMappedFile(
  {
    src: 'test.js',
    cwd: 'example'
  },
  function(err, data) {
    console.log(data);
  }
);
