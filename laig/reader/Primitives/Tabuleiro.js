/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Tabuleiro(scene)

{
    CGFobject.call(this,scene);
    this.scene = scene;
    this.arrayTiles = [];

    // for(var i = 0; i <5; i++ ){
    //     this.arrayTiles.push([]);
    //     for(var j = 0; j <5; j++ ){
    //         this.arrayTiles[i].push( new Tile(this));
    //     }
    // }


    // this.dadoazul = new Peca(this,[0.0,0.2,1,1],[0.0,0.2,1,1],[0.0,0.2,1,1]);
    // this.dadored = new Peca(this,[0.1,0.2,0.0,1],[1,0.2,0.0,1],[1,0.2,0.0,1]);
    // this.dadoagreen = new Peca(this,[0.0,0.1,0.0,1],[0.0,1,0.0,1],[0.0,1,0.0,1]);


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

    for( var i= 0; i<5; i++){
        for(var j = 0; j<5; j++){
           var k = i+j*5;
            this.scene.pushMatrix();
            if(this.scene.escolhido == k){
                this.tabuleiroAppearance3.apply();
            }
            else if((i+j)%2 == 0) {
                   this.scene.materiais["poste"].apply();
            }else {
                this.scene.materiais["branco"].apply();
            }
            // this.scene.rotate(-Math.PI/2, 1,0,0);
            // this.scene.translate(12-8*i,-20+8*j,2);
            // this.scene.registerForPick(k, this.q1);
            // this.q1.display();
            // this.scene.popMatrix();
        }
    }



    // //lados
    //
    // //lado esquerdo
    // this.scene.pushMatrix();
    // this.ladosAppearance.apply();
    // this.scene.scale(40,3,5);
    // this.scene.translate(-0.5,0,4);
    // this.esquerdo.display();
    // this.scene.popMatrix();
    //
    // //lado esquerdo
    // this.scene.pushMatrix();
    // this.scene.scale(40,3,5);
    // this.scene.translate(-0.5,0,-5);
    // this.direito.display();
    // this.scene.popMatrix();
    //
    // //lado tras
    // this.scene.pushMatrix();
    // this.scene.scale(5,3,50);
    // this.scene.translate(-5,0,-0.5);
    // this.tras.display();
    // this.scene.popMatrix();
    //
    //
    // //lado frente
    // this.scene.pushMatrix();
    // this.scene.scale(5,3,50);
    // this.scene.translate(4,0,-0.5);
    // this.frente.display();
    // this.scene.popMatrix();
    //
    // //lado baixo
    // this.scene.pushMatrix();
    // this.scene.scale(40,3,40);
    // this.scene.translate(-0.5,-1,-0.5);
    // this.baixo.display();
    // this.scene.popMatrix();
    //
    // // recs
    //
    // //rec esquerdo
    // this.scene.pushMatrix();
    // this.ladosAppearance.apply();
    // this.scene.rotate(-Math.PI/2, 1,0,0);
    // this.scene.rotate(Math.PI/2, 0,0,1);
    // this.scene.translate(-25,-20,3.1);
    // this.scene.scale(5,40,1);
    // this.recEsq.display();
    // this.scene.popMatrix();
    //
    // // rec direito
    // this.scene.pushMatrix();
    // this.ladosAppearance.apply();
    // this.scene.rotate(-Math.PI/2, 1,0,0);
    // this.scene.rotate(Math.PI/2, 0,0,1);
    // this.scene.translate(20,-20,3.1);
    // this.scene.scale(5,40,1);
    // this.recEsq.display();
    // this.scene.popMatrix();


};