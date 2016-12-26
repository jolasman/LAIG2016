function MyInterface(){
    CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

MyInterface.prototype.init = function(application) {
    CGFinterface.prototype.init.call(this, application);
    this.gui = new dat.GUI();
    this.lights = this.gui.addFolder("Lights");
    this.scenario = this.gui.addFolder("Scenarios");
    this.score = this.gui.addFolder("Score");
    this.group = this.gui.addFolder("Game Config");
    this.group.open();
    this.initScenarios();
    this.addGameVars();


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




    // this.gui.add(this.scene, 'automaticCamera').name("Automatic Camera");
};




MyInterface.prototype.scoredisplay = function(p1, p2){
    this.score.add(this.scene,p1, 'player 1 score');
    this.score.add(this.scene, p2, "palyer 2 score");
};

MyInterface.prototype.addGameVars = function(){

    this.group.add(this.scene, 'player',-5,5);
    this.group.add(this.scene, "player2");
    this.group.add(this.scene, "botDifficulty");
    this.group.add(this.scene, "applyConfig");
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
