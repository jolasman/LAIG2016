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

    this.lightStatus = [false, false, false, false, false, false, false, false, false];
};

XMLscene.prototype.updateLights = function () {
    for(var i = 0; i < 7; i++) {

            if(this.lightStatus[i])	this.lights[i].enable();
            else this.lights[i].disable();

            this.lights[i].update();

    }
};

XMLscene.prototype.initLights = function () {



    this.omnisLight = this.graph.arrayOmni;
    this.spots = this.graph.arraySpot;

    this.count = 1;
    for(var i= 0; i < this.omnisLight.length; i++){
        this.positionLights = this.omnisLight[i][2];
        this.ambientlight = this.omnisLight[i][3];
        this.diff = this.omnisLight[i][4];
        this.spec = this.omnisLight[i][5];
        this.idLights = this.omnisLight[i][0];
        var enabledlight = this.omnisLight[i][1];

        this.lights[i].setPosition(this.positionLights[0],this.positionLights[1],this.positionLights[2],this.positionLights[3]);
        this.lights[i].setAmbient(this.ambientlight[0],this.ambientlight[1],this.ambientlight[2],this.ambientlight[3]);
        this.lights[i].setDiffuse(this.diff[0],this.diff[1],this.diff[2],this.diff[3]);
        this.lights[i].setSpecular(this.spec[0],this.spec[1],this.spec[2],this.spec[3]);

        if(enabledlight){
            this.lights[i].enable();
            this.lights[i].setVisible(true);
            this.lightStatus[i] = true;
        }else
        {
            this.lights[i].disable();
            this.lights[i].setVisible(false);
            this.lightStatus[i] = false;
        }
        this.lights[i].update();

        //this.count++;
       // console.log(this.graph.arrayOmni[i][0]);
       // this.graph.interface.addLightToggler(i, this.idLights);

    }


    // for(var j = 0; j < this.spots.length; j++){
    //
    //     this.targetspot = this.spots[j][4];
    //     this.positionLightsSpot = this.spots[j][5];
    //     this.ambientlightSpot = this.spots[j][3];
    //     this.diffSpot = this.spots[j][7];
    //     this.specSpot = this.spots[j][8];
    //     this.angleSpot = this.spots[j][2];
    //     this.eSpot = this.spots[j][3];
    //
    //     if(this.omnisLight.length == 0){
    //         this.lights[j].setSpotDirection(this.targetspot[0], this.targetspot[1], this.targetspot[2]);
    //         this.lights[j].setPosition(this.positionLightsSpot[0], this.positionLightsSpot[1], this.positionLightsSpot[2], this.positionLightsSpot[3]);
    //         this.lights[j].setAmbient(this.ambientlightSpot[0], this.ambientlightSpot[1], this.ambientlightSpot[2], this.ambientlightSpot[3]);
    //         this.lights[j].setDiffuse(this.diffSpot[0], this.diffSpot[1], this.diffSpot[2], this.diffSpot[3]);
    //         this.lights[j].setSpecular(this.specSpot[0], this.specSpot[1], this.specSpot[2], this.specSpot[3]);
    //         this.lights[j].setSpotCutOff(this.angleSpot);
    //         this.lights[j].setSpotExponent(this.eSpot);
    //
    //         this.lights[j].setVisible(true);
    //         this.lights[j].enable();
    //         this.lights[j].update();
    //     }else if(this.omnisLight.length > 0) {
    //
    //         this.lights[j + this.count].setSpotDirection(this.targetspot[0], this.targetspot[1], this.targetspot[2]);
    //         this.lights[j + this.count].setPosition(this.positionLightsSpot[0], this.positionLightsSpot[1], this.positionLightsSpot[2], this.positionLightsSpot[3]);
    //         this.lights[j + this.count].setAmbient(this.ambientlightSpot[0], this.ambientlightSpot[1], this.ambientlightSpot[2], this.ambientlightSpot[3]);
    //         this.lights[j + this.count].setDiffuse(this.diffSpot[0], this.diffSpot[1], this.diffSpot[2], this.diffSpot[3]);
    //         this.lights[j + this.count].setSpecular(this.specSpot[0], this.specSpot[1], this.specSpot[2], this.specSpot[3]);
    //         this.lights[j + this.count].setSpotCutOff(this.angleSpot);
    //         this.lights[j + this.count].setSpotExponent(this.eSpot);
    //
    //
    //         this.lights[j + this.count].setVisible(true);
    //         this.lights[j + this.count].enable();
    //         this.lights[j + this.count].update();
    //     }
    //
    // }

    // this.lights[0].setPosition(2, 3, 3, 1);
    // this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    // this.lights[0].update(); //para cada uma
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
    this.application.interface.setActiveCamera(this.camera);

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

    if(node.descendents.length == 0){

        this.multMatrix(node.matrix,matrixTrans);

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

            console.log(matiz);// caso mude os valores das tranformações nos nós pai esta matriz muda o seu valor, mas a imagem nao altera

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

