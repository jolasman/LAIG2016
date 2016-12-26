/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Chessboard(scene,du,dv,textureref,su,sv, c1,c2,cs)
{
    CGFobject.call(this,scene);
    this.scene = scene;
    this.du= du;
    this.dv= dv;
    this.textureref= textureref;
    this.su= su;
    this.sv= sv;

    //passar valores para o shader
    this.scene.customShader.setUniformsValues({cor1 :c1, cor2 :c2, cor3 :cs, dims: [du,dv], dimscs: [su,sv], texturaref: textureref});

    this.chess = new Plane(scene,1,1,90,90); // usar valores altos e multiplos de du e dv no valores de partsX e partsY do Plane, para melhor efeito no levantamento dos vertices
    this.initBuffers();
};

Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor=Chessboard;

Chessboard.prototype.initBuffers = function () {};

Chessboard.prototype.updateTexCoords=function(length_S,length_T){};

Chessboard.prototype.display = function ()
{
    //truque manhoso para o shader nao estourar
    this.scene.setActiveShader(this.scene.customShader);
    this.chess.display();
    this.scene.setActiveShader(this.scene.defaultShader);
};