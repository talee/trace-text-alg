goog.provide('tracetext.EndpointDetector');
goog.require('tracetext.Coordinate');

/**
 * Finds the endpoints of an outline.
 * @param {!Array.<!tracetext.Coordinate>} coords Must be in the order they are pathed
 * @return {!Array.<Array.<tracetext.Coordinate>>} Each item in the array is a 
 * list of coordinates that make up the endpoint
 */
tracetext.EndpointDetector.getEndpoints = function(coords) {
  var i = 0,
    numCoords = coords.length;
  /** @type {!Array.<number>} */
  var slopes = [];
  /** @type {!Array.<Array.<tracetext.Coordinate>>} */
  var endpoints = [];
  /** @type {!tracetext.Coordinate} */
  var nextCoord;
  while (i < numCoords) {
    nextCoord = coords[i+1] || coords[0];
    slopes[i] = coords[i].slope(nextCoord);
    if (i !== 0 && tracetext.EndpointDetector.isCorner(slopes[i-1], slopes[i])) {
      endpoints.push([coords[i], nextCoord]);
    }
    i++;
  }
  return endpoints;
};

/**
 * Returns the radians between two slopes.
 * @param {!number} slopeA
 * @param {!number} slopeB
 * @return {number|undefined}
 */
tracetext.EndpointDetector.getAngleBetween = function(slopeA, slopeB) {
  return Math.atan((slopeA - slopeB)/(1 + slopeA*slopeB));
};

/**
 * Returns true if angle between slopes is &lt;= than | PI/4 |.
 * @param {number} slopeA
 * @param {number} slopeB
 * @return {!boolean}
 */
tracetext.EndpointDetector.isCorner = function(slopeA, slopeB) {
  slopeA = tracetext.EndpointDetector._normalize(slopeA);
  slopeB = tracetext.EndpointDetector._normalize(slopeB);
  return tracetext.EndpointDetector.getAngleBetween(slopeA, slopeB) <= Math.PI/4;
};

/**
 * Returns slope as a finite number.  Allows simpler calculations.
 * @param {!number} slope
 * @return {!number}
 */
tracetext.EndpointDetector._normalize = function(slope) {
  /** @const */
  var LARGE_NUM = 99999;
  if (!isFinite(slope)) {
    slope = slope > 0 ? LARGE_NUM : -LARGE_NUM;
  }
  return slope;
};

//NOTE: -x/y == orthogonal slope of slope y/x