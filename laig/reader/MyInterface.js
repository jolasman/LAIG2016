function MyInterface(){
	CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;


MyInterface.prototype.init = function(application){

	CGFinterface.prototype.init.call(this, application);

	this.gui= new dat.GUI();
	gui_lights= this.gui.addFolder("Lights");
	//gui_lights.open();

	for(var i=0; i < 8; i++) {
		gui_lights.add(this.scene.lightStatus, i, this.scene.lightStatus[i]);
	}

	this.gui.add(this.scene, 'switchCameras');
	// this.gui.add(this.scene, 'switchMaterials');
	
	this.gui.add(this.scene, 'linearAnimation');
	
	/*
	for(var j=0; j < this.scene.anim_types.length; j++) {
		this.gui.add(this.scene, 'linearAnimation');
	}*/
	
	
	return true;

};

MyInterface.prototype.processKeyDown = function(event) {

	switch (event.keyCode)
	{
		case (86): // 'V' mudar de vista
			this.scene.switchCameras();
	}
};
