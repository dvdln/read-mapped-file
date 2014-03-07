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
 * @param {?(Source|string)} options
 * @param {?ReadFileCallback} [callback]
 * @returns {Source}
 */
module.exports = function(options, callback) {
  var data = util.parseOptions(options, 'mapSrc');

  // Read sourceMappingURL from file
  readSourceMapAnnotation(data);

  // Default map filename to src + '.map'
  setDefaultMapFilename(data);

  // Determine if the map URL is absolute or relative
  detectAbsolutePath(data);

  // Apply cwd for map
  setMapWorkingDirectory(data);

  // Read source map file
  return util.readData(
    data,
    {
      sourceKey: 'mapSrc',
      resultKey: 'map',
      json: true
    },
    callback
  );
};

/**
 * Read sourceMappingURL annotation from source code.
 *
 * @param {FileConfig} data
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
 * Default map file name to src + '.map'
 *
 * @param {FileConfig} data
 */
function setDefaultMapFilename(data) {
  if (!data.mapSrc && data.src) {
    data.mapSrc = data.src + '.map';
  }
}

/**
 * Determine if the map path is absolute (at cwd) or relative to src dir.
 *
 * @param {FileConfig} data
 */
function detectAbsolutePath(data) {
  if (data.mapSrc && data.mapSrc.indexOf('/') === 0) {
    data.mapSrc = path.join('.', data.mapSrc);
  }
}

/**
 * Set working directory if our maps are stored in a different folder than src.
 *
 * @param {FileConfig} data
 */
function setMapWorkingDirectory(data) {
  if (data.mapSrc && data.mapDir) {
    data.mapSrc = path.join(data.mapDir, data.mapSrc);
  }
}
