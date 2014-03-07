'use strict';

var util = require('./util');

/**
 * @module lib/read-source-file
 *
 * Read a source file only. Supply callback to read file asynchronously. If a
 * code property is already set then the file will not be read.
 *
 * @param {?(FileConfig|string)} options
 * @param {?ReadFileCallback} [callback]
 */
module.exports = function(options, callback) {
  var data = util.parseOptions(options, 'src');

  if (data.src && !data.code) {
    util.readData(data, 'src', 'code', callback);
  }

  return data;
};
