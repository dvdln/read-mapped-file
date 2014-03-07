'use strict';

var url = require('url');
var path = require('path');
var util = require('./util');

/**
 * @module lib/read-source-map
 *
 * Read a source map only. Supply callback to read file asynchronously. If a
 * map property is already set then the file will not be read.
 *
 * @param {object} options
 * @param {function} [callback]
 */
module.exports = function(options, callback) {
  var data = util.parseOptions(options, 'mapSrc');

  readSourceMapAnnotation(data);
  setDefaultMapFilename(data);
  detectAbsolutePath(data);
  setMapWorkingDirectory(data);

  if (data.mapSrc && !data.map) {
    util.readData(data, 'mapSrc', 'map', callback);
  }

  return data;
};

/**
 * Read sourceMappingURL annotation from source code.
 *
 * @param {object} data
 */
function readSourceMapAnnotation(data) {
  if (!data.mapSrc && data.code) {
    var m = data.code.match(/[#@]\s*sourceMappingURL\s*=\s*([^\s\*]+)/mi);

    if (m && m[1]) {
      data.mapSrc = url.parse(m[1]).pathname;
    }
  }
}

/**
 * Default map file name to source file + ".map"
 *
 * @param {object} data
 */
function setDefaultMapFilename(data) {
  if (!data.mapSrc && data.src) {
    data.mapSrc = data.src + '.map';
  }
}

/**
 * Determine if the map at our root (cwd) or relative to src.
 *
 * @param {object} data
 */
function detectAbsolutePath(data) {
  if (data.mapSrc && data.mapSrc.indexOf('/') === 0) {
    data.mapSrc = path.join('.', data.mapSrc);
  }
}

/**
 * Set working directory if our maps are stored in a different folder than src.
 *
 * @param {object} data
 */
function setMapWorkingDirectory(data) {
  if (data.mapSrc && data.mapDir) {
    data.mapSrc = path.join(data.mapDir, data.mapSrc);
  }
}
