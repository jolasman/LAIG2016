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
	
	// deste modo, basta chamar a chessboard_position[] com o indices da posição, e tem-se logo as coordenadas da pos
 	this.chessboard_position = [];
 	
 	var chessboard_k = 0;
 	for(var chessboard_i= 0; chessboard_i<5; i++){
         for(var chessboard_j = 0; chessboard_j<5; j++){
			chessboard_position[chessboard_k] = [12-8*chessboard_i,-20+8*chessboard_j,2]
         }
    }
	
	
	this.dados_position = [];
	var dados_i = 51;
	var dados_x = 20;
	
	while(dados_i < 57) {
		dados_position[dados_i] = [dados_x, -2, -30]	// a posiçao [x,y,z] dos dados amarelos, começando no de valor 1
		dados_i++;
		dados_x -= 10;
	}
	
	dados_x = 20;
	while(dados_i < 63) {
		dados_position[dados_i] = [dados_x, -2, -40]	// a posiçao [x,y,z] dos dados azuis, começando no de valor 1
		dados_i++;
		dados_x -= 10;
	}
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * função que inicializa os valores das cameras,das texturas,aaplicacao entre outros
 * @param application
 */
XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);
    this.scenarioNamesStatus = [true,false];

    this.initScenarios();

    this.application = application;
    this.initCameras();
    this.enableTextures(true);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.lightStatus = [false, false, false, false, false, false, false, false];

    this.curr_time;
    this.setUpdatePeriod(10);

    this.customShader = new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag");

    this.setPickEnabled(true);
    this.j =26;

    this.escolhido = null;
    this.dadoescolhido = null;
    this.state = 0;
    this.player = 1;


};
/**
 * funcao para fazer set da interface criada em MyInterface.js
 * @param interface
 */
XMLscene.prototype.setMyInterface = function (interface) {
    this.interface = interface;
};


/**
 * funcao que fazo update das luzes colocando-as enable or disable e visible ou invisible conforme o caso
 */
XMLscene.prototype.updateLights = function () {
    for(var i = 0; i < this.lightStatus.length; i++) {

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

/**
 * funcao que inicializa as luzes utilizando os array spot e pmni onde estao guardados os valores refentes as luzes criadas no .dsx
 */
XMLscene.prototype.initLights = function () {

    this.omnisLight = this.graph.arrayOmni;
    this.spots = this.graph.arraySpot;
    this.count = this.omnisLight.length + 1;


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
        this.interface.addLightToggler(i,this.idLights);
    }

    for(var j = 0; j < this.spots.length; j++){

        this.targetspot = this.spots[j][4];
        this.positionLightsSpot = this.spots[j][5];
        this.ambientlightSpot = this.spots[j][6];
        this.diffSpot = this.spots[j][7];
        this.specSpot = this.spots[j][8];
        this.angleSpot = this.spots[j][2];
        this.eSpot = this.spots[j][3];
        this.idLightsspot = this.spots[j][0];
        this.enabledlightSpot = this.spots[j][1];

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
        this.interface.addLightToggler(j + this.count,this.idLightsspot);
    }

};

/**
 * funcao que inicializa a camara que depois e substituida pela camara default especificada no .dsx
 */
XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

/**
 * funcao que cria as camaras especificadas no .dsx e coloca activa a default
 */
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
if(this.player == 1) {
    this.camera = this.arrayCamaras[1];
    this.camera_view = 0;
    this.application.interface.setActiveCamera(this.camera);
}


};

/**
 * funcao que usa a Myinterface.js para trocar de camara quando se carrega na tecla v do teclado
 */
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

XMLscene.prototype.setDefaultAppearance = function () {};

//Handler called when the graph is finally loaded. 
//As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function (){
    this.gl.clearColor(this.graph.arrayBackground[0],this.graph.arrayBackground[1],this.graph.arrayBackground[2],this.graph.arrayBackground[3]);
    this.setGlobalAmbientLight(this.graph.arrayAmbient[0],this.graph.arrayAmbient[1],this.graph.arrayAmbient[2],this.graph.arrayAmbient[3]);
    this.initLights();
    this.createCameras();
    this.axis=new CGFaxis(this,this.root["axis"]);

};

/**
 * funcao principal que desenha o grapho criado no .dsx no ecra.
 * @param noID no que esta a ser lido
 * @param materialID material do no pai
 * @param textureID material do no pai
 */
