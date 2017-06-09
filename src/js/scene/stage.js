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

	this.player = new Player(this);
	this.player.init(this.core.width/2, this.core.height/2);

	this.addObject(this.player);

};

SceneTitle.prototype.beforeDraw = function(){
	base_scene.prototype.beforeDraw.apply(this, arguments);

	/*
	// Zが押下されていればショット生成
	if(this.core.isKeyDown(Constant.BUTTON_Z)) {
		this.player.shot();
	}
	*/

	var MOVE_NUM = 4;

	// 自機移動
	if(this.core.isKeyDown(CONSTANT.BUTTON_LEFT)) {
		this.player.x(this.player.x() - MOVE_NUM);
	}
	if(this.core.isKeyDown(CONSTANT.BUTTON_RIGHT)) {
		this.player.x(this.player.x() + MOVE_NUM);
	}
	if(this.core.isKeyDown(CONSTANT.BUTTON_DOWN)) {
		this.player.y(this.player.y() + MOVE_NUM);
	}
	if(this.core.isKeyDown(CONSTANT.BUTTON_UP)) {
		this.player.y(this.player.y() - MOVE_NUM);
	}

	/*
	// 画面外に出させない
	character.forbidOutOfStage();
	*/

	/*
	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.game.isKeyDown(Constant.BUTTON_LEFT) && !this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		// 左移動中
		character.animateLeft();
	}
	else if(this.game.isKeyDown(Constant.BUTTON_RIGHT) && !this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		// 右移動中
		character.animateRight();
	}
	else {
		// 左右には未移動
		character.animateNeutral();
	}
	*/
};



module.exports = SceneTitle;

