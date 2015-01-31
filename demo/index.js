var transform = require('../')
var css = require('dom-css')
var tweenr = require('tweenr')()

require('domready')(function() {
    var card = createCard()
    document.body.appendChild(card.container)

    //some properties to transform
    var xform = {
        translate: [20, 20],
        rotate: [0, 0, 0]
    }

    //create a tween that updates the CSS every tick
    tweenr.to(xform, {
        duration: 2,
        delay: 0.75,
        rotate: [Math.PI/4, 0, Math.PI/4],
        translate: [150, 100],
        ease: 'expoOut'
    }).on('update', update)

    //set initial state
    update()

    function update() {
        transform(card.child, xform)
    }
})

function createCard() {
    var container = document.createElement('div')
    var div = document.createElement('div')
    container.appendChild(div)

    css(container, {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'perspective(1000px)',
        transformStyle: 'preserve-3d'
    })
    css(div, {
        width: 100,
        height: 100,
        background: 'blue'
    })

    return {
        container: container,
        child: div
    }
}