XMLscene.prototype.writeGraph = function(noID,materialID,textureID){
    var node = this.grafo[noID];
    var texturaprim;
    var texturaprimup;
    var material;
    var matriz = mat4.create();

    //tratamento das matrizes das animacoes
    if(node.animacoes.length > 0 && node.currentAnimation != (-2)) {
        mat4.multiply(matriz,matriz, node.animacoes[node.currentAnimation].matrix);
    }

    if(node.animacoes.length > 0 && node.currentAnimation == (-2)) {
        mat4.multiply(matriz,matriz, node.animacoes[node.animacoes.length-1].matrix);
    }

    //matriz dos nos
    mat4.multiply(matriz, matriz, node.matrix);
    this.multMatrix(matriz);
    if(node.material == "inherit")//aplica material do pai
    {
        material = materialID;
    }
    else if(node.material != null){
        material = node.material;
    }

    if(node.texture == "none") {//aplica textura null
        texturaprim = null;
    }
    else if(node.texture == "inherit") {//aplica textura do pai
        if(textureID == null){
            texturaprim = null;
        }else {
            texturaprim = this.texturas[textureID]["textura"];
            texturaprimup = textureID;
        }
    }
    else if(node.texture != null){//aplica textura do no
        texturaprim = this.texturas[node.texture]["textura"];
        texturaprimup = node.texture;
    }

//caso o no seja primitiva
    for(var i = 0; i< node.primitives.length; i++) {
        var nome = node.primitives[i];

        this.materiais[material].setTexture(texturaprim);
        if(texturaprim != null) {
            this.primitivas[nome].updateTexCoords(this.texturas[texturaprimup]["length_s_t"]["s"], this.texturas[texturaprimup]["length_s_t"]["t"]);
        }
        this.materiais[material].apply();


        this.primitivas[nome].display();
        this.clearPickRegistration();

    }
    for(var i = 0; i < node.descendents.length; i++) {

        this.pushMatrix();
        this.writeGraph(node.descendents[i],material,texturaprimup);
        this.popMatrix();
    }

};



XMLscene.prototype.logPicking = function ()
{
    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i=0; i< this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj)
                {
                    var customId = this.pickResults[i][1];
                    console.log("Picked object: " + obj + ", with pick id " + customId);
                    if(this.state == 0){
                        this.escolhido = customId;
                        this.state = 1;
                    }
                    else if(this.state == 1){
                        this.dadoescolhido = customId;
                        this.state=-1;
                    }
                    else if(this.state == -1){
                        this.escolhido = null;
                        this.dadoescolhido = null;
                        this.state=0;
                        if(this.player == 1){
                            this.camera = this.arrayCamaras[2];
                            this.camera_view = 0;
                            this.application.interface.setActiveCamera(this.camera);
                            this.player = 2;

                        }
                        else {
                            this.camera = this.arrayCamaras[1];
                            this.camera_view = 0;
                            this.application.interface.setActiveCamera(this.camera);
                            this.player =1;
                        }
                    }
                }
            }
            this.pickResults.splice(0,this.pickResults.length);
        }
    }
};



/**
 * funcao que faz o display no ecra do pretendido onde sao chamadas as outras funcoes com os valores que pretendemos colocar no ecra
 */
XMLscene.prototype.display = function () {


    this.logPicking();
    this.clearPickRegistration();

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    this.applyViewMatrix();
    this.setDefaultAppearance();
    this.updateScenario();
    if (this.graph.loadedOk)
    {
        // this.axis.display();
        this.updateLights();


        var noinicial = this.root["id"];
        var materialInicial = this.grafo[noinicial].material != "null" ? this.grafo[noinicial].material :"branco";
        var texturaInicial = this.grafo[noinicial].texture;

        this.writeGraph(noinicial,materialInicial,texturaInicial);
        this.j = 26;
    }
};

/**
 * funcao update das animacoes
 * @param currTime tempo atual
 */
XMLscene.prototype.update= function(currTime){
    var i=0;
    while(i < this.nodeAnimations.length){

        var no= this.grafo[this.nodeAnimations[i]];
//se nao houver animacoes no no
        if(no.currentAnimation==-2)
            break;

        if(no.currentAnimation==-1)
            no.currentAnimation++;

        //se ja fez uma continua a fazer as restantes
        if(no.animacoes[no.currentAnimation].finished==1 && no.currentAnimation < no.animacoes.length) {
            no.currentAnimation++;
        }
        //quando ja fez todas acaba
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


XMLscene.prototype.initScenarios = function () {

    this.scenarioNames = ['Mesa', 'Praia'];

    this.updateScenario();

};


XMLscene.prototype.updateScenario = function () {

    if(this.scenarioNamesStatus[0] == true){
        this.ficheiro= "cena.dsx";
        var myGraph = new MySceneGraph(this.ficheiro,this);
        this.scenarioNamesStatus[0] = false;
        var myScene = new XMLscene();
    }
    else if(this.scenarioNamesStatus[1] ==true){
        this.ficheiro= "scenario2.dsx";
        var myGraph2 = new MySceneGraph(this.ficheiro,this);
        this.scenarioNamesStatus[1] = false;
        var myScene2 = new XMLscene();

    }




};


