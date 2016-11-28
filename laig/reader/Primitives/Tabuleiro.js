/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Tabuleiro(scene)

{
    CGFobject.call(this,scene);
    this.scene = scene;
    this.du= 10.0;
    this.dv= 10.0;
    this.su= 2.0;
    this.sv= 2.0;

    var c1 = [0.0,0.0,0.0,1.0];
    var c2 = [1.0,1.0,1.0,1.0];
    var cs = [0.9,0.0,0.0,1.0];

    this.tabuleiroAppearance1 = new CGFappearance(this.scene);
    this.tabuleiroAppearance1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.tabuleiroAppearance1.loadTexture("./texturas/marmore.png");
    this.textureref = this.tabuleiroAppearance1;

    //passar valores para o shader
    this.scene.customShader.setUniformsValues({cor1 :c1, cor2 :c2, cor3 :cs, dims: [this.du,this.dv], dimscs: [this.su,this.sv], texturaref: this.textureref});


    this.esquerdo = new Cubo(scene);
    this.direito = new Cubo(scene);
    this.frente = new Cubo(scene);
    this.tras = new Cubo(scene);
    this.baixo = new Cubo(scene);

    this.chess = new Plane(scene,20,20,90,90); // usar valores altos e multiplos de du e dv no valores de partsX e partsY do Plane, para melhor efeito no levantamento dos vertices
    this.initBuffers();
};

Tabuleiro.prototype = Object.create(CGFobject.prototype);
Tabuleiro.prototype.constructor=Tabuleiro;

Tabuleiro.prototype.initBuffers = function () {};

Tabuleiro.prototype.updateTexCoords=function(length_S,length_T){};

Tabuleiro.prototype.display = function ()
{
    //truque manhoso para o shader nao estourar
    this.scene.setActiveShader(this.scene.customShader);
    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(0,0,2);
    this.chess.display();
    this.scene.popMatrix();
    this.scene.setActiveShader(this.scene.defaultShader);

    //lados

    //lado esquerdo
    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.scale(40,3,5);
    this.scene.translate(-0.5,0,4);
    this.esquerdo.display();
    this.scene.popMatrix();

    //lado esquerdo
    this.scene.pushMatrix();
    this.scene.scale(40,3,5);
    this.scene.translate(-0.5,0,-5);
    this.direito.display();
    this.scene.popMatrix();

    //lado tras
    this.scene.pushMatrix();
    this.scene.scale(5,3,50);
    this.scene.translate(-5,0,-0.5);
    this.tras.display();
    this.scene.popMatrix();


    //lado frente
    this.scene.pushMatrix();
    this.scene.scale(5,3,50);
    this.scene.translate(4,0,-0.5);
    this.frente.display();
    this.scene.popMatrix();

    //lado baixo
    this.scene.pushMatrix();
    this.scene.scale(40,3,40);
    this.scene.translate(-0.5,-1,-0.5);
    this.baixo.display();
    this.scene.popMatrix();

};