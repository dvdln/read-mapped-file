'use strict';

var setDefaults = require('./set-defaults');

/**
 * @module lib/util/parse-options
 * @private
 *
 * Parse options object. If options is a string then a new object is created
 * with the string using defaultKey as the property name.
 *
 * @param {?(FileConfig|string)} options
 * @param {?string} defaultKey
 * @returns {FileConfig}
 */
module.exports = function(options, defaultKey) {
  if (typeof options === 'string' && defaultKey) {
    var value = options;

    options = {};
    options[defaultKey] = value;
  } else if (!options) {
    options = {};
  }

  setDefaults(options, {
    src: '',
    code: '',
    map: {},
    mapSrc: ''
  });

  if (typeof options.map === 'string') {
    try {
      options.map = JSON.parse(options.map);
    } catch(err) {
      options.map = {};
    }
  }

  return options;
};
