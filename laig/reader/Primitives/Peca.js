/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Peca(scene,ambient,difuse,specular)

{
    CGFobject.call(this,scene);
    this.scene = scene;
    this.ambiente = ambient;
    this.difuse = difuse;
    this.speculare = specular;

    this.ladobaixo1 = new MyRectangle(scene,0,1,1,0);
    this.ladoesquerdo1 = new MyRectangle(scene,0,1,1,0);
    this.ladodireito1 = new MyRectangle(scene,0,1,1,0);
    this.ladotras1 = new MyRectangle(scene,0,1,1,0);
    this.ladofrente1 = new MyRectangle(scene,0,1,1,0);
    this.ladocima1 = new MyRectangle(scene,0,1,1,0);

    this.numero1 = new CGFappearance(this.scene);
    this.numero1.setAmbient(this.ambiente[0],this.ambiente[1],this.ambiente[2],this.ambiente[3]);
    this.numero1.setDiffuse(this.difuse[0],this.difuse[1],this.difuse[2],this.difuse[3]);
    this.numero1.setSpecular(this.speculare[0],this.speculare[1],this.speculare[2],this.speculare[3]);
    this.numero1.setShininess(0.8);
    this.numero1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.numero1.loadTexture("./texturas/numero1.png");

    this.numero2 = new CGFappearance(this.scene);
    this.numero2.setAmbient(this.ambiente[0],this.ambiente[1],this.ambiente[2],this.ambiente[3]);
    this.numero2.setDiffuse(this.difuse[0],this.difuse[1],this.difuse[2],this.difuse[3]);
    this.numero2.setSpecular(this.speculare[0],this.speculare[1],this.speculare[2],this.speculare[3]);
    this.numero2.setShininess(0.8);
    this.numero2.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.numero2.loadTexture("./texturas/numero2.png");


    this.numero3 = new CGFappearance(this.scene);
    this.numero3.setAmbient(this.ambiente[0],this.ambiente[1],this.ambiente[2],this.ambiente[3]);
    this.numero3.setDiffuse(this.difuse[0],this.difuse[1],this.difuse[2],this.difuse[3]);
    this.numero3.setSpecular(this.speculare[0],this.speculare[1],this.speculare[2],this.speculare[3]);
    this.numero3.setShininess(0.8);
    this.numero3.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.numero3.loadTexture("./texturas/numero3.png");


    this.numero4 = new CGFappearance(this.scene);
    this.numero4.setAmbient(this.ambiente[0],this.ambiente[1],this.ambiente[2],this.ambiente[3]);
    this.numero4.setDiffuse(this.difuse[0],this.difuse[1],this.difuse[2],this.difuse[3]);
    this.numero4.setSpecular(this.speculare[0],this.speculare[1],this.speculare[2],this.speculare[3]);
    this.numero4.setShininess(0.8);
    this.numero4.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.numero4.loadTexture("./texturas/numero4.png");


    this.numero5 = new CGFappearance(this.scene);
    this.numero5.setAmbient(this.ambiente[0],this.ambiente[1],this.ambiente[2],this.ambiente[3]);
    this.numero5.setDiffuse(this.difuse[0],this.difuse[1],this.difuse[2],this.difuse[3]);
    this.numero5.setSpecular(this.speculare[0],this.speculare[1],this.speculare[2],this.speculare[3]);
    this.numero5.setShininess(0.8);
    this.numero5.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.numero5.loadTexture("./texturas/numero5.png");


    this.numero6 = new CGFappearance(this.scene);
    this.numero6.setAmbient(this.ambiente[0],this.ambiente[1],this.ambiente[2],this.ambiente[3]);
    this.numero6.setDiffuse(this.difuse[0],this.difuse[1],this.difuse[2],this.difuse[3]);
    this.numero6.setSpecular(this.speculare[0],this.speculare[1],this.speculare[2],this.speculare[3]);
    this.numero6.setShininess(0.8);
    this.numero6.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.numero6.loadTexture("./texturas/numero6.png");



    this.initBuffers();
};

Peca.prototype = Object.create(CGFobject.prototype);
Peca.prototype.constructor=Peca;

Peca.prototype.initBuffers = function () {};

Peca.prototype.updateTexCoords=function(length_S,length_T){};

Peca.prototype.display = function ()
{
//lado baixo
    this.scene.pushMatrix();
    this.numero6.apply();
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.ladobaixo1.display();
    this.scene.popMatrix();

    //lado esquerdo
    this.scene.pushMatrix();
    this.numero3.apply();
    this.scene.translate(0,0,1);
    this.ladoesquerdo1.display();
    this.scene.popMatrix();

//lado direito
    this.scene.pushMatrix();
    this.numero4.apply();
    this.scene.rotate(Math.PI, 0,1,0);
    this.scene.translate(-1,0,0);
    this.ladodireito1.display();
    this.scene.popMatrix();

//lado tras
    this.scene.pushMatrix();
    this.numero2.apply();
    this.scene.rotate(-Math.PI/2, 0,1,0);
    this.ladotras1.display();
    this.scene.popMatrix();

//lado frente
    this.scene.pushMatrix();
    this.numero5.apply();
    this.scene.rotate(Math.PI/2, 0,1,0);
    this.scene.translate(-1,0,1);
    this.ladofrente1.display();
    this.scene.popMatrix();

    //lado cima
    this.scene.pushMatrix();
    this.numero1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(0,-1,1);
    this.ladocima1.display();
    this.scene.popMatrix();

};