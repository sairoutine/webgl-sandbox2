'use strict';
var core = require('./hakurei').core;
var util = require('./hakurei').util;
var SceneStage = require('./scene/stage');

var Game = function(canvas) {
	core.apply(this, arguments);
};
util.inherit(Game, core);

Game.prototype.init = function () {
	core.prototype.init.apply(this, arguments);

	this.addScene("stage", new SceneStage(this));

	this.changeSceneWithLoading("stage", {
		images: {
			player: "./image/marisa.png",
			bg: "./image/bg1.jpg",
			bullet: "./image/bullet_pack.png",
		}
	});
};

module.exports = Game;
