var scratch = new Array(6)
for (var i=0; i<6; i++)
    scratch[i] = 0

module.exports = function stringifyMat2d(matrix) {
    if (!matrix)
        return 'none'

    for (var i=0; i<6; i++)
        scratch[i] = Math.round(matrix[i]*1e15) / 1e15
    return 'matrix('+Array.prototype.join.call(scratch, ', ')+')'
}