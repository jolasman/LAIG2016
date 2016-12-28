//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 

serialInclude(['../lib/CGF.js', 'XMLscene.js', 'MySceneGraph.js', 'Node.js',
    'Primitives/MyRectangle.js','Primitives/MySphere.js','Primitives/MyTriangle.js','Primitives/MyCylinder.js', 'Primitives/MyTorus.js',
    'Primitives/Patch.js','Primitives/Plane.js','Primitives/Vehicle.js','Primitives/Chessboard.js','Primitives/Tabuleiro.js','Primitives/Cubo.js',
    'Primitives/Peca.js','Primitives/Dado.js','Primitives/Tile.js',
    'MyInterface.js',
    'Animations/Animation.js','Animations/LinearAnimation.js', 'Animations/CircularAnimation.js', 'Animations/DadosAnimation.js',

main=function()
{
	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myScene = new XMLscene();
    var myInterface = new MyInterface(); //usado o construtor do MyInterface.js

    myScene.setMyInterface(myInterface);
    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 


    //
	// // create and load graph, and associate it to scene.
	// // Check console for loading errors
	// var myGraph = new MySceneGraph("cena.dsx", myScene);


	
	// start
    app.run();
}

]);