/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Dado(scene,ambient,difuse,specular)

{
    CGFobject.call(this,scene);
    this.scene = scene;
    this.ambiente = ambient;
    this.difuse = difuse;
    this.speculare = specular;

    this.dado = new Peca(scene,this.ambiente,this.difuse,this.speculare);

    this.initBuffers();
};

Dado.prototype = Object.create(CGFobject.prototype);
Dado.prototype.constructor=Dado;

Dado.prototype.initBuffers = function () {};

Dado.prototype.updateTexCoords=function(length_S,length_T){};

Dado.prototype.display = function ()
{
    this.scene.pushMatrix();
    this.scene.scale(5,5,5);
    this.scene.translate(-0.5,0.45,-0.5);
    this.dado.display();
    this.scene.popMatrix();

};