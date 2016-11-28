function MyInterface(){
	CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

MyInterface.prototype.init = function(application) {
    CGFinterface.prototype.init.call(this, application);
    this.gui = new dat.GUI();
    this.lights = this.gui.addFolder("Lights");

    return true;
};

MyInterface.prototype.initScenario = function() {
	this.gui.add(this.scene, 'scenarioName', this.scene.scenarioNames).name("Scenario");
	// this.gui.add(this.scene, 'automaticCamera').name("Automatic Camera");
};







MyInterface.prototype.addLightToggler = function(i, id){
    this.lights.add(this.scene.lightStatus, i, this.scene.lightStatus[i]).name(id);
};

MyInterface.prototype.processKeyDown = function(event) {

	switch (event.keyCode)
	{
		case (86): // 'V' mudar de vista
			this.scene.switchCameras();
	}
};
