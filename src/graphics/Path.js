goog.provide('tracetext.graphics.Path');
goog.require('goog.graphics.SvgGraphics');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.Stroke');
goog.require('goog.dom.DomHelper');
goog.require('goog.fx.Animation');
goog.require('goog.fx.Transition');
goog.require('goog.events');

/**
 * Creates a new SVG element at the given selector and creates a path.
 * @param {!Array.<!tracetext.Coordinate>} coords of the path (lineTo)
 * @param {!string} domQuerySelector
 */
tracetext.graphics.Path.drawPath = function(coords, domQuerySelector) {
  var path = new goog.graphics.Path();
  path.moveTo(0, 0);
  /**
   * @const
   * @type {Array.<number>}
   */
  var coordNumbers = [];
  for (var i=0, coord; coord = coords[i]; i++) {
    coordNumbers[i*2] = coord.x*4;
    coordNumbers[i*2+1] = coord.y*4;
  }
  path.lineTo.apply(path, coordNumbers);
  var svg = new goog.graphics.SvgGraphics(20, 20);
  svg.createDom();
  // Draw path and set px length of stroke animation
  var pathDOM = svg.drawPath(path, new goog.graphics.Stroke(2, '#000000'), null)
    .getElement();
  var pathLength = pathDOM.getTotalLength();
  pathDOM.style.strokeDasharray = pathLength;
  pathDOM.style.strokeDashoffset = pathLength;
  pathDOM.style.webkitAnimation = 'trace 2s forwards';

  var priorityStyleSheet = document.styleSheets[document.styleSheets.length-1];
  priorityStyleSheet.insertRule("@-webkit-keyframes trace { from { stroke-dashoffset: 430; } to { stroke-dashoffset: 0; } }", priorityStyleSheet.cssRules.length);

  // Animate via JS
  //var pathAnimation = new goog.fx.Animation([pathLength], [0], 1000);
  //goog.events.listen(pathAnimation, goog.fx.Animation.EventType.ANIMATE, function(event){
  //  pathDOM.style.strokeDashoffset = event.x;
  //});
  //goog.events.listen(pathAnimation, goog.fx.Transition.EventType.END, function(event){
  //  pathDOM.style.strokeDasharray = 0;
  //});

  var dom = new goog.dom.DomHelper(document);
  dom.appendChild(dom.getElementsByTagNameAndClass(domQuerySelector)[0], svg.getElement());
  //pathAnimation.play();
};