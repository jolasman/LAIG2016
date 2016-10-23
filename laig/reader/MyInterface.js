function MyInterface(){
	CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;


MyInterface.prototype.init = function(application){

	CGFinterface.prototype.init.call(this, application);

	this.gui= new dat.GUI();
	var gui_lights= this.gui.addFolder("Lights");
	gui_lights.open();

	for(var i=0; i < 8; i++) {
		gui_lights.add(this.scene.lightStatus, i, this.scene.lightStatus[i]);
	}

	this.gui.add(this.scene, 'switchCameras');
	
	return true;

};


MyInterface.prototype.adicionaLuzes	 = function(luzes){


	for(var i=0; i < luzes.length; i++){

		this.scene.lightStatus[luzes[i][0]] = luzes[i].enable;

		this.group.add(this.scene.lightStatus,luzes[i][0]);

	}

};


MyInterface.prototype.processKeyDown = function(event) {

	switch (event.keyCode)
	{
		case (72):	// 'H' abre e fecha o GUI
			this.group.open();
		case (86): // 'V' mudar de vista
			this.scene.switchCameras();
	};
};

