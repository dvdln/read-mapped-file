'use strict';

/**
 * @module lib/util/add-error
 * @private
 *
 * Add error to errors array. If errors is not an array then a new array is
 * returned.
 *
 * @param {?(Array.<string>|string)} errors
 * @param {?string} err
 * @returns {?Array.<string>}
 */
module.exports = function(errors, err) {
  if (err) {
    errors = Array.isArray(errors) ? errors : [];
    err = Array.isArray(err) ? err : [err];

    errors = errors.concat(err);
  }

  return errors;
};
