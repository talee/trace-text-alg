goog.provide('tracetext.graphics.Path');
goog.require('goog.graphics.SvgGraphics');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.Stroke');
goog.require('goog.dom.DomHelper');

/**
 * Creates a new SVG element at the given selector and creates a path.
 * @param {!Array.<!tracetext.Coordinate>} coords of the path (lineTo)
 * @param {!string} domQuerySelector
 */
tracetext.graphics.Path.drawPath = function(coords, domQuerySelector) {
  var midpointPath = new goog.graphics.Path();
  midpointPath.moveTo(0, 0);
  /**
   * @const
   * @type {Array.<number>}
   */
  var coordNumbers = [];
  for (var i=0, coord; coord = coords[i]; i++) {
    coordNumbers[i*2] = coord.x*4;
    coordNumbers[i*2+1] = coord.y*4;
  }
  midpointPath.lineTo.apply(midpointPath, coordNumbers);
  var svg = new goog.graphics.SvgGraphics(20, 20);
  svg.createDom();
  svg.drawPath(midpointPath, new goog.graphics.Stroke(2, '#000000'), null);
  var dom = new goog.dom.DomHelper(document);
  dom.appendChild(dom.getElementsByTagNameAndClass(domQuerySelector)[0], svg.getElement());
};