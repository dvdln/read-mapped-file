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
 * @returns {Source}
 */
module.exports = function(options, callback) {
  var data = util.parseOptions(options, 'src');

  // Read source file
  readSourceFile(data, callback);

  return data;
};

/**
 * Load source file from disk.
 *
 * @param {FileConfig} data
 * @param {?ReadFileCallback} [callback]
 */
function readSourceFile(data, callback) {
  var read = {
    src:    data.src,
    skip:   data.code !== '',
    cwd:    data.cwd,
    fs:     data.fs,
    async:  typeof callback === 'function'
  };

  util.readData(read, function(errors, content) {
    data.code = content || '';

    if (read.async) {
      callback(errors, data);
    }
  });
}
