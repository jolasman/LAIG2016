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

	return true;

};


MyInterface.prototype.adicionaLuzes	 = function(luzes){


	for(var i=0; i < luzes.length; i++){

		this.scene.lightStatus[luzes[i][0]] = luzes[i].enable;

		this.group.add(this.scene.lightStatus,luzes[i][0]);

	}

};

//
// Template keyboard access interface
//
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (72):	// only works for capital 'A', as it is
			this.group.open();
	};
};