'use strict';

var fs = require('fs');
var path = require('path');
var addErrors = require('./add-errors');

/**
 * @module lib/util/read-data
 * @private
 *
 * Read file specified on an object and sets the result on a different property
 * of the same object. Filename is read from data[srcKey] and result is saved
 * to data[resultKey]. If callback is supplied then the file is read
 * asynchronously.
 *
 * @param {object} data
 * @param {string} srcKey
 * @param {string} resultKey
 * @param {function} [callback]
 * @returns {object}
 */
module.exports = function(data, srcKey, resultKey, callback) {
  data = data || {};

  var src = data.cwd
      ? path.join(data.cwd, data[srcKey])
      : data[srcKey];

  var fsOptions = data.fs || 'utf8';
  var errors = null;

  if (typeof callback === 'function') {
    fs.exists(src, function(exists) {
      if (exists) {
        fs.readFile(src, fsOptions, function(err, content) {
          errors = addErrors(errors, err);

          data[resultKey] = String(content) || '';

          callback(errors, data);
        });
      } else {
        errors = addErrors(errors, 'File not found: ' + src);
        callback(errors, data);
      }
    });
  } else if (fs.existsSync(src)) {
    data[resultKey] = fs.readFileSync(src, fsOptions);
  }

  return data;
};
