goog.provide('tracetext.SvgService');
goog.require('goog.net.XhrIo');

/**
 * @constructor
 */
tracetext.SvgService = function() {};

/**
 * Makes a request for the given XML URI.
 * @param {string} url
 * @param {function(string)} callback Called with the retrieved document.
 */
tracetext.SvgService.get = function(url, callback) {
  goog.net.XhrIo.send(url, function(event){
    callback(event.target.getResponseText());
  });
};