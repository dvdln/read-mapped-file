/**
 * @module read-mapped-file
 *
 * Read a file and its associated source map.
 *
 * @author David Lane <me@dvdln.com>
 * @see {@link https://github.com/dvdln/read-mapped-file}
 * @license MIT
 */
module.exports = require('./lib/read-mapped-file');

/**
 * @callback ReadFileCallback
 * @param {?Array.<string>} err
 * @param {Source} data
 */

/**
 * @typedef {Object} FileConfig
 * @property {?string} src
 * @property {?string} cwd
 * @property {?string} mapSrc
 * @property {?string} mapDir
 * @property {?(Object.<string, string>|string)} fs
 * @property {?string} code
 * @property {?string} map
 */

/**
 * @typedef {Object} Source
 * @property {string} code
 * @property {string} map
 * @property {string} src
 * @property {string} cwd
 * @property {string} mapSrc
 */
