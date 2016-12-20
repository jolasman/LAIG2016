/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Tile(scene, tabuleiro)

{
    CGFobject.call(this,scene);

    this.tabuleiro = tabuleiro;
    this.peca = null;

    this.rec= new MyRectangle(scene,0,8,8,0);

    this.marmoreappearance = new CGFappearance(this.scene);
    this.marmoreappearance.setAmbient(0.5,0.5,0.5,1);
    this.marmoreappearance.setDiffuse(0.5,0.5,0.5,1);
    this.marmoreappearance.setSpecular(0.5,0.5,0.5,1);
    this.marmoreappearance.setShininess(0.8);
    this.marmoreappearance.setEmission(0,0,0.0,1);
    this.marmoreappearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.marmoreappearance.loadTexture("./texturas/marmore_preto.png");


    this.pecaappearance = new CGFappearance(this.scene);
    this.pecaappearance.setAmbient(0.9,0.1,0.5,1);
    this.pecaappearance.setDiffuse(0.9,0.1,0.5,1);
    this.pecaappearance.setSpecular(0.9,0.1,0.5,1);
    this.pecaappearance.setShininess(0.8);
    this.pecaappearance.setEmission(0,0,0.0,1);


    this.initBuffers();
}

Tile.prototype = Object.create(CGFobject.prototype);
Tile.prototype.constructor=Tile;

Tile.prototype.initBuffers = function () {};

Tile.prototype.updateTexCoords=function(length_S,length_T){};

Tile.prototype.display = function ()
{
    this.scene.pushMatrix();
   if(this.peca != null){
       this.scene.pushMatrix();
       this.scene.scale(5,5,5);
       this.scene.translate(0.5,0.5,0.5);
       this.pecaappearance.apply();
       this.peca.display();
       this.scene.popMatrix();
   }
    this.marmoreappearance.apply();
    this.rec.display();
    this.scene.popMatrix();

};


Tile.prototype.setTilePeca=function(peca){
    this.peca = peca;
}
/**
 * Created by Joel Carneiro on 14/12/2016.
 */
