function MyTriangle(scene, cor1x, cor1y, cor1z,  cor2x, cor2y, cor2z, cor3x, cor3y, cor3z) {  //Left top and Right bottom
	CGFobject.call(this,scene);
    this.cor1x = cor1x;
    this.cor1y = cor1y;
    this.cor1z = cor1z;
    
    this.cor2x = cor2x;
    this.cor2y = cor2y;
    this.cor2z = cor2z;
    
    this.cor3x = cor3x;
    this.cor3y = cor3y;
    this.cor3z = cor3z;
    
    
    
    this.b= Math.sqrt((this.cor1x - this.cor3x) * (this.cor1x - this.cor3x) + 
			 		   (this.cor1y - this.cor3y) * (this.cor1y - this.cor3y) +
			 		   (this.cor1z - this.cor3z) * (this.cor1z - this.cor3z));

	this.c = Math.sqrt((this.cor2x - this.cor1x) * (this.cor2x - this.cor1x) + 
			 		   (this.cor2y - this.cor1y) * (this.cor2y - this.cor1y) +
			 		   (this.cor2z - this.cor1z) * (this.cor2z - this.cor1z));

    this.a = Math.sqrt((this.cor3x - this.cor2x) * (this.cor3x - this.cor2x) + 
			 		   (this.cor3y - this.cor2y) * (this.cor3y - this.cor2y) +
			 		   (this.cor3z - this.cor2z) * (this.cor3z - this.cor2z));

    
	this.cosBeta =  ( (this.a*this.a) - (this.b*this.b) + (this.c * this.c)) / (2 * this.a * this.c);
    
    this.sinB=Math.sqrt(1-Math.pow(this.cosBeta,2));


	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;


MyTriangle.prototype.updateTexCoords=function(amplifS, amplifT){
   
   this.texCoords = [
	 0,0,
     this.c/amplifS,0,
     (this.c-this.a*this.cosBeta)/amplifS,this.a*this.sinB/amplifT
    ];

    
    this.updateTexCoordsGLBuffers();
    
  
};

MyTriangle.prototype.initBuffers = function () {
	
        
    this.vertices = [
           this.cor1x, this.cor1y, this.cor1z, 
           this.cor2x, this.cor2y, this.cor2z, 
           this.cor3x, this.cor3y, this.cor3z,
        
          
			];

	this.indices = [
            0,1,2    
        ];
    
    //(x,y,z) x (a,b,c) = (yc-bz,az-xc,xb-ay).
    var vect12 = vec3.fromValues(this.cor1x-this.cor2x, this.cor1y-this.cor2y, this.cor1z-this.cor2z);
	var vect13 = vec3.fromValues(this.cor1x-this.cor3x, this.cor1y-this.cor3y, this.cor1z-this.cor3z);
	var N = vec3.create();
	vec3.cross(N, vect12, vect13);
	vec3.normalize(N, N);

	this.normals = [
		N[0], N[1], N[2],
		N[0], N[1], N[2],
		N[0], N[1], N[2],
    ];

    
    

    this.texCoords = [
	 0,0,
     this.c,0,
     this.c-this.a*this.cosBeta,this.a*this.sinB    
    ];


	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
}