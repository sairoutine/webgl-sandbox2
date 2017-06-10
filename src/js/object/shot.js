'use strict';
var base_object = require('../hakurei').object.sprite3d;
var util = require('../hakurei').util;

var Shot = function (scene) {
	base_object.apply(this, arguments);
};
util.inherit(Shot, base_object);

Shot.prototype.init = function(x, y) {
	base_object.prototype.init.apply(this, arguments);
	this.x(x);
	this.y(y);
	this.setVelocity({magnitude:5, theta:270});
};

Shot.prototype.spriteName = function(){
	return "bullet";
};
Shot.prototype.spriteIndices = function(){
	return [
		{x: 8, y: 1},
	];
};
Shot.prototype.spriteWidth = function(){
	return 16;
};
Shot.prototype.spriteHeight = function(){
	return 16;
};

module.exports = Shot;
