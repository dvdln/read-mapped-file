'use strict';

var fs = require('fs');
var path = require('path');
var addErrors = require('./add-errors');
var setDefaults = require('./set-defaults');

/**
 * @module lib/util/read-data
 * @private
 *
 * Read file specified on an object and sets the result on a different property
 * of the same object. Filename is read from data[sourceKey] and result is saved
 * to data[resultKey]. If callback is supplied then the file is read
 * asynchronously.
 *
 * @param {Object} options
 */
module.exports = function(options, callback) {
  setDefaults(options, {
    src: '',
    cwd: '',
    fs: 'utf8',
    async: true
  });

  if (options.cwd) {
    options.src = path.join(options.cwd, options.src);
  }

  if (options.async) {
    read(options, callback);
  } else {
    readSync(options, callback);
  }
};

/**
 * @private
 *
 * Read asynchronously.
 *
 * @param {Object} options
 * @param {Function} callback
 */
function read(options, callback) {
  var errors = null;

  if (!options.src || options.skip) {
    callback(errors, '');
  } else {
    fs.exists(options.src, function(exists) {
      if (exists) {
        fs.readFile(options.src, options.fs, function(err, content) {
          errors = addErrors(errors, err);
          callback(errors, content || '');
        });
      } else {
        errors = addErrors(errors, 'File not found: ' + options.src);
        callback(errors, '');
      }
    });
  }
}

/**
 * @private
 *
 * Read synchronously.
 *
 * @param {Object} options
 * @param {Function} callback
 */
function readSync(options, callback) {
  if (!options.src || options.skip) {
    return '';
  }

  var content = fs.existsSync(options.src)
      ? fs.readFileSync(options.src, options.fs)
      : '';

  callback(null, content);
}
