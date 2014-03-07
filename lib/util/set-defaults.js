'use strict';

/**
 * @private
 *
 * Set default values on an object.
 *
 * @param {Object} to
 * @param {Object} from
 * @returns {Object}
 */
module.exports = function(to, from) {
  Object.keys(from).forEach(function(key) {
    if (typeof to[key] === 'undefined') {
      to[key] = from[key];
    }
  });

  return to;
};
