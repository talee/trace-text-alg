/**
 * 
 * @fileoverview Extension of {@link goog.math.Coordinate}.
 */

goog.provide('tracetext.Coordinate');
goog.require('goog.math.Coordinate');

/**
 * @extends {goog.math.Coordinate}
 * @constructor
 */
tracetext.Coordinate = function(opt_x, opt_y) {
  goog.math.Coordinate.call(this, opt_x, opt_y);
};
goog.inherits(tracetext.Coordinate, goog.math.Coordinate);

/**
 * @param {!tracetext.Coordinate} coord
 * @return {!tracetext.Coordinate}
 */
tracetext.Coordinate.prototype.add = function(coord) {
  this.x += coord.x;
  this.y += coord.y;
  return this;
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

/**
 * Gets the mid point for each array of coordinates.
 * @param {!Array.<!Array.<tracetext.Coordinate>>} endpoints Each item in the
 * array is a list of coordinates that make up the endpoint
 * @return {!Array.<tracetext.Coordinate>}
 */
tracetext.Coordinate.getMidpoints = function(endpoints) {
  // TODO: Correctly process more than 2 coordinates per endpoint
  var midpoints = [];
  var i = endpoints.length;
  while (i--) {
    midpoints[i] = tracetext.Coordinate.getMidpoint(endpoints[i]);
  }
  return midpoints;
};

/**
 * @param {!Array.<!tracetext.Coordinate>} coords
 * @return {!tracetext.Coordinate}
 */
tracetext.Coordinate.getMidpoint = function(coords) {
  var i = coords.length;
  var midpoint = new tracetext.Coordinate(0, 0);
  while (i--) {
    midpoint.add(coords[i]);
  }
  midpoint.x = midpoint.x/coords.length;
  midpoint.y = midpoint.y/coords.length;
  return midpoint;
};