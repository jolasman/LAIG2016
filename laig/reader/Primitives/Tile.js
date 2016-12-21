/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Tile(scene, tabuleiro)

{
    CGFobject.call(this,scene);

    this.tabuleiro = tabuleiro;
    this.peca = null;
    this.player = null;
    this.numero = null;
    this.rec= new MyRectangle(scene,0,8,8,0);

    this.marmoreappearance = new CGFappearance(this.scene);
    this.marmoreappearance.setAmbient(0.5,0.5,0.5,1);
    this.marmoreappearance.setDiffuse(0.5,0.5,0.5,1);
    this.marmoreappearance.setSpecular(0.5,0.5,0.5,1);
    this.marmoreappearance.setShininess(0.8);
    this.marmoreappearance.setEmission(0,0,0.0,1);
    this.marmoreappearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.marmoreappearance.loadTexture("./texturas/marmore.png");

    this.marmorepretoappearance = new CGFappearance(this.scene);
    this.marmorepretoappearance.setAmbient(0.5,0.5,0.5,1);
    this.marmorepretoappearance.setDiffuse(0.5,0.5,0.5,1);
    this.marmorepretoappearance.setSpecular(0.5,0.5,0.5,1);
    this.marmorepretoappearance.setShininess(0.8);
    this.marmorepretoappearance.setEmission(0,0,0.0,1);
    this.marmorepretoappearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.marmorepretoappearance.loadTexture("./texturas/marmore_preto.png");

    this.pecaappearance = new CGFappearance(this.scene);
    this.pecaappearance.setAmbient(0.9,0.5,0.0,1);
    this.pecaappearance.setDiffuse(0.6,0.4,0.0,1);
    this.pecaappearance.setSpecular(0.6,0.4,0.0,1);
    this.pecaappearance.setShininess(0.9);
    this.pecaappearance.setEmission(0,0,0.0,1);

    this.pecaappearance2 = new CGFappearance(this.scene);
    this.pecaappearance2.setAmbient(0.0,0.2,1,1);
    this.pecaappearance2.setDiffuse(0.0,0.2,0.6,1);
    this.pecaappearance2.setSpecular(0.0,0.2,0.6,1);
    this.pecaappearance2.setShininess(0.8);
    this.pecaappearance2.setEmission(0,0,0.0,1);

    this.selectappear = new CGFappearance(this.scene);
    this.selectappear.setAmbient(0.5,0.5,0.5,1);
    this.selectappear.setDiffuse(0.5,0.5,0.5,1);
    this.selectappear.setSpecular(0.5,0.5,0.5,1);
    this.selectappear.setShininess(8.8);
    this.selectappear.setEmission(0,0,0.0,1);
    this.selectappear.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.selectappear.loadTexture("./texturas/marmore_select.png");

    this.initBuffers();
}

Tile.prototype = Object.create(CGFobject.prototype);
Tile.prototype.constructor=Tile;

Tile.prototype.initBuffers = function () {};

Tile.prototype.updateTexCoords=function(length_S,length_T){};

Tile.prototype.display = function (cor,select)
{
    this.scene.pushMatrix();
   if(this.peca != null){
      if(this.player == 1) {
          this.scene.pushMatrix();
          if(this.numero == 1){
               this.scene.rotate(Math.PI*2, 0,1,0);
              this.scene.rotate(Math.PI/2, 1,0,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(0.35, 0, -1.3);
          }
          else if(this.numero == 2){
              this.scene.rotate(Math.PI/2, 0,1,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(-1, 0.3, 0.35);
          }
          else if(this.numero == 3){
              this.scene.scale(5, 5, 5);
              this.scene.translate(0.35, 0.3, 0);
          }
          else if(this.numero == 4){
              this.scene.rotate(Math.PI, 0,1,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(-1.35, 0.3, -1);
          }
          else if(this.numero == 5){
              this.scene.rotate(-Math.PI/2, 0,1,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(0, 0.35, -1.3);
          }
          else if(this.numero == 6){
              this.scene.rotate(Math.PI/2, 0,0,1);
              this.scene.rotate(-Math.PI/2, 1,0,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(0.35, -1, -1.3);
          }

          this.pecaappearance.apply();
          this.peca.display();
          this.scene.popMatrix();
      }else{
          this.scene.pushMatrix();
          if(this.numero == 1){
              this.scene.rotate(Math.PI*2, 0,1,0);
              this.scene.rotate(Math.PI/2, 1,0,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(0.35, 0, -1.3);
          }
          else if(this.numero == 2){
              this.scene.rotate(Math.PI/2, 0,1,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(-1, 0.3, 0.35);
          }
          else if(this.numero == 3){
              this.scene.scale(5, 5, 5);
              this.scene.translate(0.35, 0.3, 0);
          }
          else if(this.numero == 4){
              this.scene.rotate(Math.PI, 0,1,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(-1.35, 0.3, -1);
          }
          else if(this.numero == 5){
              this.scene.rotate(-Math.PI/2, 0,1,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(0, 0.35, -1.3);
          }
          else if(this.numero == 6){
              this.scene.rotate(Math.PI/2, 0,0,1);
              this.scene.rotate(-Math.PI/2, 1,0,0);
              this.scene.scale(5, 5, 5);
              this.scene.translate(0.35, -1, -1.3);
          }

          this.pecaappearance2.apply();
          this.peca.display();
          this.scene.popMatrix();
      }
   }
    if(select) {
        this.selectappear.apply();
        this.rec.display();
        this.scene.popMatrix();
    }

   else if(cor) {
       this.marmoreappearance.apply();
       this.rec.display();
       this.scene.popMatrix();
   } else {
       this.marmorepretoappearance.apply();
       this.rec.display();
       this.scene.popMatrix();
   }
};




Tile.prototype.setTilePeca=function(peca, player, numero){
    this.peca = peca;
    this.player = player;
    this.numero = numero;
};
/**
 * Created by Joel Carneiro on 14/12/2016.
 */
