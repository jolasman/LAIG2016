/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Peca(scene)

{
    CGFobject.call(this,scene);
    this.scene = scene;


    this.ladobaixo1 = new MyRectangle(scene,0,1,1,0);
    this.ladoesquerdo1 = new MyRectangle(scene,0,1,1,0);
    this.ladodireito1 = new MyRectangle(scene,0,1,1,0);
    this.ladotras1 = new MyRectangle(scene,0,1,1,0);
    this.ladofrente1 = new MyRectangle(scene,0,1,1,0);
    this.ladocima1 = new MyRectangle(scene,0,1,1,0);

    this.appearance1 = new CGFappearance(this.scene);
    this.numero1 = new CGFtexture(this.scene,"./texturas/numero1.png");
    this.numero2 = new CGFtexture(this.scene,"./texturas/numero2.png");
    this.numero3 = new CGFtexture(this.scene,"./texturas/numero3.png");
    this.numero4 = new CGFtexture(this.scene,"./texturas/numero4.png");
    this.numero5 = new CGFtexture(this.scene,"./texturas/numero5.png");
    this.numero6 = new CGFtexture(this.scene,"./texturas/numero6.png");





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
    this.appearance1.setTexture(this.numero6);
    this.numero6.bind();

    this.scene.rotate(Math.PI/2, 1,0,0);
    this.ladobaixo1.display();
    this.numero6.unbind();

    this.scene.popMatrix();

    //lado esquerdo
    this.scene.pushMatrix();
    this.appearance1.setTexture(this.numero3);
    this.numero3.bind();

    this.scene.translate(0,0,1);
    this.ladoesquerdo1.display();
    this.numero3.unbind();

    this.scene.popMatrix();

//lado direito
    this.scene.pushMatrix();
    this.appearance1.setTexture(this.numero4);
    this.numero4.bind();

    this.scene.rotate(Math.PI, 0,1,0);
    this.scene.translate(-1,0,0);
    this.ladodireito1.display();
    this.numero4.unbind();

    this.scene.popMatrix();

//lado tras
    this.scene.pushMatrix();
    this.appearance1.setTexture(this.numero2);
    this.numero2.bind();

    this.scene.rotate(-Math.PI/2, 0,1,0);
    this.ladotras1.display();
    this.numero2.unbind();

    this.scene.popMatrix();

//lado frente
    this.scene.pushMatrix();
    this.appearance1.setTexture(this.numero5);
    this.numero5.bind();

    this.scene.rotate(Math.PI/2, 0,1,0);
    this.scene.translate(-1,0,1);
    this.ladofrente1.display();
    this.numero5.unbind();

    this.scene.popMatrix();

    //lado cima
    this.scene.pushMatrix();
    this.appearance1.setTexture(this.numero1);

    this.numero1.bind();

    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(0,-1,1);
    this.ladocima1.display();
    this.numero1.unbind();

    this.scene.popMatrix();






};