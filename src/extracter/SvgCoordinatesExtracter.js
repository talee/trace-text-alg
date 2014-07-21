goog.provide('tracetext.SvgCoordinatesExtracter');

/**
 * Gets a list of sets of coordinates.
 * @param {NodeList} paths
 * @return {Array.<Array.<{x: number, y: number}>>}
 */
tracetext.SvgCoordinatesExtracter.extract = function(paths) {
  /**
   * @const
   * @type {Array.<Array.<{x: number, y: number}>>}
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
      pathCoords[i][j] = {x: coord.x, y: coord.y};
    }
  }
  return pathCoords;
};