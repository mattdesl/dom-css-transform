var transform = require('../')
var css = require('dom-css')
var mat4 = require('gl-mat4')

require('domready')(function() {
    var div = document.createElement('div')
    css(div, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        background: 'blue'
    })
    
    var matrix = mat4.identity([])
    mat4.translate(matrix, matrix, [0, 50, 0])
    mat4.rotateX(matrix, matrix, -Math.PI/8)
    mat4.rotateY(matrix, matrix, Math.PI/4)
    mat4.rotateZ(matrix, matrix, -Math.PI/4)


    // transform(div, 'rotateX(75deg)')
    // transform(div, { rotation: [75*Math.PI/180] })

    // transform(div, matrix)
    // transform(div, 'translateY(50px) rotateX(-20deg) rotateY(35deg) rotateZ(-45deg)')
    transform(div, {
        translation: [0, 50],
        rotation: [-20 * Math.PI/180, 35*Math.PI/180, -45*Math.PI/180]
    })

    document.body.appendChild(div)
})