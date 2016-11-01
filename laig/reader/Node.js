function Node(){
    this.material=null;
	this.texture=null;
	this.matrix=mat4.create();
	this.descendents = [];
	this.primitives = [];
	this.type = null;
	this.args = null;
	this.animacoes = [];
	this.currentAnimation=-1;

};

Node.prototype.setMaterial=function(material){
		this.material=material;
};

Node.prototype.setTexture=function(texture){
		this.texture=texture;
};

Node.prototype.setType=function(type){
    this.type=type;
};

Node.prototype.setArgs=function(args){
    this.args=args;
};

Node.prototype.push=function(nodename){

	this.descendents.push(nodename);
};

Node.prototype.setPrimitives = function(primitiveid){
	this.primitives.push(primitiveid);
};

