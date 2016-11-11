function Animation(scene, span) {
	this.scene = scene;
	this.span = span;
	this.matrix = mat4.create();
};

Animation.prototype.constructor = Animation;
