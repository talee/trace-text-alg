goog.provide('tracetext.SvgCoordinatesExtracter');
goog.require('tracetext.Coordinate');

/**
 * Creates lists of coordinates for each path.
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
    var pathSeg;
    var numCoords = path.pathSegList.length;
    for (var j=0; j < numCoords; j++) {
      var prevPathSeg = pathCoords[i][j-1];
      pathSeg = path.pathSegList.getItem(j);
      // Lowercase means coordinates relative to previous coordinates; right, up
      if (prevPathSeg && pathSeg.pathSegTypeAsLetter === pathSeg.pathSegTypeAsLetter.toLowerCase()) {
        pathCoords[i][j] = new tracetext.Coordinate(prevPathSeg.x + pathSeg.x, prevPathSeg.y + pathSeg.y);
      } else {
        // TODO: Make it relative to prev path instead of first coordinate
        pathCoords[i][j] = new tracetext.Coordinate(pathSeg.x, pathSeg.y);
      }
    }
  }
  return pathCoords;
};