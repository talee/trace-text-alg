goog.provide('tracetext.Coordinate');

/**
 * @constructor
 * @param {number} x
 * @param {number} y
 */
tracetext.Coordinate = function(x, y) {
  this.x = x;
  this.y = y;
};

/**
 * Gets the slope to the given coordinate from the current instance.
 * @param {!tracetext.Coordinate} coordinate
 * @return {number}
 */
tracetext.Coordinate.prototype.slope = function(coordinate) {
  return (coordinate.y - this.y)/(coordinate.x - this.x);
};

/**
 * Pretty print array.
 * @param {!Array.<!tracetext.Coordinate>} coords
 * @param {number=} opt_numDecimals number of decimals for a coordinate
 * @return {string}
 */
tracetext.Coordinate.formatArray = function(coords, opt_numDecimals) {
  var i=0,
    coordsLen = coords.length,
    str = '';
  while (i < coordsLen) {
    str += tracetext.Coordinate._toFixed(coords[i].x, opt_numDecimals) + ', '
        + tracetext.Coordinate._toFixed(coords[i].y, opt_numDecimals) + '\n';
    i++;
  }
  return str;
};

/**
 * @param {!number} n
 * @param {number|undefined} numDecimals number of decimals for a coordinate
 * @return {!string}
 */
tracetext.Coordinate._toFixed = function(n, numDecimals) {
  if (numDecimals !== undefined) {
    return n.toFixed(numDecimals);
  } else {
    return n.toString();
  }
};