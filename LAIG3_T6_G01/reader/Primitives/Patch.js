/**
 * Created by Joel Carneiro on 12/11/2016.
 */

function Patch(scene,order1,order2, partsU,partsV,controlpoints){

    CGFobject.call(this,scene);

    var knots1 = [];
    var knots2 = [];
    var controlvertexes = [];

    for(var i = 0; i < (order1+1)*2; ++i) {
        knots1.push(Math.round(i/((order1+1)*2), 0));// calcular array de pontos dependendo da order
    }
    for(var i = 0; i < (order2+1)*2; ++i) {
        knots2.push(Math.round(i/((order2+1)*2), 0));// calcular array de pontos dependendo da order
    }
    //divide os control points de acordo com as orders
    var vertex = 0;
    for(var i = 0; i < (order1+1); ++i) {
        var temp = [];
        for(var j = 0; j < (order2+1); ++j) {
            controlpoints[vertex].push(1);
            temp.push(controlpoints[vertex++]);
        }
        controlvertexes.push(temp);
    }

    var nurbsSurface = new CGFnurbsSurface(order1, order2, knots1, knots2, controlvertexes);
    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    };
    this.obj = new CGFnurbsObject(scene, getSurfacePoint, partsU, partsV );
    this.obj.initBuffers();
};

Patch.prototype = Object.create(CGFobject.prototype);
Patch.prototype.constructor = Patch;

Patch.prototype.display=function(){
        this.obj.display();
};

Patch.prototype.updateTexCoords = function(length_S, length_T) {};