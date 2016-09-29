
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



            /**************************************** scene  *************************************************/


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



            /**************************************** views *************************************/



	var vistas =  rootElement.getElementsByTagName('views');
	if (vistas == null) {
		return "views element is missing.";
	}

/*
	if (vistas.length != 1) {
		return "either zero or more than one 'views' element found.";
	}


	*************** podem ser mais  que apenas uma vista

	*/

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



/***************************************  ilumination    ****************************************/



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




    /************************************** lights *******************************************/



    var luz =  rootElement.getElementsByTagName('lights');
    	if (luz == null) {
    		return "lights' element is missing.";
    	}

    	if (luz.length != 1) {
    		return "either zero or more than one 'lights' element found.";
    	}

    	// various examples of different types of access
    	var luzes = luz[0];


            /************** omni **************/


       var omnis = luzes.getElementsByTagName('omni');
       if (omnis == null) {
           		return "omni' element is missing.";
           	}
/*
     	if (omnis.length != 1) {
           		return "either zero or more than one 'omni' element found.";
          	}


          	****************** podem existir mais do que um omni ou spot


*/
        var omnis2 = omnis[0];

        this.idomni = this.reader.getString(omnis2,"id",true);
        this.enabledomni = this.reader.getBoolean(omnis2,"enabled",true);


    /********************* location in omni   *******************/


        var locations = omnis2.getElementsByTagName('location');
        if (locations == null) {
         	return "location' element in omni is missing.";
           	}
        if (locations.length != 1) {
            return "either zero or more than one 'location' element found in omni declaration.";
           	}

         var location2 = locations[0];

         this.xloc = this.reader.getFloat(location2, "x", true);
         this.yloc = this.reader.getFloat(location2, "y", true);
         this.zloc = this.reader.getFloat(location2, "z", true);
         this.wloc = this.reader.getFloat(location2, "w", true);



    /********************* ambient in omni   *******************/


        var ambomni = omnis2.getElementsByTagName('ambient');
        if (ambomni == null) {
       	return "ambient' element in omni is missing.";
          	}
        if (ambomni.length != 1) {
            return "either zero or more than one 'ambient' element found in omni declaration.";
           	}
        var ambomni2 = ambomni[0];

        this.rao = this.reader.getFloat(ambomni2, "r", true);
        this.gao = this.reader.getFloat(ambomni2, "g", true);
        this.bao = this.reader.getFloat(ambomni2, "b", true);
        this.aao = this.reader.getFloat(ambomni2, "a", true);


    /********************* diffuse in omni   *******************/


         var difomni = omnis2.getElementsByTagName('diffuse');
         if (difomni == null) {
         return "diffuse' element in omni is missing.";
           	}
        if (difomni.length != 1) {
            return "either zero or more than one 'diffuse' element found in omni declaration.";
           	}

         var difomni2 = difomni[0];

         this.rdo = this.reader.getFloat(difomni2, "r", true);
         this.gdo = this.reader.getFloat(difomni2, "g", true);
         this.bdo = this.reader.getFloat(difomni2, "b", true);
         this.ado = this.reader.getFloat(difomni2, "a", true);


    /********************* specular in omni   *******************/


         var specomni = omnis2.getElementsByTagName('specular');
         if (specomni == null) {
         return "specular' element in omni is missing.";
           	}
        if (specomni.length != 1) {
                return "either zero or more than one 'specular' element found in omni declaration.";
               	}

         var specomni2 = specomni[0];

         this.rso = this.reader.getFloat(specomni2, "r", true);
         this.gso = this.reader.getFloat(specomni2, "g", true);
         this.bso = this.reader.getFloat(specomni2, "b", true);
         this.aso = this.reader.getFloat(specomni2, "a", true);


      /******************************************* spot *************************************************/


       var spots = luzes.getElementsByTagName('spot');
       if (spots == null) {
           		return "spot' element is missing.";
           	}
