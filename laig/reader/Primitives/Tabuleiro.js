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


    this.esquerdo = new Cubo(scene);
    this.direito = new Cubo(scene);
    this.frente = new Cubo(scene);
    this.tras = new Cubo(scene);
    this.baixo = new Cubo(scene);

    this.recEsq = new MyRectangle(scene,0,1,1,0);
    this.recDir = new MyRectangle(scene,0,1,1,0);

    this.appearance1 = new CGFappearance(this.scene);
    this.marmore = new CGFtexture(this.scene,"./texturas/marmore.png");

    this.appearance3 = new CGFappearance(this.scene);
    this.preto = new CGFtexture(this.scene,"./texturas/marmore_preto.png");

    this.agua = new CGFappearance(this.scene);
    this.agua.setAmbient(0.5,0.5,0.5,1);
    this.agua.setDiffuse(0.5,0.5,0.5,1);
    this.agua.setSpecular(0.5,0.5,0.5,1);
    this.agua.setShininess(8.8);
    this.agua.setEmission(0,0,0.0,1);
    this.agua.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.agua.loadTexture("./texturas/agua.png");




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
           var k = i+j*5;
            this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2, 1,0,0);
            this.scene.translate(12-8*i,-20+8*j,2);
            if(this.scene.escolhido == k){
                this.agua.apply();

            }

             else if((i+j)%2 == 0) {
                 this.appearance1.setTexture(this.marmore);
                 this.marmore.bind();
                   this.arrayTiles[i][j].display();
                 this.marmore.unbind();
            }else {

                 this.appearance3.setTexture(this.preto);
                 this.preto.bind();
                 this.arrayTiles[i][j].display();
                 this.preto.unbind();
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
    // this.ladosAppearance.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.scene.translate(-25,-20,3.1);
    this.scene.scale(5,40,1);
    this.recEsq.display();
    this.scene.popMatrix();

    // rec direito
    this.scene.pushMatrix();
    // this.ladosAppearance.apply();
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.scene.translate(20,-20,3.1);
    this.scene.scale(5,40,1);
    this.recDir.display();
    this.scene.popMatrix();


};