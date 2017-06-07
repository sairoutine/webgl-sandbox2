'use strict';
var Game = require('./game');

var game;

window.onload = function() {
	var mainCanvas = document.getElementById('mainCanvas');

	var options = {webgl: true};

	game = new Game(mainCanvas, options);

	game.setupEvents();
	game.init();
	game.startRun();
};

