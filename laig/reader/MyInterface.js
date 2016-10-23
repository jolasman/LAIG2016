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
	this.gui.add(this.scene, 'switchMaterials');
	
	return true;

};


// MyInterface.prototype.adicionaLuzes	 = function(luzes){
//
// 		for(var i=0; i<luzes.length;i++){
//
// 		this.scene.lightStatus[luzes[i][0]]=luzes[i].enable;
//
// 		this.group.add(this.scene.lightStatus,i,luzes[i][0]);
//
// 	}
// };


MyInterface.prototype.processKeyDown = function(event) {

	switch (event.keyCode)
	{
		case (86): // 'V' mudar de vista
			this.scene.switchCameras();
		case (77): // 'M' mudar os materiais
			this.scene.switchMaterials();
	};
};
/*
MyInterface.prototype.processKeyDown = function(event) {
	if (event.which == 86 || event.which == 118) {
		if (this.scene.viewIndex == this.scene.graph.viewsIndex.length - 1)
			this.scene.viewIndex = 0;
		else
			this.scene.viewIndex++;

		this.scene.camera = this.scene.graph.perspectives[this.scene.graph.viewsIndex[this.scene.viewIndex]];
		this.setActiveCamera(this.scene.camera);
	} else if (event.which == 77 || event.which == 109) {
		for (var id in this.scene.graph.components) {
			if (this.scene.graph.components[id].materials.length > 1) {
				if (this.scene.graph.components[id].matIndex == this.scene.graph.components[id].materials.length - 1)
					this.scene.graph.components[id].matIndex = 0;
				else
					this.scene.graph.components[id].matIndex++;
			}
		}
	}
};
*/
