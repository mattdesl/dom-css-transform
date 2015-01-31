var css = require('dom-css')
var stringify = require('./lib/stringify')
var compose = require('css-mat4')
var isArray = require('an-array')
var identity = require('gl-mat4/identity')

var tmpMat4 = identity([])

module.exports = function(element, value) {
    //is a flat array or matrix components
    if (value && typeof value === 'object') {
        //convert to flat array
        value = isArray(value) 
            ? value 
            : compose(tmpMat4, value)
        //stringify
        value = stringify(value)
    } 

    //default to identity/none
    if (!value)
        value = 'none'
    css(element, 'transform', value)
}