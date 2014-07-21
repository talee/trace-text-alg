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
  for (var i=0, path; path = paths[i]; i++) {
    pathCoords[i] = [];
    /** @type {SVGPathElement} */
    var coord;
    for (var j=0; coord = path[j]; j++) {
      pathCoords[i][j] = {x: coord.pathSegList[j].x, y: path.pathSegList[j].y};
    }
  }
  return pathCoords;
};