/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Vehicle(scene)
{
    CGFobject.call(this,scene);
    this.scene = scene;

    var controlPoints1 = [
        [-1.5,-1.5,0],[-2,-2,2],[-2,2,2],[-1.5,1.5,0],

        [0,0,3],[0,-2,3],[0,2,3],[0,0,3],

        [1.5,-1.5,0],[2,-2,2], [2,2,2],[1.5,1.5,0]


    ];

    var controlPoints2 =[
        [-2,-2,1],[-2,-1,-2],[-2,1,5],[-2,2,1],
        [0,-2, 0],[0,-1,-1],[0,1,1.5],[0,2,0],
        [2,-2,-1],[2,-1,2],[2,1,-5],[2,2,1] ];

    this.vehicle = new Patch(scene,2,3,20,20,controlPoints1);
    // this.vehicle = new Patch(scene,2,3,20,20,controlPoints2);

    this.initBuffers();
};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor=Vehicle;

Vehicle.prototype.initBuffers = function () {



};

Vehicle.prototype.updateTexCoords=function(length_,length_T){};

Vehicle.prototype.display = function ()
{
    this.vehicle.display();
};