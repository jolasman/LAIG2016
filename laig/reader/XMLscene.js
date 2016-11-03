function XMLscene() {
	CGFscene.call(this);

	this.grafo = [];
	this.root = [];
	this.texturas = [];
	this.materiais = [];
	this.primitivas = [];
	this.application = null;

	this.anim_types = [];
	this.animacoes = [];
	this.nodeAnimations = [];
	this.animations_i = 0;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
	CGFscene.prototype.init.call(this, application);

	this.application = application;
	this.initCameras();
	this.enableTextures(true);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.lightStatus = [true, true, true, true, false, false, false, false];
	this.curr_time;
	this.setUpdatePeriod(10);
};

XMLscene.prototype.updateLights = function () {	
	for(var i = 0; i < 8; i++) {

		if(this.lightStatus[i]){
			this.lights[i].enable();
			this.lights[i].setVisible(true);
		}
		else{
			this.lights[i].disable();
			this.lights[i].setVisible(false);
		}

		this.lights[i].update();

	}
};

XMLscene.prototype.initLights = function () {

	this.omnisLight = this.graph.arrayOmni;
	this.spots = this.graph.arraySpot;
	this.count = this.spots.length;

	for(var i= 0; i < this.omnisLight.length; i++) {
		this.positionLights = this.omnisLight[i][2];
		this.ambientlight = this.omnisLight[i][3];
		this.diff = this.omnisLight[i][4];
		this.spec = this.omnisLight[i][5];
		this.idLights = this.omnisLight[i][0];
		this.enabledlight = this.omnisLight[i][1];
		this.enabledlightSpot = this.spots[i][1];


		this.lights[i].setPosition(this.positionLights[0], this.positionLights[1], this.positionLights[2], this.positionLights[3]);
		this.lights[i].setAmbient(this.ambientlight[0], this.ambientlight[1], this.ambientlight[2], this.ambientlight[3]);
		this.lights[i].setDiffuse(this.diff[0], this.diff[1], this.diff[2], this.diff[3]);
		this.lights[i].setSpecular(this.spec[0], this.spec[1], this.spec[2], this.spec[3]);

		if(this.enabledlight == true){
			this.lightStatus[i] = true;
		} else {
			this.lightStatus[i] = false;
		}
		this.lights[i].update();

	}

	for(var j = 0; j < this.spots.length; j++){

		this.targetspot = this.spots[j][4];
		this.positionLightsSpot = this.spots[j][5];
		this.ambientlightSpot = this.spots[j][6];
		this.diffSpot = this.spots[j][7];
		this.specSpot = this.spots[j][8];
		this.angleSpot = this.spots[j][2];
		this.eSpot = this.spots[j][3];

		if(this.omnisLight.length == 0){
			this.lights[j].setSpotCutOff(this.angleSpot);
			this.lights[j].setSpotExponent(this.eSpot);
			this.lights[j].setSpotDirection(this.targetspot[0], this.targetspot[1], this.targetspot[2]);
			this.lights[j].setPosition(this.positionLightsSpot[0], this.positionLightsSpot[1], this.positionLightsSpot[2], this.positionLightsSpot[3]);
			this.lights[j].setAmbient(this.ambientlightSpot[0], this.ambientlightSpot[1], this.ambientlightSpot[2], this.ambientlightSpot[3]);
			this.lights[j].setDiffuse(this.diffSpot[0], this.diffSpot[1], this.diffSpot[2], this.diffSpot[3]);
			this.lights[j].setSpecular(this.specSpot[0], this.specSpot[1], this.specSpot[2], this.specSpot[3]);

			if(this.enabledlightSpot == true){
				this.lightStatus[j] = true;
			} else {
				this.lightStatus[j] = false;
			}
			this.lights[j].update();

		}else if(this.omnisLight.length > 0) {

			this.lights[j + this.count].setSpotCutOff(this.angleSpot);
			this.lights[j + this.count].setSpotExponent(this.eSpot);
			this.lights[j + this.count].setSpotDirection(this.targetspot[0], this.targetspot[1], this.targetspot[2]);
			this.lights[j + this.count].setPosition(this.positionLightsSpot[0], this.positionLightsSpot[1], this.positionLightsSpot[2], this.positionLightsSpot[3]);
			this.lights[j + this.count].setAmbient(this.ambientlightSpot[0], this.ambientlightSpot[1], this.ambientlightSpot[2], this.ambientlightSpot[3]);
			this.lights[j + this.count].setDiffuse(this.diffSpot[0], this.diffSpot[1], this.diffSpot[2], this.diffSpot[3]);
			this.lights[j + this.count].setSpecular(this.specSpot[0], this.specSpot[1], this.specSpot[2], this.specSpot[3]);

			if(this.enabledlightSpot == true){
				this.lightStatus[j + this.count] = true;
			} else {
				this.lightStatus[j  + this.count] = false;
			}
			this.lights[j  + this.count].update();
		}
	}
};

