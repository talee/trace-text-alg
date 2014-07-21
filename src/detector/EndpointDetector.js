goog.provide('tracetext.EndpointDetector');
goog.require('tracetext.Coordinate');

/**
 * Finds the endpoints of an outline.
 * @param {!Array.<!tracetext.Coordinate>} coords Must be in the order they are pathed.
 * @return {!Array.<number>}
 */
tracetext.EndpointDetector.getEndpoints = function(coords) {
  var i = 0,
    numCoords = coords.length;
  /** @type {!Array.<number>} */
  var slopes = [];
  /** @type {!tracetext.Coordinate} */
  var nextCoord;
  while (i < numCoords) {
    nextCoord = coords[i+1] || coords[0];
    slopes[i] = coords[i].slope(nextCoord);
    i++;
  }
  return slopes;
};