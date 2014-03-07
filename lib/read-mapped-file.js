'use strict';

var util = require('./util');
var readSourceFile = require('./read-source-file');
var readSourceMap = require('./read-source-map');

/**
 * @module lib/read-mapped-file
 *
 * Reads a file and its source map. Supply callback to read file
 * asynchronously.
 *
 * @param {object} options
 * @param {function} [callback]
 * @returns {object}
 */
module.exports = function(options, callback) {
  var data = util.parseOptions(options, 'src');
  var errors = null;

  if (typeof callback === 'function') {
    readSourceFile(data, function(err, data) {
      errors = util.addErrors(errors, err);

      readSourceMap(data, function (err, data) {
        errors = util.addErrors(errors, err);

        callback(errors, data);
      });
    });
  } else {
    data = readSourceFile(data);
    data = readSourceMap(data);
  }

  return data;
};

// Additional library
module.exports.readSourceFile = readSourceFile;
module.exports.readSourceMap = readSourceMap;
