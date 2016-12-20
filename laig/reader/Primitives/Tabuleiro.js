/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Tabuleiro(scene)

{
    CGFobject.call(this,scene);
    this.scene = scene;
    this.arrayTiles = [];

    for(var i = 0; i <5; i++ ){
        this.arrayTiles.push([]);
        for(var j = 0; j <5; j++ ){
            this.arrayTiles[i].push( new Tile(this.scene,this.tabuleiro));
        }
    }
    this.arrayTiles[0][0].setTilePeca(new Peca(this.scene));
    this.arrayTiles[0][1].setTilePeca(new Peca(this.scene));
    this.arrayTiles[0][2].setTilePeca(new Peca(this.scene));
    this.arrayTiles[4][0].setTilePeca(new Peca(this.scene));


    this.esquerdo = new Cubo(scene);
    this.direito = new Cubo(scene);
    this.frente = new Cubo(scene);
    this.tras = new Cubo(scene);
    this.baixo = new Cubo(scene);

    this.recEsq = new MyRectangle(scene,0,1,1,0);
    this.recDir = new MyRectangle(scene,0,1,1,0);



    this.selectappear = new CGFappearance(this.scene);
    this.selectappear.setAmbient(0.5,0.5,0.5,1);
    this.selectappear.setDiffuse(0.5,0.5,0.5,1);
    this.selectappear.setSpecular(0.5,0.5,0.5,1);
    this.selectappear.setShininess(8.8);
    this.selectappear.setEmission(0,0,0.0,1);
    this.selectappear.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.selectappear.loadTexture("./texturas/agua.png");



    this.ladosAppearance = new CGFappearance(this.scene);
    this.ladosAppearance.setAmbient(0.5,0.5,0.5,1);
    this.ladosAppearance.setDiffuse(0.5,0.5,0.5,1);
    this.ladosAppearance.setSpecular(0.5,0.5,0.5,1);
    this.ladosAppearance.setShininess(8.8);
    this.ladosAppearance.setEmission(0,0,0.0,1);
    this.ladosAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.ladosAppearance.loadTexture("./texturas/madeiracena.png");



    this.initBuffers();
}

Tabuleiro.prototype = Object.create(CGFobject.prototype);
Tabuleiro.prototype.constructor=Tabuleiro;

Tabuleiro.prototype.initBuffers = function () {};

Tabuleiro.prototype.updateTexCoords=function(length_S,length_T){};

Tabuleiro.prototype.display = function ()
{

    for( var i= 0; i<5; i++){
        for(var j = 0; j<5; j++){
            var k = i*5+j;
            this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2, 1,0,0);
            this.scene.translate(12-8*i,-20+8*j,2);
            if(this.scene.escolhido == k){



            }

            else if((i+j)%2 == 0) {

                this.arrayTiles[i][j].display();

            }else {


                this.arrayTiles[i][j].display();

            }

            this.scene.registerForPick(k, this.arrayTiles[i][j]);

            this.scene.popMatrix();
        }


    }



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
    this.recDir.display();
    this.scene.popMatrix();


};