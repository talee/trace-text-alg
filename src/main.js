goog.provide('tracetext.main');
goog.require('tracetext.SvgService');
goog.require('tracetext.SvgObjectExtracter');
goog.require('tracetext.SvgCoordinatesExtracter');

/**
 * @param {string} svgString
 */
function main(svgString) {
  var paths = tracetext.SvgObjectExtracter.extract(svgString);
  var coords = tracetext.SvgCoordinatesExtracter.extract(paths);
  console.log(coords);
}
tracetext.SvgService.get('src/sample/T_path.svg', function(xml){
  main(xml);
});