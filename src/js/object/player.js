'use strict';
var base_object = require('../hakurei').object.sprite3d;
var util = require('../hakurei').util;

var Player = function (scene) {
	base_object.apply(this, arguments);
};
util.inherit(Player, base_object);

Player.prototype.init = function(x, y) {
	base_object.prototype.init.apply(this, arguments);
	this.x(x);
	this.y(y);
};

Player.prototype.spriteName = function(){
	return "player";
};
Player.prototype.spriteIndices = function(){
	return [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}];
};
Player.prototype.spriteAnimationSpan = function(){
	return 6;
};
Player.prototype.spriteWidth = function(){
	return 32;
};
Player.prototype.spriteHeight = function(){
	return 48;
};

Player.prototype.forbidOutOfStage = function(){
	if(this.x() < 0) {
		this.x(0);
	}
	if(this.x() > this.core.width) {
		this.x(this.core.width);
	}
	if(this.y() < 0) {
		this.y(0);
	}
	if(this.y() > this.core.height) {
		this.y(this.core.height);
	}
};










module.exports = Player;
