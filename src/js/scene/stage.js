'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;
var PoolManager = require('../hakurei').object.pool_manager;
var CONSTANT = require('../hakurei').constant;
var glmat = require("gl-matrix");
var Player = require('../object/player');
var Shot = require('../object/shot');

var SceneTitle = function(core) {
	base_scene.apply(this, arguments);
};
util.inherit(SceneTitle, base_scene);

SceneTitle.prototype.init = function(){
	base_scene.prototype.init.apply(this, arguments);

	this.player = new Player(this);
	this.player.init(this.core.width/2, this.core.height/2);
	this.addObject(this.player);

	this.pool_manager = new PoolManager(this, Shot);
	this.pool_manager.init();
	this.addObject(this.pool_manager);
};

SceneTitle.prototype.beforeDraw = function(){
	base_scene.prototype.beforeDraw.apply(this, arguments);

	// Zが押下されていればショット生成
	if(this.core.isKeyDown(CONSTANT.BUTTON_Z)) {
		this.player.shot();
	}

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

	// 画面外に出させない
	this.player.forbidOutOfStage();

	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.core.isKeyDown(CONSTANT.BUTTON_LEFT) && !this.core.isKeyDown(CONSTANT.BUTTON_RIGHT)) {
		// 左移動中
		this.player.animateLeft();
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_RIGHT) && !this.core.isKeyDown(CONSTANT.BUTTON_LEFT)) {
		// 右移動中
		this.player.animateRight();
	}
	else {
		// 左右には未移動
		this.player.animateNeutral();
	}
};



module.exports = SceneTitle;

