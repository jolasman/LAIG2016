/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Tabuleiro(scene)

{
    CGFobject.call(this,scene);
    this.scene = scene;

    this.tabuleiroAppearance1 = new CGFappearance(this.scene);
    this.tabuleiroAppearance1.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.tabuleiroAppearance1.loadTexture("./texturas/marmore.png");
    this.tabuleiroAppearance2 = new CGFappearance(this.scene);
    this.tabuleiroAppearance2.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.tabuleiroAppearance2.loadTexture("./texturas/marmore_preto.png");

    this.ladosAppearance = new CGFappearance(this.scene);
    this.ladosAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.ladosAppearance.loadTexture("./texturas/tecto.png");

    this.q1= new MyRectangle(scene,0,8,8,0);
    this.q2= new MyRectangle(scene,0,8,8,0);
    this.q3= new MyRectangle(scene,0,8,8,0);
    this.qq4= new MyRectangle(scene,0,8,8,0);
    this.q5= new MyRectangle(scene,0,8,8,0);
    this.q6= new MyRectangle(scene,0,8,8,0);
    this.q7= new MyRectangle(scene,0,8,8,0);
    this.q8= new MyRectangle(scene,0,8,8,0);
    this.q9= new MyRectangle(scene,0,8,8,0);
    this.q10= new MyRectangle(scene,0,8,8,0);
    this.q11= new MyRectangle(scene,0,8,8,0);
    this.q12= new MyRectangle(scene,0,8,8,0);
    this.q13= new MyRectangle(scene,0,8,8,0);
    this.q14= new MyRectangle(scene,0,8,8,0);
    this.q15= new MyRectangle(scene,0,8,8,0);
    this.q16= new MyRectangle(scene,0,8,8,0);
    this.q17= new MyRectangle(scene,0,8,8,0);
    this.q18= new MyRectangle(scene,0,8,8,0);
    this.q19= new MyRectangle(scene,0,8,8,0);
    this.q20= new MyRectangle(scene,0,8,8,0);
    this.q21= new MyRectangle(scene,0,8,8,0);
    this.q22= new MyRectangle(scene,0,8,8,0);
    this.q23= new MyRectangle(scene,0,8,8,0);
    this.q24= new MyRectangle(scene,0,8,8,0);
    this.q25= new MyRectangle(scene,0,8,8,0);

    this.esquerdo = new Cubo(scene);
    this.direito = new Cubo(scene);
    this.frente = new Cubo(scene);
    this.tras = new Cubo(scene);
    this.baixo = new Cubo(scene);

    this.recEsq = new MyRectangle(scene,0,1,1,0);
    this.recDir = new MyRectangle(scene,0,1,1,0);

    this.initBuffers();
};

Tabuleiro.prototype = Object.create(CGFobject.prototype);
Tabuleiro.prototype.constructor=Tabuleiro;

Tabuleiro.prototype.initBuffers = function () {};

Tabuleiro.prototype.updateTexCoords=function(length_S,length_T){};

Tabuleiro.prototype.display = function ()
{

//mil rectangulos para tabuleiro
//    canto inferior esquerdo
    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(12,-20,2);
    this.q1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(12,-12,2);
    this.q2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(12,-4,2);
    this.q3.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(12,4,2);
    this.qq4.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(12,12,2);
    this.q5.display();
    this.scene.popMatrix();

    // segunda linha
    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(4,-20,2);
    this.q6.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(4,-12,2);
    this.q7.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(4,-4,2);
    this.q8.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(4,4,2);
    this.q9.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(4,12,2);
    this.q10.display();
    this.scene.popMatrix();

    // terceira linha
    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-4,-20,2);
    this.q11.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-4,-12,2);
    this.q12.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-4,-4,2);
    this.q13.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-4,4,2);
    this.q14.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-4,12,2);
    this.q15.display();
    this.scene.popMatrix();

    // quarta linha

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-12,-20,2);
    this.q16.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-12,-12,2);
    this.q17.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-12,-4,2);
    this.q18.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-12,4,2);
    this.q19.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-12,12,2);
    this.q20.display();
    this.scene.popMatrix();

    // ultima linha

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-20,-20,2);
    this.q21.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-20,-12,2);
    this.q22.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-20,-4,2);
    this.q23.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance2.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-20,4,2);
    this.q24.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tabuleiroAppearance1.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.translate(-20,12,2);
    this.q25.display();
    this.scene.popMatrix();

    //lados

    //lado esquerdo
    this.scene.pushMatrix();
    this.ladosAppearance.apply();
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

    // recs

    //rec esquerdo
    this.scene.pushMatrix();
    this.ladosAppearance.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.scene.translate(-25,-20,3.1);
    this.scene.scale(5,40,1);
    this.recEsq.display();
    this.scene.popMatrix();

    // rec direito
    this.scene.pushMatrix();
    this.ladosAppearance.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.scene.translate(20,-20,3.1);
    this.scene.scale(5,40,1);
    this.recEsq.display();
    this.scene.popMatrix();


};