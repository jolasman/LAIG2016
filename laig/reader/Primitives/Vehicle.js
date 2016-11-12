/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Vehicle(scene)
{
    CGFobject.call(this,scene);
    this.scene = scene;

    var controlPoints1 = [
        [-1.5,-1.5,0],[-2,-2,2],[-2,2,2],
        [0,0,3],[3,-2,3],[0,2,3],
        [1.5,-1.5,0],[2,-2,2], [2,2,2]
    ];

    var controlPoints2 =[
        [-2.5,-2.5,1],[-3,-3,3],[-3,3,3],
        [1,1,4],[4,-1,4],[1,3,4],
        [2.5,-2.5,0],[3,-3,3],[3,3,3] ];

    this.vehicle = new Patch(scene,2,2,20,20,controlPoints1);
   // this.vehicle = new Patch(scene,2,2,7,9,controlPoints2);

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