/*
     	if (omnis.length != 1) {
           		return "either zero or more than one 'omni' element found.";
          	}


          	****************** podem existir mais do que um omni ou spot


*/
        var spots2 = spots[0];

        this.idspot = this.reader.getString(spots2,"id",true);
        this.enabledspot = this.reader.getBoolean(spots2,"enabled",true);
        this.anglespot = this.reader.getFloat(spots2,"angle",true);
        this.exponentspot = this.reader.getFloat(spots2,"exponent",true);



    /********************* target in spot  *******************/


        var targets = spots2.getElementsByTagName('target');
        if (targets == null) {
         	return "target' element in spot is missing.";
           	}
        if (targets.length != 1) {
            return "either zero or more than one 'target' element found in spot declaration.";
           	}

         var targets2 = targets[0];

         this.xtarspot = this.reader.getFloat(targets2, "x", true);
         this.ytarspot = this.reader.getFloat(targets2, "y", true);
         this.ztarspot = this.reader.getFloat(targets2, "z", true);


    /********************* location in spot   *******************/


        var locationspot = spots2.getElementsByTagName('location');
        if (locationspot == null) {
         	return "location' element in spot is missing.";
           	}
        if (locationspot.length != 1) {
            return "either zero or more than one 'location' element found in spot declaration.";
           	}

         var locationspot2 = locationspot[0];

         this.xlocspot = this.reader.getFloat(locationspot2, "x", true);
         this.ylocspot = this.reader.getFloat(locationspot2, "y", true);
         this.zlocspot = this.reader.getFloat(locationspot2, "z", true);


    /********************* ambient in spot   *******************/


        var ambspot = spots2.getElementsByTagName('ambient');
        if (ambspot == null) {
       	return "ambient' element in spot is missing.";
          	}
        if (ambspot.length != 1) {
            return "either zero or more than one 'ambient' element found in spot declaration.";
           	}
        var ambspot2 = ambspot[0];

        this.ral = this.reader.getFloat(ambspot2, "r", true);
        this.gal = this.reader.getFloat(ambspot2, "g", true);
        this.bal = this.reader.getFloat(ambspot2, "b", true);
        this.aal = this.reader.getFloat(ambspot2, "a", true);


    /********************* diffuse in spot   *******************/


         var diffspot = spots2.getElementsByTagName('diffuse');
         if (diffspot == null) {
         return "diffuse' element in spot is missing.";
           	}
        if (diffspot.length != 1) {
            return "either zero or more than one 'diffuse' element found in spot declaration.";
           	}

         var diffspot2 = diffspot[0];

         this.rds = this.reader.getFloat(diffspot2, "r", true);
         this.gds = this.reader.getFloat(diffspot2, "g", true);
         this.bds = this.reader.getFloat(diffspot2, "b", true);
         this.ads = this.reader.getFloat(diffspot2, "a", true);


    /********************* specular in spot   *******************/


         var specspot = spots2.getElementsByTagName('specular');
         if (specspot == null) {
         return "specular' element in spot is missing.";
           	}
        if (specspot.length != 1) {
                return "either zero or more than one 'specular' element found in spot declaration.";
               	}

         var specspot2 = specspot[0];

         this.rsspot = this.reader.getFloat(specspot2, "r", true);
         this.gsspot = this.reader.getFloat(specspot2, "g", true);
         this.bsspot = this.reader.getFloat(specspot2, "b", true);
         this.asspot = this.reader.getFloat(specspot2, "a", true);



    /****************************************** textures ************************************************/


        var textura =  rootElement.getElementsByTagName('textures');
    	if (textura == null) {
    		return "textures' element is missing.";
    	}

    	// various examples of different types of access
    	var textura2 = textura[0];

        var textures =  textura2.getElementsByTagName('texture');
        if (textures == null) {
        		return "texture' element in textures is missing.";
        	}

        var textures2 = textures[0];

        this.idtexture = this.reader.getString(textures2,"id",true);
        this.filetexture = this.reader.getString(textures2,"file",true);
        this.length_stexture = this.reader.getFloat(textures2,"length_s",true);
        this.length_ttexture = this.reader.getFloat(textures2,"length_t",true);




    /****************************************** materials ************************************************/


        var material1 =  rootElement.getElementsByTagName('materials');
    	if (material1 == null) {
    		return "materials' element is missing.";
    	}

    	// various examples of different types of access
    	var material12 = material1[0];

        var material2 =  material12.getElementsByTagName('material');
        if (material2 == null) {
        		return "'material' element in materials is missing.";
        	}

        var material23 = material2[0];

        this.idmaterial = this.reader.getString(material23,"id",true);


    /*************************** emisiion material ***************************/

    var emissions =  material23.getElementsByTagName('emission');
    if (emissions == null) {
       return "emissions' element in materials is missing.";
      	}

    var emissions2 = emissions[0];

     this.remission = this.reader.getFloat(emissions2,"r",true);
     this.gemission = this.reader.getFloat(emissions2,"g",true);
     this.bemission = this.reader.getFloat(emissions2,"b",true);
     this.aemission = this.reader.getFloat(emissions2,"a",true);


