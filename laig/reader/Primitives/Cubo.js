/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Cubo(scene)

{
    CGFobject.call(this,scene);
    this.scene = scene;

    this.ladobaixo = new MyRectangle(scene,0,1,1,0);
    this.ladoesquerdo = new MyRectangle(scene,0,1,1,0);
    this.ladodireito = new MyRectangle(scene,0,1,1,0);
    this.ladotras = new MyRectangle(scene,0,1,1,0);
    this.ladofrente = new MyRectangle(scene,0,1,1,0);
    this.ladocima = new MyRectangle(scene,0,1,1,0);
    this.initBuffers();
};

Cubo.prototype = Object.create(CGFobject.prototype);
Cubo.prototype.constructor=Cubo;

Cubo.prototype.initBuffers = function () {};

Cubo.prototype.updateTexCoords=function(length_S,length_T){};

Cubo.prototype.display = function ()
{
//lado baixo
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.ladobaixo.display();
    this.scene.popMatrix();

    //lado esquerdo
    this.scene.pushMatrix();
    this.scene.translate(0,0,1);
    this.ladoesquerdo.display();
    this.scene.popMatrix();

//lado direito
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0,1,0);
    this.scene.translate(-1,0,0);
    this.ladodireito.display();
    this.scene.popMatrix();

//lado tras
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2, 0,1,0);
    this.ladotras.display();
    this.scene.popMatrix();

//lado frente
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 0,1,0);
    this.scene.translate(-1,0,1);
    this.ladofrente.display();
    this.scene.popMatrix();

    //lado cima
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(0,-1,1);
    this.ladocima.display();
    this.scene.popMatrix();

};