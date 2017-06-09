'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;
var CONSTANT = require('../hakurei').constant;
var ShaderProgram = require('../shader_program');
var VS = require('../shader/main.vs');
var FS = require('../shader/main.fs');
var glmat = require("gl-matrix");
var Player = require('../object/player');

var SceneTitle = function(core) {
	base_scene.apply(this, arguments);
};
util.inherit(SceneTitle, base_scene);

SceneTitle.prototype.init = function(){
	base_scene.prototype.init.apply(this, arguments);

	var player = new Player(this);
	player.init(this.core.width/2, this.core.height/2);

	this.addObject(player);

};

SceneTitle.prototype.beforeDraw = function(){
	base_scene.prototype.beforeDraw.apply(this, arguments);


};



module.exports = SceneTitle;