/*************************** ambiente material ***************************/

    var ambemi =  material23.getElementsByTagName('ambient');
    if (ambemi == null) {
       return "ambient' element in materials is missing.";
      	}

    var ambemi2 = ambemi[0];

     this.rambemi = this.reader.getFloat(ambemi2,"r",true);
     this.gambemi = this.reader.getFloat(ambemi2,"g",true);
     this.bambemi = this.reader.getFloat(ambemi2,"b",true);
     this.aambemi = this.reader.getFloat(ambemi2,"a",true);


/*************************** diffuse material ***************************/

    var diffemi =  material23.getElementsByTagName('diffuse');
    if (diffemi == null) {
       return "diffuse' element in materials is missing.";
      	}

    var diffemi2 = diffemi[0];

     this.rdiffemi = this.reader.getFloat(diffemi2,"r",true);
     this.gdiffemii = this.reader.getFloat(diffemi2,"g",true);
     this.bdiffemi = this.reader.getFloat(diffemi2,"b",true);
     this.adiffemi = this.reader.getFloat(diffemi2,"a",true);


     /*************************** specular material ***************************/

     var specemi =  material23.getElementsByTagName('specular');
     if (specemi == null) {
        return "specular' element in materials is missing."
        }

     var specemi2 = specemi[0];
     this.rspecemi = this.reader.getFloat(specemi2,"r",true);
     this.gspecemi = this.reader.getFloat(specemi2,"g",true);
     this.bspecemi = this.reader.getFloat(specemi2,"b",true);
     this.aspecemi = this.reader.getFloat(specemi2,"a",true);

 /*************************** shininess material ***************************/

     var shinemi =  material23.getElementsByTagName('shininess');
     if (shinemi == null) {
        return "shininess' element in materials is missing."
        }

     var shinemi2 = shinemi[0];
     this.rshinemi = this.reader.getFloat(shinemi2,"value",true);


 /*************************** transformations ***************************/

	var trans = rootElement.getElementsByTagName('transformations');
	if (trans == null) {
        	return "'transformations' element in materials is missing."
        	}
	if (trans.length != 1) {
        	return "either zero or more than one 'transformations' element found in spot declaration.";
        	}

     	var trans2 = trans[0];

	var trans3 =  trans2.getElementsByTagName('transformation');
        if (trans3 == null) {
        		return "'trans3' element in materials is missing.";
        	}

        var trans4 = trans3[0];

        this.idtrans = this.reader.getString(trans4,"id",true);


 /*************************** translate ***************************/

	var translation =  trans4.getElementsByTagName('translate');
     	if (translation == null) {
        	return "'translate' element in materials is missing."
        }

     	var translation2 = translation[0];
     	this.xtransl = this.reader.getFloat(translation2,"x",true);
	this.ytransl = this.reader.getFloat(translation2,"y",true);
	this.ztransl = this.reader.getFloat(translation2,"z",true);

 /*************************** rotate ***************************/

	var rotation =  trans4.getElementsByTagName('rotate');
     	if (rotation == null) {
        	return "'rotate' element in materials is missing."
        }

     	var rotation2 = rotation[0];
     	this.rotaxis = this.reader.getString(rotation2,"axis",true);
	this.rotangle = this.reader.getFloat(rotation2,"angle",true);

 /*************************** scale ***************************/

	var scale2 =  trans4.getElementsByTagName('scale');
     	if (scale2 == null) {
        	return "'scale' element in materials is missing."
        }

     	var scale3 = scale2[0];
     	this.xscale = this.reader.getFloat(scale3,"x",true);
	this.yscale = this.reader.getFloat(scale3,"y",true);
	this.zscale = this.reader.getFloat(scale3,"z",true);


 /*************************** primitives ***************************/

	var prims = rootElement.getElementsByTagName('primitives');
	if (prims == null) {
        	return "'primitives' element in materials is missing."
        	}
	if (prims.length != 1) {
        	return "either zero or more than one 'primitives' element found in spot declaration.";
        	}

     	var prims2 = prims[0];

	var prims3 =  prims2.getElementsByTagName('primitive');
        if (prims3 == null) {
        		return "'prims3' element in materials is missing.";
        	}

        var prims4 = prims3[0];

        this.idprims = this.reader.getString(prims4,"id",true);


