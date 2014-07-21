goog.provide('tracetext.main');
goog.require('tracetext.SvgService');
goog.require('tracetext.SvgObjectExtracter');
goog.require('tracetext.SvgCoordinatesExtracter');
goog.require('tracetext.Coordinate');
goog.require('tracetext.EndpointDetector');

/**
 * @param {!string} svgString
 */
function main(svgString) {
  var paths = tracetext.SvgObjectExtracter.extract(svgString);
  var coordSets = tracetext.SvgCoordinatesExtracter.extract(paths);
  console.log('coordSets', tracetext.Coordinate.formatArray(coordSets[0], 1));
  var endpoints = tracetext.EndpointDetector.getEndpoints(coordSets[0]);
  console.log('endpoints', endpoints);
}
tracetext.SvgService.get('src/sample/T_path.svg', function(xml){
  main(xml);
});