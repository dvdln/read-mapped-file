'use strict';

module.exports = function(to, from) {
  Object.keys(from).forEach(function(key) {
    to[key] = to[key] || from[key];
  });

  return to;
};
