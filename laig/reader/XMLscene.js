function XMLscene() {
    CGFscene.call(this);

    this.grafo = [];
    this.root = [];
    this.texturas = [];
    this.materiais = [];
    this.primitivas = [];
    this.application = null;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.application = application;
    this.initCameras();
    this.enableTextures(true);

    // this.gl.clearColor(0.0, 0.0, 0.0, 1.0);//background

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis=new CGFaxis(this);

    this.lightStatus = [true, true, true, true, false, false, false, false];

    this.switchMaterials = true;

    this.switch_camera = false;
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


    for(var i= 0; i < this.omnisLight.length; i++) {
        this.positionLights = this.omnisLight[i][2];
        this.ambientlight = this.omnisLight[i][3];
        this.diff = this.omnisLight[i][4];
        this.spec = this.omnisLight[i][5];
        this.idLights = this.omnisLight[i][0];
        this.enabledlight = this.omnisLight[i][1];

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

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function ()
{
    this.gl.clearColor(this.graph.arrayBackground[0],this.graph.arrayBackground[1],this.graph.arrayBackground[2],this.graph.arrayBackground[3]);
    this.setGlobalAmbientLight(this.graph.arrayAmbient[0],this.graph.arrayAmbient[1],this.graph.arrayAmbient[2],this.graph.arrayAmbient[3]);
    this.initLights();
    this.createCameras();

};

XMLscene.prototype.writeGraph = function(noID,matrixTrans,materialID,textureID){

    var node = this.grafo[noID];
    var prim = node.primitives;
    
    // if(this.switchMaterials) {
    // 	if(materialID == this.grafo[this.root["id"]].material.length - 1)
    // 		materialID == 0;
    // 	else
    // 		materialID++;
    // }

    if(node.descendents.length == 0){

        var matriz = mat4.create();

        mat4.multiply(matriz, matrixTrans, node.matrix);
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
    
    this.switchMaterials = false;
};

XMLscene.prototype.switchMaterials = function () {
	this.switchMaterials = true;
}

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

