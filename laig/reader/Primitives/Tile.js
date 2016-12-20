/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Tile(scene, tabuleiro)

{
    CGFobject.call(this,scene);

    this.tabuleiro = tabuleiro;
    this.peca = null;

    this.rec= new MyRectangle(scene,0,8,8,0);

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
       this.peca.display();
   }

    this.rec.display();
    this.scene.popMatrix();

};


Tile.prototype.setTilePeca=function(peca){
    this.peca = peca;
}
/**
 * Created by Joel Carneiro on 14/12/2016.
 */
