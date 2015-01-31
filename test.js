var transform = require('./')
var test = require('tape')
var prefix = require('prefix-style')
var css = require('dom-css')
var mat4 = require('gl-mat4')

test('composes a CSS transform matrix from components', function(t) {
    var div = document.body.appendChild(document.createElement('div'))

    transform(div, 'translateX(25px)')
    t.equal(compute(div), 'matrix(1, 0, 0, 1, 25, 0)', 'string transform')
    css(div, 'transform', null)

    transform(div, 'translateX(25px)')
    transform(div, null)
    t.equal(compute(div), 'none', 'null clears style to auto')
    
    transform(div, 'translateX(25px)')
    transform(div, 'none')
    t.equal(compute(div), 'none', 'none clears style to auto')

    var tmpMat4 = mat4.identity([])
    mat4.translate(tmpMat4, tmpMat4, [5, 10, 30])
    run(div, tmpMat4)
    t.equal(compute(div), 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 30, 1)', 'mat4 with translation')

    var tmpMat2d = [-1, 2, -2, -1, 25, 15]
    run(div, tmpMat2d)
    t.equal(compute(div), 'matrix(-1, 2, -2, -1, 25, 15)', 'mat2d with rotation translation')

    run(div, {
        translate: [5, 10, 30]
    })
    t.equal(compute(div), 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 30, 1)', 'obj with translation')

    run(div, {
        rotate: [0, Math.PI/2, 0]
    })
    t.equal(compute(div), 'matrix3d(0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1)', 'obj with rotation')

    run(div, {
        quaternion: [0, 0, 1, 1],
        translate: [25, 15]
    })
    t.equal(compute(div), 'matrix(-1, 2, -2, -1, 25, 15)', 'mat3 with 2D quaternion rotation translation')

    run(div, {
        quaternion: [0, 0, 1, 1],
        translate: [25, 15, -5]
    })
    t.equal(compute(div), 'matrix3d(-1, 2, 0, 0, -2, -1, 0, 0, 0, 0, 1, 0, 25, 15, -5, 1)', 'adding Z will make matrix3d')

    run(div, {
        scale: [-0.25, 0.5, 1],
    })
    t.equal(compute(div), 'matrix(-0.25, 0, 0, 0.5, 0, 0)', 'scale in 2d')

    run(div, {
        scale: [-0.25, 0.5],
    })
    t.equal(compute(div), 'matrix(-0.25, 0, 0, 0.5, 0, 0)', 'scale in 2d with 2 components')

    run(div, {
        skew: [0.25, -0.6],
    })
    t.equal(compute(div), 'matrix(1, -0.684136808341692, 0.255341921221036, 1, 0, 0)', 'skew in 2d')

    run(div, {
        rotate: [0, 0, -Math.PI],
        translate: [-15, 25],
        scale: [0.15, 0.5]
    })
    t.equal(compute(div), 'matrix(-0.15, 0, 0, -0.5, -15, 25)', 'transforms in 2d')

    document.body.removeChild(div)
    t.end()
})

function run(element, opt) {
    transform(element, null)
    transform(element, opt)
}

function compute(element) {
    var prop = prefix('transform')
    return window.getComputedStyle(element, null)[prop]
}