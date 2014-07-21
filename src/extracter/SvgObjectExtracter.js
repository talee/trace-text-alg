goog.provide('tracetext.SvgObjectExtracter');
/**
 * @constructor
 */
tracetext.SvgObjectExtracter = function() {};
/**
 * Extracts SVG objects from given SVG document string.
 * @param {string} svgString SVG document represented as a string.
 * @return {NodeList} of objects containing coordinates
 */
tracetext.SvgObjectExtracter.extract = function(svgString) {
  return new DOMParser()
    .parseFromString(svgString, 'image/svg+xml')
    .querySelectorAll('path');
};