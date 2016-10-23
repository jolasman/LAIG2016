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

	gui_lights.add(this.scene, 'tmp_light');
	// booleano temporario. Quer-se adicionar o array das luzes
	
	gui_lights.add(this.scene, 'light_1');
	gui_lights.add(this.scene, 'light_2');
	gui_lights.add(this.scene, 'light_3');
	gui_lights.add(this.scene, 'light_4');
	gui_lights.add(this.scene, 'light_5');
	gui_lights.add(this.scene, 'light_6');
	gui_lights.add(this.scene, 'light_7');
	gui_lights.add(this.scene, 'light_8');
	gui_lights.add(this.scene, 'light_9');	

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