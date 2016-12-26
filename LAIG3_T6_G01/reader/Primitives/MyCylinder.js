/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, height, bottom_rad, top_rad, stacks, slices) {
 	CGFobject.call(this,scene);

	this.slices=slices;
	this.stacks=stacks;
	this.height = height;
	this.bot_rad = bottom_rad;
	this.top_rad = top_rad;

 	this.initBuffers();
 }


 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.updateTexCoords=function(length_s, length_t){

};

 MyCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	var rad = (Math.PI*2)/this.slices;
 	var delta_y = (this.height/this.stacks);

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	var step_s = 0;
	var step_t = 1;

	for(var i = 0; i < this.stacks; i++)
	{
		var radius = i/this.stacks*(this.top_rad-this.bot_rad)+this.bot_rad;  //variable tax
		for(var j = 0; j <= this.slices; j++)
		{
			this.vertices.push(radius*Math.cos(j * rad), radius*Math.sin(j*rad), i * delta_y);
			this.normals.push(Math.cos(j * rad), Math.sin(j*rad), 0);
			this.texCoords.push(step_s, step_t);
			step_s+=(1/this.slices);
		}
		step_s = 0;

		step_t-=1/this.stacks;

		if(i == (this.stacks -1))
		{
			radius = (i+1)/this.stacks*(this.top_rad-this.bot_rad)+this.bot_rad;  //tax of the increment/decrement when bot and top are different
			for(var l = 0; l <= this.slices; l++)
			{
				this.vertices.push(radius*Math.cos(l * rad), radius*Math.sin(l*rad), i * delta_y + delta_y);
				this.normals.push(Math.cos(l * rad), Math.sin(l*rad), 0);
				this.texCoords.push(step_s, step_t);
				step_s+=(1/this.slices);
			}
		}
		step_t-=1/this.stacks;
	}

	for(var k = 0; k < this.slices-1 ; k++)
	{
		for(var s = 0; s < this.stacks; s++)
		{
			if( k == 0)
			{
				this.indices.push((this.slices + 1) + (s * (this.slices + 1)), 0 + (s * (this.slices + 1)), 1 + (s * (this.slices + 1)));
				this.indices.push(1 + (s * (this.slices + 1)), (this.slices + 2) + (s * (this.slices + 1)), (this.slices + 1) + (s * (this.slices + 1)));
			} else
			{
				this.indices.push((this.slices + 2) + ((s * (this.slices + 1)) + (k-1)), 1 + ((s * (this.slices + 1)) + (k-1)), 2 + ((s * (this.slices + 1)) + (k-1)));
				this.indices.push(2 + ((s * (this.slices + 1)) + (k-1)), 3 + this.slices + ((s * (this.slices + 1)) + (k-1)), (this.slices + 2) + ((s * (this.slices + 1)) + (k-1)));
			}
		}
	}

	for(var v = 0; v < this.stacks; v++)
	{
		this.indices.push((2 * this.slices) + (v * (this.slices + 1)), (this.slices - 1) + (v * (this.slices + 1)), this.slices + (v * (this.slices + 1)));
		this.indices.push(this.slices + (v * (this.slices + 1)), ((this.slices * 2) + 1) + (v * (this.slices + 1)), (2 * this.slices) + (v * (this.slices + 1)));
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
