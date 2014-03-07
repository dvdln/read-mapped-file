'use strict';

var readMappedFile = require('../index.js');

exports.testSync = function(test) {
  var expect = require('./files/normal-expect');
  var data = readMappedFile({
    src: 'test/files/normal.js'
  });

  test.deepEqual(data, expect);
  test.done();
};

exports.testAsync = function(test) {
  var expect = require('./files/normal-expect');

  readMappedFile(
    {
      src: 'test/files/normal.js'
    },
    function(err, data) {
      test.equal(err, null);
      test.deepEqual(data, expect);
      test.done();
    }
  );
};

exports.testAbsoluteMap = function(test) {
  var expect = require('./files/absolute-map-expect');

  var data = readMappedFile({
    src: 'test/files/absolute-map.js'
  });

  test.deepEqual(data, expect);
  test.done();
};

exports.testMapOnly = function(test) {
  var expect = require('./files/map-only-expect');
  var data = readMappedFile({
    mapSrc: 'test/files/normal.js.map'
  });

  test.deepEqual(data, expect);
  test.done();
};