/*************************** rectangle ***************************/

	var rect =  prims4.getElementsByTagName('rectangle');
     	if (rect == null) {
        	return "'rectangle' element in materials is missing."
        }

     	var rect2 = rect[0];
     	this.x1rect = this.reader.getFloat(rect2,"x1",true);
	this.ylrect = this.reader.getFloat(rect2,"y1",true);
	this.x2rect = this.reader.getFloat(rect2,"x2",true);
	this.y2rect = this.reader.getFloat(rect2,"y2",true);

/*************************** triangle ***************************/

	var tri =  prims4.getElementsByTagName('triangle');
     	if (tri == null) {
        	return "'triangle' element in materials is missing."
        }

     	var tri2 = tri[0];
     	this.x1tri = this.reader.getFloat(tri2,"x1",true);
	this.yltri = this.reader.getFloat(tri2,"y1",true);
	this.zltri = this.reader.getFloat(tri2,"z1",true);
	this.x2tri = this.reader.getFloat(tri2,"x2",true);
	this.y2tri = this.reader.getFloat(tri2,"y2",true);
	this.z2tri = this.reader.getFloat(tri2,"z2",true);
	this.x3tri = this.reader.getFloat(tri2,"x3",true);
	this.y3tri = this.reader.getFloat(tri2,"y3",true);
	this.z3tri = this.reader.getFloat(tri2,"z3",true);

/*************************** cylinder ***************************/

	var cyl =  prims4.getElementsByTagName('cylinder');
     	if (cyl == null) {
        	return "'cylinder' element in materials is missing."
        }

     	var cyl2 = cyl[0];
     	this.cylbase = this.reader.getFloat(cyl2,"base",true);
	this.cyltop = this.reader.getFloat(cyl2,"top",true);
	this.cylheight = this.reader.getFloat(cyl2,"height",true);
	this.cylslices = this.reader.getInteger(cyl2,"slices",true);
	this.cylstacks = this.reader.getInteger(cyl2,"stacks",true);

/*************************** sphere ***************************/

	var sphe =  prims4.getElementsByTagName('sphere');
     	if (sphe == null) {
        	return "'sphere' element in materials is missing."
        }

     	var sphe2 = sphe[0];
     	this.spheradius = this.reader.getFloat(sphe2,"radius",true);
	this.spheslices = this.reader.getInteger(sphe2,"slices",true);
	this.sphestacks = this.reader.getInteger(sphe2,"stacks",true);

