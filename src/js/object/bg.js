'use strict';
var base_object = require('../hakurei').object.sprite3d;
var util = require('../hakurei').util;
var glmat = require('gl-matrix');
var ShaderProgram = require('../hakurei').shader_program;
var VS = require("../shader/main.vs");
var FS = require("../shader/main.fs");


var Background = function (scene) {
	base_object.apply(this, arguments);

	this.shader_program = new ShaderProgram(
		this.core.gl,
		VS, FS,
		[
			"aTextureCoordinates",
			"aVertexPosition",
			"aColor"
		],
		[
			"uMVMatrix",
			"uPMatrix",
			"uSampler", // texture data
			"uFighterX",
			"uFighterY",
			"uTime",
			"uLight",
		]
	);
};
util.inherit(Background, base_object);

Background.prototype.init = function(x, y) {
	base_object.prototype.init.apply(this, arguments);
	this.x(x);
	this.y(y);

	this._setPerspectiveProjection();
};

Background.prototype.spriteName = function(){
	return "bg";
};
Background.prototype.spriteIndices = function(){
	return [
		{x: 0, y: 0},
	];
};
Background.prototype.spriteWidth = function(){
	return 512;
};
Background.prototype.spriteHeight = function(){
	return 512;
};

Background.prototype._initVertices = function() {
  this.vertices[0] = 0.0;
  this.vertices[1] = 0.0;
  this.vertices[2] = 0.0;

  this.vertices[3] = 1.0;
  this.vertices[4] = 0.0;
  this.vertices[5] = 0.0;

  this.vertices[6] = 1.0;
  this.vertices[7] = 4.0;
  this.vertices[8] = 0.0;

  this.vertices[9] = 0.0;
  this.vertices[10] = 4.0;
  this.vertices[11] = 0.0;
};

Background.prototype._initCoordinates = function() {
  this.coordinates[0] = 0.0;
  this.coordinates[1] = 4.0;

  this.coordinates[2] = 1.0;
  this.coordinates[3] = 4.0;

  this.coordinates[4] = 1.0;
  this.coordinates[5] = 0.0;

  this.coordinates[6] = 0.0;
  this.coordinates[7] = 0.0;
};

Background.prototype.beforeDraw = function(x, y) {
	base_object.prototype.beforeDraw.apply(this, arguments);

	glmat.mat4.identity(this.mvMatrix);
	glmat.mat4.rotate(this.mvMatrix, this.mvMatrix, Math.PI/180*52, [-1, 0, 0]);
	glmat.mat4.translate(this.mvMatrix, this.mvMatrix, [-0.5, 0-(((this.frame_count/2) | 0)%100)/100, -0.4]);
};

Background.prototype._setPerspectiveProjection = function() {
	glmat.mat4.identity(this.pMatrix);
	var near = 0.1;
	var far  = 10.0;
	glmat.mat4.perspective(this.pMatrix, 120, this.core.width / this.core.height, near, far);
};

Background.prototype.shader = function(){
	return this.shader_program;
};

Background.prototype.setupAdditionalVariables = function(){
	var gl = this.core.gl;
	var shader = this.shader();

	gl.uniform1i(shader.uniform_locations.uTime, this.frame_count);
	gl.uniform1f(shader.uniform_locations.uFighterX, this.scene.player.x());
	gl.uniform1f(shader.uniform_locations.uFighterY, this.core.height - this.scene.player.y());
	gl.uniform1i(shader.uniform_locations.uLight, true);
};







module.exports = Background;
