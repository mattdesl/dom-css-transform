var mat2d = require('./mat2d-stringify')
var mat4 = require('mat4-css-stringify')

module.exports = function(matrix) {
    var len = matrix && matrix.length
    if (len === 16)
        return mat4(matrix)
    else if (len === 6)
        return mat2d(matrix)
    return 'none'
}