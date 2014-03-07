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
 * @param {Source} data
 * @param {Object} options
 * @param {string} options.sourceKey
 * @param {string} options.resultKey
 * @param {?ReadFileCallback} [callback]
 * @returns {Source}
 */
module.exports = function(data, options, callback) {
  data = data || {};

  setDefaults(options, {
    sourceKey: '',
    resultKey: '',
    fs: 'utf8'
  });

  options.src = data.cwd
      ? path.join(data.cwd, data[options.sourceKey])
      : data[options.sourceKey];

  return (typeof callback === 'function')
      ? read(data, options, callback)
      : readSync(data, options);
};

/**
 * @private
 *
 * Read asynchronously.
 *
 * @param {FileConfig} data
 * @param {Object} options
 * @param {?ReadFileCallback} [callback]
 * @returns {FileConfig}
 */
function read(data, options, callback) {
  var errors = null;

  fs.stat(options.src, function(err, stats) {
    errors = addErrors(errors, err);

    if (stats.isFile()) {
      fs.readFile(options.src, options.fs, function(err, content) {
        data[options.resultKey] = parseContent(content, options);

        errors = addErrors(errors, err);
        callback(errors, data);
      });
    } else {
      errors = addErrors(errors, 'File not found: ' + options.src);
      callback(errors, data);
    }
  });

  return data;
}

/**
 * @private
 *
 * Read synchronously.
 *
 * @param {FileConfig} data
 * @param {Object} options
 * @param {?ReadFileCallback} [callback]
 * @returns {FileConfig}
 */
function readSync(data, options) {
  if (fs.existsSync(options.src)) {
    var content = fs.readFileSync(options.src, options.fs);

    data[options.resultKey] = parseContent(content, options);
  }

  return data;
}

/**
 * @private
 *
 * Conditions response content.
 *
 * @param {string} content
 * @param {Object} options
 */
function parseContent(content, options) {
  content = String(content || '');

  if (options.json) {
    try {
      content = JSON.parse(content);
    } catch(err) {
      content = {};
    }
  }

  return content;
}