XMLscene.prototype.initCameras = function () {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.createCameras = function () {

	this.cameras = this.graph.arrayPerspectiveViews;
	this.arrayCamaras = [];
	for(var i = 0; i < this.cameras.length; i++){
		this.angle = this.cameras[i][3];
		this.near = this.cameras[i][1];
		this.far = this.cameras[i][2];
		this.from = this.cameras[i][4];
		this.to = this.cameras[i][5];
		this.arrayCamaras.push(new CGFcamera(this.angle, this.near, this.far, vec3.fromValues(this.from[0], this.from[1], this.from[2]), vec3.fromValues(this.to[0], this.to[1], this.to[2])));
	}

	this.camera = this.arrayCamaras[0];
	this.camera_view = 0;
	this.application.interface.setActiveCamera(this.camera);

};

XMLscene.prototype.switchCameras = function () {
	if(this.camera_view < this.arrayCamaras.length - 1) {
		this.camera_view++;
		this.camera = this.arrayCamaras[this.camera_view];
		this.application.interface.setActiveCamera(this.camera);
	}

	else {
		this.camera = this.arrayCamaras[0];
		this.camera_view = 0;
		this.application.interface.setActiveCamera(this.camera);

	}

};

XMLscene.prototype.setDefaultAppearance = function () {

	// this.setAmbient(0.2, 0.4, 0.8, 1.0);
	// this.setDiffuse(0.2, 0.4, 0.8, 1.0);
	// this.setSpecular(0.2, 0.4, 0.8, 1.0);
	// this.setShininess(10.0);
};

//Handler called when the graph is finally loaded. 
//As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function (){
	this.gl.clearColor(this.graph.arrayBackground[0],this.graph.arrayBackground[1],this.graph.arrayBackground[2],this.graph.arrayBackground[3]);
	this.setGlobalAmbientLight(this.graph.arrayAmbient[0],this.graph.arrayAmbient[1],this.graph.arrayAmbient[2],this.graph.arrayAmbient[3]);
	this.initLights();
	this.createCameras();
	this.axis=new CGFaxis(this,this.root["axis"]);

};

XMLscene.prototype.writeGraph = function(noID,matrixTrans,materialID,textureID){
	var node = this.grafo[noID];
	var prim = node.primitives;

	if(node.descendents.length == 0){

		this.pushMatrix();
		
		var matriz = mat4.create();
		
		if(node.animacoes.length > 0 && node.currentAnimation != (-2)) {
			for(var h=0; h < node.currentAnimation+1; h++) {
				mat4.multiply(matriz, matrixTrans, node.animacoes[h].matrix);
			}

			mat4.multiply(matriz, matrixTrans, node.animacoes[node.currentAnimation].matrix);
		} 
		else {
		mat4.multiply(matriz, matrixTrans, node.matrix);
		}
		this.multMatrix(matriz);
		if(node.material == "inherit")//aplica material do pai
		{
			node.material = materialID
		}
		if(node.texture == "none") {//aplica textura null
			this.materiais[node.material].setTexture(null);
		}
		else if(node.texture == "inherit") {//aplica textura do pai
			this.materiais[node.material].setTexture(this.texturas[textureID]["textura"]);
			this.primitivas[prim].updateTexCoords(this.texturas[textureID]["length_s_t"]["s"], this.texturas[textureID]["length_s_t"]["t"]);
		}
		else if(node.texture != null){//aplica textura do no
			this.materiais[node.material].setTexture(this.texturas[node.texture]["textura"]);
			this.primitivas[prim].updateTexCoords(this.texturas[node.texture]["length_s_t"]["s"], this.texturas[node.texture]["length_s_t"]["t"]);
		}
		this.materiais[node.material].apply();
		this.primitivas[prim].display();
	}
	else{
		for(var i = 0; i < node.descendents.length; i++) {

			this.pushMatrix();
			

			var matiz = mat4.create();

			if(node.animacoes.length > 0 && node.currentAnimation != (-2)) {
				for(var h=0; h < node.currentAnimation+1; h++)
					mat4.multiply(matiz, matrixTrans, node.animacoes[h].matrix);
					
				mat4.multiply(matiz, matrixTrans, node.animacoes[node.currentAnimation].matrix);
			} 

			mat4.multiply(matiz, matrixTrans, node.matrix);

			var materialnode;

			if(node.material != "inherit"){// muda para o material do no
				materialnode = node.material;
			}else {
				materialnode = materialID; // mantem o material do pai
			}

			var texturenode;

			if(node.texture !== "inherit"){ // muda para a textura do no
				texturenode = node.texture;
			}

			else{
				texturenode = textureID; // mantem a textura do pai
			}
			if(this.grafo[node.descendents[i]] === undefined){
				console.warn("Node: " + node.descendents[i] + " doesn't exists, iteration ends here");
				this.grafo[node.descendents[i]] = null;
			}
			else if(this.grafo[node.descendents[i]]){

				this.writeGraph(node.descendents[i],matiz,materialnode,texturenode);
				this.popMatrix();
			}
		}
	}
};

XMLscene.prototype.display = function () {

	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
	this.loadIdentity();
	this.applyViewMatrix();
	this.setDefaultAppearance();


	if (this.graph.loadedOk)
	{
		this.axis.display();
		this.updateLights();

		var noinicial = this.root["id"];
		var matrizTransform = mat4.create();
		mat4.identity(matrizTransform);
		var materialInicial = this.grafo[noinicial].material != "null" ? this.grafo[noinicial].material :"branco";
		var texturaInicial = this.grafo[noinicial].texture;

		this.writeGraph(noinicial,matrizTransform,materialInicial,texturaInicial);

	}

};

XMLscene.prototype.update= function(currTime){
	var i=0;
	while(i < this.nodeAnimations.length){

		var no= this.grafo[this.nodeAnimations[i]];

		if(no.currentAnimation==-2)
			break;

		if(no.currentAnimation==-1)
			no.currentAnimation++;

		if(no.animacoes[no.currentAnimation].finished==1 && no.currentAnimation < no.animacoes.length) {
			no.currentAnimation++;
		}

		if(no.animacoes.length==no.currentAnimation){
			no.currentAnimation=-2;
			break;
		}
		else{
			no.animacoes[no.currentAnimation].update(currTime);
		}
		i++;
	}
};


