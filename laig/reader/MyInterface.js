function MyInterface(){
    CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

MyInterface.prototype.init = function(application) {
    CGFinterface.prototype.init.call(this, application);
    this.gui = new dat.GUI();
    this.lights = this.gui.addFolder("Lights");
    this.lights.open();
    this.scenario = this.gui.addFolder("Scenarios");
    this.scenario.open();
    this.mode = this.gui.addFolder("Game Mode");
    this.mode.open();

    this.undo = this.gui.addFolder("Options");

    this.initScenarios();
    this.versusMode();

    return true;
};

MyInterface.prototype.initScenarios = function() {
    this.scenario1 = this.scenario.add(this.scene.scenarioNamesStatus,0, this.scene.scenarioNames[0]).name(this.scene.scenarioNames[0]);
    this.scenario2 = this.scenario.add(this.scene.scenarioNamesStatus,1, this.scene.scenarioNames[1]).name(this.scene.scenarioNames[1]);
    var view = this;
    this.contro1ler1 = this.scenario1.listen();
    this.contro1ler1.onChange(function (value) {
        if (value) {
            view.scene.scenarioNamesStatus[1] = false;
        }
    });
    this.controller2 = this.scenario2.listen();
    this.controller2.onChange(function (value) {
        if (value) {
            view.scene.scenarioNamesStatus[0] = false;

        }

    });
};

MyInterface.prototype.versusMode = function() {


    this.versusNames = ['Player vs Player', 'PlayerVSComputer', 'ComputerVSComputer'];
    this.versusPP = this.mode.add(this.scene.versus,0, this.versusNames[0]).name(this.versusNames[0]);
    this.versusPC = this.mode.add(this.scene.versus,1, this.versusNames[1]).name(this.versusNames[1]);
    this.versusCC = this.mode.add(this.scene.versus,1, this.versusNames[2]).name(this.versusNames[2]);
    var view = this;
    this.contro1lerversus1 = this.versusPP.listen();
    this.contro1lerversus1.onChange(function (value) {
        if (value) {
            view.scene.versus[0] = true;
            view.scene.versus[1] = false;
            view.scene.versus[2] = false;
            console.log(view.scene.versus[0]);
        }
    });
    this.controllerversus2 = this.versusPC.listen();
    this.controllerversus2.onChange(function (value) {
        if (value) {
            view.scene.versus[0] = true;
            view.scene.versus[1] = false;
            view.scene.versus[2] = false;
            console.log(view.scene.versus[0]);
        }

    });
    this.controllerversus3 = this.versusCC.listen();
    this.controllerversus3.onChange(function (value) {
        if (value) {
            view.scene.versus[0] = true;
            view.scene.versus[1] = false;
            view.scene.versus[2] = false;
            console.log(view.scene.versus[0]);
        }

    });


};

MyInterface.prototype.addGameScore = function(p1, p2){
    var scorep1 = [p1];
    var scorep2 = [p2];
    this.undo.close();
    this.group = this.gui.addFolder("Game Score");
    this.group.open();
    this.group.add(scorep1,0).name("player 1");
    this.group.add(scorep2,0).name("player 2");

};


MyInterface.prototype.OptionsActivate = function(p1, p2){
    this.undo.open();

    this.optionNames = ['Undo', 'Movie'];
    this.undoOption = this.undo.add(this.scene.optionsvalues,0, this.optionNames[0]).name(this.optionNames[0]);
    this.movieoption = this.undo.add(this.scene.optionsvalues,1, this.optionNames[1]).name(this.optionNames[1]);

    var view = this;
    this.contro1leroption1 = this.undoOption.listen();
    this.contro1leroption1.onChange(function (value) {
        if (value) {
            view.scene.optionsvalues[0] = true;
            view.scene.optionsvalues[1] = false;

        }
    });
    this.contro1leroption2 = this.movieoption.listen();
    this.contro1leroption2.onChange(function (value) {
        if (value) {
            view.scene.optionsvalues[0] = false;
            view.scene.optionsvalues[1] = true;
        }

    });


};


MyInterface.prototype.closeOptions = function(){
    this.scenario.close();
    this.mode.close();
    this.lights.close();
    this.OptionsActivate();


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
