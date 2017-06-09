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

	this.indexY = 0;
};

Player.prototype.spriteName = function(){
	return "player";
};
Player.prototype.spriteIndices = function(){
	return [
		/*
		{x: 0, y: this.indexY},
		{x: 1, y: this.indexY},
		{x: 2, y: this.indexY},
		{x: 3, y: this.indexY},
		*/
		{x: 4, y: this.indexY},
		{x: 5, y: this.indexY},
		{x: 6, y: this.indexY},
		{x: 7, y: this.indexY}
	];
};
Player.prototype.spriteAnimationSpan = function(){
	return 4;
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

// 移動アニメーション
Player.prototype.animateLeft = function(){
	this.indexY = 1;
};
Player.prototype.animateRight = function(){
	this.indexY = 2;
};
Player.prototype.animateNeutral = function(){
	this.indexY = 0;
};

Player.prototype.shot = function(){
	var SHOT_SPAN = 5;
	if(this.frame_count % SHOT_SPAN === 0) {
		this.scene.pool_manager.create(this.x(), this.y());
	}
};










module.exports = Player;
