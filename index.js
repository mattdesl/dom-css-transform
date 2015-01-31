var css = require('dom-css')
var stringify = require('./lib/stringify')
var isArray = require('an-array')

var mat4 = {
    copy: require('gl-mat4/copy'),
    identity: require('gl-mat4/identity')
}

var recompose = require('mat4-recompose')
var isArray = require('an-array')
var eulerToQuaternion = require('./lib/euler-to-quat')

var ZERO = [0, 0, 0]
var ONES = [1, 1, 1]
var IDENTITY = [0, 0, 0, 1]
var tmpQuat = [0, 0, 0, 1]

var tmpMat4 = mat4.identity([])
var tmpTranslation = ZERO.slice(),
    tmpRotation = ZERO.slice(),
    tmpScale = ZERO.slice(),
    tmpSkew = ZERO.slice()

module.exports = function(element, value) {
    //is a flat array or matrix components
    if (value && typeof value === 'object') {
        //convert to flat array
        value = isArray(value) ? value : compose(tmpMat4, value)
        //stringify
        value = stringify(value)
    } 

    //default to identity/none
    if (!value)
        value = 'none'

    css(element, 'transform', value)
}

function compose(out, opt) {
    mat4.identity(out)
        
    var translation = copyVec3(tmpTranslation, opt.translation || ZERO)
    var skew = copyVec3(tmpSkew, opt.skew || ZERO)
    var scale = copyScale3(tmpScale, opt.scale || ONES)
    var perspective = opt.perspective || IDENTITY
    var rotation = opt.quaternion

    if (!rotation) {
        //build a XYZ euler angle from 3D rotation
        rotation = quatIdentity(tmpQuat)
        var euler = copyVec3(tmpRotation, opt.rotation || ZERO)
        eulerToQuaternion(rotation, euler)
    }

    return recompose(out, translation, scale, skew, perspective, rotation)
}

function quatIdentity(out) {
    out[0] = 0
    out[1] = 0
    out[2] = 0
    out[3] = 1
    return out
}

//safely copy vec2/vec3 to a vec3
function copyVec3(out, a) {
    out[0] = a[0]||0
    out[1] = a[1]||0
    out[2] = a[2]||0
    return out
}

function copyScale3(out, a) {
    out[0] = typeof a[0] === 'number' ? a[0] : 1
    out[1] = typeof a[1] === 'number' ? a[1] : 1
    out[2] = typeof a[2] === 'number' ? a[2] : 1
    return out
}