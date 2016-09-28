
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);  
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
	
	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseGlobalsExample(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample= function(rootElement) {


            /*************** scene  ******************/
	var cena =  rootElement.getElementsByTagName('scene');
	if (cena == null) {
		return "scene element is missing.";
	}

	if (cena.length != 1) {
		return "either zero or more than one 'scene' element found.";
	}

	var scene = cena[0];
    this.root = this.reader.getString(scene,"root", true);
    this.axis_length = this.reader.getFloat(scene,"axis_length", true);


            /**************** views ******************/

	var vistas =  rootElement.getElementsByTagName('views');
	if (vistas == null) {
		return "views element is missing.";
	}

	if (vistas.length != 1) {
		return "either zero or more than one 'views' element found.";
	}

	// various examples of different types of access
	var views = vistas[0];
	this.default = this.reader.getString(views,"default", true);

            /*********** perspectives   **********/

	var perspectives = views.getElementsByTagName('perspective');

    if (perspectives == null) {
		return "perspectives element is missing.";
	}

	if (perspectives.length != 1) {
		return "either zero or more than one 'perspectives' element found.";
	}

    var perspectivas = perspectives[0];

	this.id = this.reader.getString(perspectivas, "id",true);
	this.near = this.reader.getFloat(perspectivas, "near",true);
	this.far = this.reader.getFloat(perspectivas, "far",true);
	this.angle = this.reader.getFloat(perspectivas, "angle",true);

            /************** from   *******************/

     var froms = perspectivas.getElementsByTagName('from');


     if (froms == null) {
    		return "perspectives element is missing.";
    	}

    	if (froms.length != 1) {
    		return "either zero or more than one 'perspectives' element found.";
    	}
     var froms2 = froms[0];

	this.xfrom = this.reader.getFloat(froms2, "x",true);
	this.yfrom = this.reader.getFloat(froms2, "y",true);
	this.zfrom = this.reader.getFloat(froms2, "z",true);

        /************** to   *******************/

    var tos = perspectivas.getElementsByTagName('to');


     if (tos == null) {
    		return "perspectives element is missing.";
    	}

    	if (tos.length != 1) {
    		return "either zero or more than one 'perspectives' element found.";
    	}
     var tos2 = tos[0];

	this.xto = this.reader.getFloat(tos2, "x",true);
	this.yto = this.reader.getFloat(tos2, "y",true);
	this.zto = this.reader.getFloat(tos2, "z",true);

/***********************  ilumination    **************************/


    var iluminacao =  rootElement.getElementsByTagName('illumination');
	if (iluminacao == null) {
		return "illumination' element is missing.";
	}

	if (iluminacao.length != 1) {
		return "either zero or more than one 'illumination' element found.";
	}

	// various examples of different types of access
	var illumination2 = iluminacao[0];

    this.doublesided = this.reader.getBoolean(illumination2,"doublesided", true);
    this.local = this.reader.getBoolean(illumination2,"local", true);

    /*********************** ambient  ***********************/

    var ambiente =  illumination2.getElementsByTagName('ambient');
    if (ambiente == null) {
    		return "ambient' element is missing.";
    	}

    	if (ambiente.length != 1) {
    		return "either zero or more than one 'ambient' element found.";
    	}

       var ambiente2 = ambiente[0];

       this.ramb = this.reader.getFloat(ambiente2, "r", true);
       this.gamb = this.reader.getFloat(ambiente2, "g", true);
       this.bamb = this.reader.getFloat(ambiente2, "b", true);
       this.aamb = this.reader.getFloat(ambiente2, "a", true);


    /*********************** background  ***********************/

    var fundo =  illumination2.getElementsByTagName('background');
    if (fundo == null) {
    		return "background' element is missing.";
    	}

    	if (fundo.length != 1) {
    		return "either zero or more than one 'background' element found.";
    	}

       var fundo2 = fundo[0];

       this.rback = this.reader.getFloat(fundo2, "r", true);
       this.gback = this.reader.getFloat(fundo2, "g", true);
       this.bback = this.reader.getFloat(fundo2, "b", true);
       this.aback = this.reader.getFloat(fundo2, "a", true);


    /************* lights **********************************/

    var luz =  rootElement.getElementsByTagName('lights');
    	if (luz == null) {
    		return "lights' element is missing.";
    	}

    	if (luz.length != 1) {
    		return "either zero or more than one 'lights' element found.";
    	}

    	// various examples of different types of access
    	var luzes = luz[0];

            /****** omni **************/

       var omnis = luzes.getElementsByTagName('omni');
       if (omnis == null) {
           		return "omni' element is missing.";
           	}

     	if (omnis.length != 1) {
           		return "either zero or more than one 'omni' element found.";
           	}

        var omnis2 = omnis[0];

        this.idomni = this.reader.getString(omnis2,"id",true);
        this.enabledomni = this.reader.getBoolean(omnis2,"enabled",true);
















	/*this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);// le os atributos (drawmode,cullface...) e dentro dos parentesis diz o que se pode ler. caso algum falhe deve retornar erro
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

	var tempList=rootElement.getElementsByTagName('list'); //se houver algum elemento chamado list

	if (tempList == null  || tempList.length==0) {
		return "list element is missing.";
	}
	
	this.list=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	};
	*/

};
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


