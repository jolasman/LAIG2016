/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Vehicle(scene)
{
    CGFobject.call(this,scene);
    this.scene = scene;

    var controlPoints1 = [
        [-1.5,-1.5,0], [-2,-2,2], [-2,2,2], [-1.5,1.5,0],
        [0,0,3],       [0,-2,3],  [0,2,3],  [0,0,3],
        [1.5,-1.5,0],  [2,-2,2],  [2,2,2],  [1.5,1.5,0]
    ];
    var controlPoints2 =[
        [1.6,-1.5,0], [2.1,-2,2], [2.1,2,2],  [1.6,1.5,0],
        [3.2,0,3] ,   [4.2,-2,3], [4.2,2,3] , [3.2,0,3],
        [4.8,-1.5,0], [6.4,-2,2], [6.4,2,2] ,[4.8,1.5,0] ];

    this.vehicle = new Patch(scene,2,3,20,20,controlPoints1);
    this.vehicle2 = new Patch(scene,2,3,20,20,controlPoints2);
    this.vehicle3 = new Patch(scene,2,3,20,20,controlPoints1);

    this.torus1 = new MyTorus(this.scene, 0.5, 1.2, 30, 30);
    this.torus2 = new MyTorus(this.scene, 0.5, 1.2, 30, 30);
    this.torus3 = new MyTorus(this.scene, 0.5, 1.2, 30, 30);
    this.torus4 = new MyTorus(this.scene, 0.5, 1.2, 30, 30);
    this.torus5 = new MyTorus(this.scene, 0.3, 0.4, 30, 30);
    this.torus6 = new MyTorus(this.scene, 0.3, 0.4, 30, 30);



    this.torusAppearance1 = new CGFappearance(this.scene);
    this.torusAppearance1.setAmbient(0,0,0,1);
    this.torusAppearance1.setDiffuse(1.0,1.0,1.0,1);
    this.torusAppearance1.setSpecular(0,0.2,0.2,1);
    this.torusAppearance1.setShininess(0.8);
    this.torusAppearance1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.torusAppearance1.loadTexture("./texturas/roda.png");


    this.tetoAppearance1 = new CGFappearance(this.scene);
    this.tetoAppearance1.setAmbient(0,0,0,1);
    this.tetoAppearance1.setDiffuse(1.0,1.0,1.0,1);
    this.tetoAppearance1.setSpecular(0,0.2,0.2,1);
    this.tetoAppearance1.setShininess(0.8);
    this.tetoAppearance1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.tetoAppearance1.loadTexture("./texturas/tecto.png");


    this.luzesAppearance1 = new CGFappearance(this.scene);
    this.luzesAppearance1.setAmbient(0,0,0,1);
    this.luzesAppearance1.setDiffuse(1.0,1.0,1.0,1);
    this.luzesAppearance1.setSpecular(0,0.2,0.2,1);
    this.luzesAppearance1.setShininess(0.8);
    this.luzesAppearance1.setEmission(0.9,0.9,0.0,1)
    this.luzesAppearance1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.luzesAppearance1.loadTexture("./texturas/luzes.png");

    this.initBuffers();
};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor=Vehicle;

Vehicle.prototype.initBuffers = function () {



};

Vehicle.prototype.updateTexCoords=function(length_,length_T){};

Vehicle.prototype.display = function ()
{
    this.vehicle.display();
    this.vehicle2.display();




    this.scene.pushMatrix();
    this.luzesAppearance1.apply();
    this.scene.rotate(Math.PI/2, 0,1,0);
    this.scene.translate(-0.6,0.6,-1.5);
    this.torus5.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.luzesAppearance1.apply();
    this.scene.rotate(Math.PI/2, 0,1,0);
    this.scene.translate(-0.6,-0.6,-1.5);
    this.torus6.display();
    this.scene.popMatrix();



    this.scene.pushMatrix();
    this.torusAppearance1.apply();
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.translate(0,0,1.5);
    this.torus1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.translate(3.2,0,1.5);
    this.torus2.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.translate(0,0,-1.5);
    this.torus3.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.translate(3.2,0,-1.5);
    this.torus4.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tetoAppearance1.apply();
    this.scene.translate(1.8,0,1.5);
    this.vehicle3.display();
    this.scene.popMatrix();
};