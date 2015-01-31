# dom-css-transform

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Applies a CSS `transform` to a DOM element's style, accepting a string, array matrix, or discrete components to be recomposed according to [CSS3 transform spec](http://www.w3.org/TR/css3-transforms). Also handles vendor prefixing. 

```js
var transform = require('dom-css-transform')

var div = document.createElement('div')

//typical string style
transform(div, 'translateX(25px) rotateX(25deg)')

//a flat mat2d (9 elements) or mat4 (16 elements) array
var matrix = [0.5, 0, 0, 0.25, 0, 0]
transform(div, matrix)

//results in 3D "matrix3d()"
transform(div, {
    scale: [x, y, z],
    translate: [x, y, z] 
    rotate: [x, y, z]
})

//results in 2D "matrix()"
transform(div, {
    rotate: [0, 0, -Math.PI],
    translate: [-15, 25],
    scale: [0.15, 0.5]
})
// result --> "matrix(-0.15, 0, 0, -0.5, -15, 25)"

//reset to identity
transform(div, null)
// result --> "none"
```

## Usage

[![NPM](https://nodei.co/npm/dom-css-transform.png)](https://www.npmjs.com/package/dom-css-transform)

#### `transform(element, opt)`

Applies a CSS transform to the given DOM `element`, using the specified options. Types supported:

- `string` like `"translateX(25px) rotateZ(25deg)"` or `"matrix(0.5,0,0,1,0,0)"`
- array of 16 elements (4x4 matrix) or 9 elements (3x2 matrix for 2D transformations)
- an object with discrete components.
- null or undefined, which leads to identity transform (i.e. `"none"`)

When an object is specified, the reuslt is a 4x4 matrix composed by [css-mat4](https://github.com/mattdesl/css-mat4). Options:

- `translate` an array of `[x, y]` or `[x, y, z]` in pixels
- `rotate` an array of `[x, y, z]` in radians
- `scale` an array of `[x, y]` or `[x, y, z]` (z component defaults to 1)
- `skew` an array of `[x, y]` in radians for a combined 2D skew matrix
- `skewX`, `skewY` numbers in radians to mimic the independent CSS operations by the same name
- `quaternion` can be specified if `rotation` is undefined; it's an array of `[x, y, z, w]` components

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/dom-css-transform/blob/master/LICENSE.md) for details.
