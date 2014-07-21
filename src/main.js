goog.provide('tracetext.main');
goog.require('tracetext.SvgService');
goog.require('tracetext.SvgObjectExtracter');

/**
 * @param {string} svgString
 */
function main(svgString) {
  var paths = tracetext.SvgObjectExtracter.extract(svgString);
  console.log(paths);
}
tracetext.SvgService.get('src/sample/T_path.svg', function(xml){
  main(xml);
});