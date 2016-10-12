
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);




    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);//background

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis=new CGFaxis(this);
};

XMLscene.prototype.updateLights = function () {
    for(var i = 0; i < [this.omnisLight + count].length; i++) {
        this.lights[i].update();
    }
};

XMLscene.prototype.initLights = function () {

    this.omnisLight = this.graph.arrayOmni;
    this.spots = this.graph.arraySpot;
    this.count = 0;
    for(var i= 0; i < this.omnisLight.length; i++){
        this.positionLights = this.omnisLight[i][2];
        this.ambientlight = this.omnisLight[i][3];
        this.diff = this.omnisLight[i][4];
        this.spec = this.omnisLight[i][5];

        this.lights[i].setPosition(this.positionLights[0],this.positionLights[1],this.positionLights[2],this.positionLights[3]);
        this.lights[i].setAmbient(this.ambientlight[0],this.ambientlight[1],this.ambientlight[2],this.ambientlight[3]);
        this.lights[i].setDiffuse(this.diff[0],this.diff[1],this.diff[2],this.diff[3]);
        this.lights[i].setSpecular(this.spec[0],this.spec[1],this.spec[2],this.spec[3]);


        this.lights[i].setVisible(true);
        this.lights[i].enable();
        this.lights[i].update();
        this.count = i;
    }

    for(var j = 0; j < this.spots.length; j++){

        this.targetspot = this.spots[j][4];
        this.positionLightsSpot = this.spots[j][5];
        this.ambientlightSpot = this.spots[j][3];
        this.diffSpot = this.spots[j][7];
        this.specSpot = this.spots[j][8];

        this.lights[j+this.count].setSpotDirection(this.targetspot[0],this.targetspot[1],this.targetspot[2]);
        this.lights[j+ this.count].setPosition(this.positionLights[0],this.positionLights[1],this.positionLights[2],this.positionLights[3]);
        this.lights[j + this.count].setAmbient(this.ambientlight[0],this.ambientlight[1],this.ambientlight[2],this.ambientlight[3]);
        this.lights[j + this.count].setDiffuse(this.diff[0],this.diff[1],this.diff[2],this.diff[3]);
        this.lights[j + this.count].setSpecular(this.spec[0],this.spec[1],this.spec[2],this.spec[3]);


        this.lights[i].setVisible(true);
        this.lights[i].enable();
        this.lights[i].update();


    }

    // this.lights[0].setPosition(2, 3, 3, 1);
    // this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    // this.lights[0].update(); //para cada uma
};

XMLscene.prototype.initCameras = function () {
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


    // this.setGlobalAmbientLight(this.graph.arrayAmbient[0],this.graph.arrayAmbient[1],this.graph.arrayAmbient[2],this.graph.arrayAmbient[3]);
    this.initLights();
    this.initCameras();





};

XMLscene.prototype.display = function () {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    this.axis.display();

    this.setDefaultAppearance();

    // ---- END Background, camera and axis setup

    // it is important that things depending on the proper loading of the graph
    // only get executed after the graph has loaded correctly.
    // This is one possible way to do it
    if (this.graph.loadedOk)
    {
        this.updateLights();
    }

};

