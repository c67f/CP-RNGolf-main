// Code Practice: RNGolf
// Name: Cal Friedman
// Date: 2/2/2024

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    physics: {
        default: 'arcade', //defining an object within this object property
        arcade: {
            debug: true //turn on debug mode to show collision boxes
        }
    },
    scene: [ Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config