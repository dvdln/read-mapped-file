'use strict';

/**
 * @module lib/util/parse-options
 * @private
 *
 * Parse options object. If options is a string then a new object is created
 * with the string using defaultKey as the property name.
 *
 * @param {?(FileConfig|string)} options
 * @param {string} defaultKey
 * @returns {FileConfig}
 */
module.exports = function(options, defaultKey) {
  var defaults = {
    src: '',
    code: '',
    map: '',
    mapSrc: ''
  };

  if (typeof options === 'string') {
    var value = options;

    options = {};
    options[defaultKey] = value;
  } else if (!options) {
    options = {};
  }

  Object.keys(defaults).forEach(function(key) {
    options[key] = options[key] || defaults[key];
  });

  return options;
};
