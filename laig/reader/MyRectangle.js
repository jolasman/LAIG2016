function MyRectangle(scene, Ltopx, Ltopy, Rbotx, Rboty) {  //Left top and Right bottom
	CGFobject.call(this,scene);
  
    this.Ltopx = Ltopx;
    this.Ltopy = Ltopy;
    this.Rbotx = Rbotx;
    this.Rboty = Rboty;
    this.amplifS=1;
    this.amplifT=1;
    
    this.minS=0;
    this.minT=0;
    this.maxT=1;
	this.maxS=1;

	this.initBuffers();
};

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor=MyRectangle;

MyRectangle.prototype.updateTexCoords=function(amplifS, amplifT){
   

    var width = this.Rbotx;
    var height = this.Ltopy;
    
    this.texCoords = [
        0,0,
		0.0, height /amplifT,
	 	width /amplifS, height /amplifT,
      	width /amplifS, 0.0
     ];
    
    
    this.updateTexCoordsGLBuffers();
    
  
};


MyRectangle.prototype.initBuffers = function () {
	this.vertices = [
           this.Ltopx, this.Ltopy, 0,  //canto superior esquerdo 
           this.Ltopx, this.Rboty, 0, //canto superior direito
           this.Rbotx, this.Rboty, 0,   //canto inferior esquerdo
           this.Rbotx, this.Ltopy, 0,   //canto inferior direito
			];
    
	this.indices = [
            0,1,2,
            2,3,0
        ];
    
    this.normals = [
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0
    ];
    
    this.texCoords = [
			this.minS,this.minT,
			this.minS,this.maxT,
			this.maxS,this.maxT,
			this.maxS,this.minT
	]
    
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};