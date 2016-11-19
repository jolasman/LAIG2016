/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Plane(scene, dimX, dimY, partsX, partsY)
{
    CGFobject.call(this,scene);
    this.scene = scene;
    this.dimX = dimX;
    this.dimY = dimY;
    this.partsX = partsX;
    this.partsY = partsY;
    this.initBuffers();
};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor=Plane;

Plane.prototype.initBuffers = function () {

    var controlPoints = [];

    var DimX = this.dimX;
    var DimY = this.dimY;

    //segundo os exemplos dos professores quando U = 0 os vetices sao calculados
    // [negativo, negativo, 0, 1],[negativo, positivo, 0, 1] e U = 1 os vertices sao calculados[positivo, negativo, 0 , 1] , [positivo, positivo, 0, 1]
    // em que os valores positivos e negativos sao as dimensoes x e y
    //para U = 0
    var ucalc = [[-this.dimX, -this.dimY, 0, 1], [-this.dimX, this.dimY, 0, 1]];
    controlPoints.push(ucalc);
    //para U = 1
    ucalc = [[this.dimX, -this.dimY, 0, 1], [this.dimX, this.dimY, 0, 1]];
    controlPoints.push(ucalc);
    this.plane = this.makeSurface(1,1, controlPoints);// os 1,1 são os graus em U e V
};

Plane.prototype.getKnotsVector = function(graus) { // funcao exemplo dos profs

    var vertice = [];
    for (var i=0; i<=graus; i++) {
        vertice.push(0);
    }
    for (var j=0; j<=graus; j++) {
        vertice.push(1);
    }
    return vertice;
};

Plane.prototype.makeSurface = function (grau1, grau2, controlvertexes) {//funcao exemplo dos profs

    var knots1 = this.getKnotsVector(grau1);
    var knots2 = this.getKnotsVector(grau2);

    var nurbsSurface = new CGFnurbsSurface(grau1, grau2, knots1, knots2, controlvertexes);
    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    };

    return new CGFnurbsObject(this.scene, getSurfacePoint, this.partsX, this.partsY);
};

Plane.prototype.updateTexCoords=function(length_,length_T){};

Plane.prototype.display = function ()
{
    this.plane.display();
};