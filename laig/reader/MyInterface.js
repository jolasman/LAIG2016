function MyInterface(){
	CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;


MyInterface.prototype.init = function(application){


	CGFinterface.prototype.init.call(this,application);

	this.gui= new dat.GUI();

	this.group= this.gui.addFolder("Lights");
	this.group.open();

	return true;

};


MyInterface.prototype.adicionaLuzes = function(luzes){


	for(var i=0; i < luzes.length; i++){

		this.scene.lightStatus[luzes[i][0]] = luzes[i].enable;

		this.group.add(this.scene.lightStatus,luzes[i][0]);

	}

};