/*************************** torus ***************************/

	var tor =  prims4.getElementsByTagName('torus');
     	if (tor == null) {
        	return "'torus' element in materials is missing."
        }

     	var tor2 = tor[0];
     	this.torinner = this.reader.getFloat(tor2,"inner",true);
	this.torouter = this.reader.getFloat(tor2,"outer",true);
	this.torslices = this.reader.getInteger(tor2,"slices",true);
	this.torloops = this.reader.getInteger(tor2,"loops",true);


 /*************************** components ***************************/

	var comps = rootElement.getElementsByTagName('components');
	if (comps == null) {
        	return "'components' element in materials is missing."
        	}
	if (comps.length != 1) {
        	return "either zero or more than one 'components' element found in spot declaration.";
        	}

     	var comps2 = comps[0];

	var comps3 =  comps2.getElementsByTagName('component');
        if (comps3 == null) {
        		return "'comps3' element in materials is missing.";
        	}

        var comps4 = comps3[0];

        this.idcomps = this.reader.getString(comps4,"id",true);


 /*************************** transformation ***************************/

	var tran = comps4.getElementsByTagName('transformation');
	if (tran == null) {
        	return "'transformation' element in materials is missing."
        	}
	if (tran.length != 1) {
        	return "either zero or more than one 'transformations' element found in spot declaration.";
        	}

     	var tran2 = tran[0];

	var tran3 =  tran2.getElementsByTagName('transformationref');
        if (tran3 == null) {
        		return "'tran3' element in materials is missing.";
        	}

        var tran4 = tran3[0];

        this.idtran = this.reader.getString(trans4,"id",true);


 /*************************** translate ***************************/

	var transl =  tran4.getElementsByTagName('translate');
     	if (transl == null) {
        	return "'translate' element in materials is missing."
        }

     	var transl2 = transl[0];
     	this.xtransl2 = this.reader.getFloat(transl2,"x",true);
	this.ytransl2 = this.reader.getFloat(transl2,"y",true);
	this.ztransl2 = this.reader.getFloat(transl2,"z",true);

 /*************************** rotate ***************************/

	var rot =  tran4.getElementsByTagName('rotate');
     	if (rot == null) {
        	return "'rotate' element in materials is missing."
        }

     	var rot2 = rot[0];
     	this.rotaxis2 = this.reader.getString(rot2,"axis",true);
	this.rotangle2 = this.reader.getFloat(rot2,"angle",true);

 /*************************** scale ***************************/

	var scal2 =  tran4.getElementsByTagName('scale');
     	if (scal2 == null) {
        	return "'scale' element in materials is missing."
        }

     	var scal3 = scal2[0];
     	this.xscale2 = this.reader.getFloat(scal3,"x",true);
	this.yscale2 = this.reader.getFloat(scal3,"y",true);
	this.zscale2 = this.reader.getFloat(scal3,"z",true);


 /*************************** materials ***************************/

	var mat = comps4.getElementsByTagName('materials');
	if (mat == null) {
        	return "'materials' element in materials is missing."
        	}
	if (mat.length != 1) {
        	return "either zero or more than one 'materials' element found in spot declaration.";
        	}

     	var mat2 = mat[0];

	var mat3 =  mat2.getElementsByTagName('material');
        if (mat3 == null) {
        		return "'mat3' element in material is missing.";
        	}

        var mat4 = mat3[0];

        this.idmat = this.reader.getString(mat4,"id",true);


/*************************** texture ***************************/

	var tex = comps4.getElementsByTagName('texture');
	if (tex == null) {
        	return "'texture' element in texture is missing."
        	}
	if (tex.length != 1) {
        	return "either zero or more than one 'texture' element found in spot declaration.";
        	}

     	var tex2 = tex[0];

        this.idtex = this.reader.getString(tex2,"id",true);


 /*************************** children ***************************/

	var child = comps4.getElementsByTagName('children');
	if (child == null) {
        	return "'children' element in children is missing."
        	}
	if (child.length != 1) {
        	return "either zero or more than one 'children' element found in spot declaration.";
        	}

     	var child2 = child[0];

	var component =  child2.getElementsByTagName('componentref');
        if (component == null) {
        		return "'component' element in material is missing.";
        	}

        var component2 = component[0];

        this.componentrefid = this.reader.getString(component,"id",true);

	var primitive =  child2.getElementsByTagName('primitiveref');
        if (primitive == null) {
        		return "'primitive' element in material is missing.";
        	}

        var primitive2 = primitive[0];

        this.primitiverefid = this.reader.getString(primitive,"id",true);












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


