goog.provide('tracetext.SvgCoordinatesExtracter');
goog.require('tracetext.Coordinate');

/**
 * Gets a list of sets of coordinates.
 * @param {!NodeList} paths
 * @return {!Array.<!Array.<!tracetext.Coordinate>>}
 */
tracetext.SvgCoordinatesExtracter.extract = function(paths) {
  /**
   * @const
   * @type {!Array.<!Array.<!tracetext.Coordinate>>}
   */
  var pathCoords = [];
  /** @type {SVGPathElement} */
  var path;
  for (var i=0; path = paths[i]; i++) {
    pathCoords[i] = [];
    /** @type {SVGPathSeg} */
    var coord;
    var numCoords = path.pathSegList.length;
    for (var j=0; j < numCoords; j++) {
      coord = path.pathSegList.getItem(j);
      pathCoords[i][j] = new tracetext.Coordinate(coord.x, coord.y);
    }
  }
  return pathCoords;
};