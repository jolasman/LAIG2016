
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

    error = this.parseIllumination(rootElement);

    if (error != null) {
        this.onXMLError(error);
        return;
    }

    error = this.parseLights(rootElement);

    if (error != null) {
        this.onXMLError(error);
        return;
    }

    error = this.parseTextures(rootElement);

    if (error != null) {
        this.onXMLError(error);
        return;
    }

    error = this.parseMaterials(rootElement);

    if (error != null) {
        this.onXMLError(error);
        return;
    }

    error = this.parseTransformations(rootElement);

    if (error != null) {
        this.onXMLError(error);
        return;
    }



    error = this.parsePrimitives(rootElement);

    if (error != null) {
        this.onXMLError(error);
        return;
    }

    error = this.parseComponents(rootElement);

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
MySceneGraph.prototype.parseGlobalsExample = function(rootElement) {


    /**************************************** scene  *************************************************/


    var cena = rootElement.getElementsByTagName('scene');
    if (cena == null || cena.length == 0) {
        return "scene element is missing.";
    }

    if (cena.length != 1) {
        return "either zero or more than one 'scene' element found.";
    }

    var scene = cena[0];
    this.root = this.reader.getString(scene, "root", true);
    this.axis_length = this.reader.getFloat(scene, "axis_length", true);


    /**************************************** views *************************************/


    var vistas = rootElement.getElementsByTagName('views');
    if (vistas == null || vistas.length == 0) {
        return "views element is missing.";
    }
    var arrayViews = [];
    var arrayPerspectiveViews = [];
    var arrayFromPerspectiveViews = [];
    var arrayToPerspectiveViews = [];
    // various examples of different types of access

    for (var i = 0; i < vistas.length; i++) {

        this.default = this.reader.getString(vistas[i], "default", true);
        arrayViews.push(this.default);

        /*********** perspectives   **********/

        var perspectives = vistas[i].getElementsByTagName('perspective');
        if (perspectives == null) {
            return "perspectives element is missing.";
        }

        for (var j = 0; j < perspectives.length; j++) {

            this.id = this.reader.getString(perspectives[j], "id", true);
            this.near = this.reader.getFloat(perspectives[j], "near", true);
            this.far = this.reader.getFloat(perspectives[j], "far", true);
            this.angle = this.reader.getFloat(perspectives[j], "angle", true);

            if(j == 0) {
                var resultados = arrayViews[0].localeCompare(this.id);
                if (resultados == 0) {
                    arrayPerspectiveViews.push([this.id, this.near, this.far, this.angle]);
                } else {
                    console.warn(" The default view does not have the same name as the first view declared. " +
                        "the name os the first perspective cam is now the default");
                    arrayPerspectiveViews.push(this.default, this.near, this.far, this.angle);
                }
            }else{
                arrayPerspectiveViews.push([this.id, this.near, this.far, this.angle]);
            }
            /************** from   *******************/

            var froms = perspectives[j].getElementsByTagName('from');
            if (froms == null) {
                return "perspectives element is missing.";
            }
            var froms2 = froms[0];
            this.xfrom = this.reader.getFloat(froms2, "x", true);
            this.yfrom = this.reader.getFloat(froms2, "y", true);
            this.zfrom = this.reader.getFloat(froms2, "z", true);

            arrayFromPerspectiveViews.push([this.xfrom, this.yfrom, this.zfrom]);

            /************** to   *******************/

            var tos = perspectives[j].getElementsByTagName('to');
            if (tos == null) {
                return "perspectives element is missing.";
            }
            var tos2 = tos[0];
            this.xto = this.reader.getFloat(tos2, "x", true);
            this.yto = this.reader.getFloat(tos2, "y", true);
            this.zto = this.reader.getFloat(tos2, "z", true);

            arrayToPerspectiveViews.push([this.xto, this.yto, this.zto]);

        }
    }
};


/***************************************  ilumination    ****************************************/

MySceneGraph.prototype.parseIllumination = function(rootElement) {

    var iluminacao = rootElement.getElementsByTagName('illumination');
    if (iluminacao == null || iluminacao.length == 0) {
        return "illumination' element is missing.";
    }
    if (iluminacao.length != 1) {
        return "either zero or more than one 'illumination' element found.";
    }
    // various examples of different types of access
    var illumination2 = iluminacao[0];
    this.doublesided = this.reader.getBoolean(illumination2, "doublesided", true);
    this.local = this.reader.getBoolean(illumination2, "local", true);

    /*********************** ambient  ***********************/

    var ambiente = illumination2.getElementsByTagName('ambient');
    if (ambiente == null || ambiente.length == 0) {
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

    var fundo = illumination2.getElementsByTagName('background');
    if (fundo == null || fundo.length == 0) {
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
};

/************************************** lights *******************************************/
/**
 *
 * neste momento os valores de cada tag omni esta a ser lido e guardado com os valores em arrays diferentes
 * um para o id e enabled
 * outro para guardar a location
 * outro para o ambient, etc.
 * estando guardados em cada array pela sua ordem correspondente, isto é a posicao[i] de cada array
 * coresponde a cada tag[i] omni
 **/

MySceneGraph.prototype.parseLights = function(rootElement) {

    var luz = rootElement.getElementsByTagName('lights');
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
    var arrayOmni = [];
    var arrayLocationOmni = [];
    var arrayAmbientOmni = [];
    var arrayDiffuseOmni = [];
    var arraySpecularOmni = [];

    for (var i = 0; i < omnis.length; i++) {
        this.idomni = this.reader.getString(omnis[i], "id", true);
        this.enabledomni = this.reader.getBoolean(omnis[i], "enabled", true);
        if(this.enabledomni == null){
            console.warn(" Enabled value in omni: " + this.idomni +" not declared. default value used (1 == true).");
            this.enabledomni = true;
        }

        arrayOmni.push([this.idomni, this.enabledomni]);


        /********************* location in omni   *******************/

        var locations = omnis[i].getElementsByTagName('location');
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

        arrayLocationOmni.push([this.xloc, this.yloc, this.zloc, this.wloc]);


        /********************* ambient in omni   *******************/

        var ambomni = omnis[i].getElementsByTagName('ambient');
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

        arrayAmbientOmni.push([this.rao, this.gao, this.bao, this.aao]);

        /********************* diffuse in omni   *******************/

        var difomni = omnis[i].getElementsByTagName('diffuse');
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

        arrayDiffuseOmni.push([this.rdo, this.gdo, this.bdo, this.ado]);

        /********************* specular in omni   *******************/

        var specomni = omnis[i].getElementsByTagName('specular');
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

        arraySpecularOmni.push([this.rso, this.gso, this.bso, this.aso]);
    }


    /******************************************* spot *************************************************/

    var spots = luzes.getElementsByTagName('spot');
    if (spots == null) {
        return "spot' element is missing.";
    }
    /**
     *
     * neste momento os valores de cada tag spot esta a ser lido e guardado da mesma forma que os omnis
     *
     **/
    var arraySpot = [];
    var arrayLocationSpot = [];
    var arrayTargetSpot = [];
    var arrayAmbientSpot = [];
    var arrayDiffuseSpot = [];
    var arraySpecularSpot = [];

    for (var i = 0; i < spots.length; i++) {
        this.idspot = this.reader.getString(spots[i], "id", true);
        this.enabledspot = this.reader.getBoolean(spots[i], "enabled", true);
        this.anglespot = this.reader.getFloat(spots[i], "angle", true);
        this.exponentspot = this.reader.getFloat(spots[i], "exponent", true);

        if(this.enabledspot == null){
            console.warn(" Enabled value in spot: " + this.idspot +" not declared. default value used (1 == true).");
            this.enabledspot = true;
        }

        arraySpot.push([this.idspot, this.enabledspot, this.anglespot, this.exponentspot]);


        /********************* target in spot  *******************/

        var targets = spots[i].getElementsByTagName('target');
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

        arrayTargetSpot.push([this.xtarspot, this.ytarspot, this.ztarspot]);

        /********************* location in spot   *******************/

        var locationspot = spots[i].getElementsByTagName('location');
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

        arrayLocationSpot.push([this.xlocspot, this.ylocspot, this.zlocspot]);

        /********************* ambient in spot   *******************/

        var ambspot = spots[i].getElementsByTagName('ambient');
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

        arrayAmbientSpot.push([this.ral, this.gal, this.bal, this.aal]);

        /********************* diffuse in spot   *******************/

        var diffspot = spots[i].getElementsByTagName('diffuse');
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

        arrayDiffuseSpot.push([this.rds, this.gds, this.bds, this.ads]);

        /********************* specular in spot   *******************/

        var specspot = spots[i].getElementsByTagName('specular');
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

        arraySpecularSpot.push([this.rsspot, this.gsspot, this.bsspot, this.asspot]);
    }
};

/****************************************** textures ************************************************/


MySceneGraph.prototype.parseTextures = function(rootElement) {

    var textura = rootElement.getElementsByTagName('textures');
    if (textura == null || textura.length == 0) {
        return "textures' element is missing.";
    }
    // various examples of different types of access
    var textura2 = textura[0];
    var textures = textura2.getElementsByTagName('texture');
    if (textures == null) {
        return "texture' element in textures is missing.";
    }
    var arrayTextures = [];
    var arrayTexturesID = [];


    for (var i = 0; i < textures.length; i++) {

        this.idtexture = this.reader.getString(textures[i], "id", true);
        this.filetexture = this.reader.getString(textures[i], "file", true);
        this.length_stexture = this.reader.getFloat(textures[i], "length_s", true);
        this.length_ttexture = this.reader.getFloat(textures[i], "length_t", true);

        if (i == 0) {
            this.idtexture = this.reader.getString(textures[i], "id", true);

            arrayTextures.push([this.filetexture, this.length_stexture, this.length_ttexture]);
            arrayTexturesID.push(this.idtexture);
        }
        if (i > 0) {
            for (var j = 0; j < arrayTexturesID.length; j++) {
                var resultTexture = [];
                this.secondidText = this.idtexture = this.reader.getString(textures[i], "id", true);
                var texturasID = arrayTexturesID[j].localeCompare(this.secondidText);
                resultTexture.push(texturasID);
            }
            for (var y = 0; y < resultTexture.length; y++) {
                if (resultTexture[y] == 0) {
                    console.log("id of Texture: " + this.idtexture + " must be different from the other ones");
                    break;
                } else {
                    arrayTextures.push([this.filetexture, this.length_stexture, this.length_ttexture]);
                    arrayTexturesID.push(this.idtexture);
                }
            }
        }
    }
};

/****************************************** materials ************************************************/


MySceneGraph.prototype.parseMaterials = function(rootElement) {

    var material1 = rootElement.getElementsByTagName('materials');
    if (material1 == null) {
        return "materials' element is missing.";
    }

    // various examples of different types of access
    var materiais1 = material1[0];
    var materiais = materiais1.getElementsByTagName('material');
    var arrayMaterials = [];
    var arrayEmissionMaterial = [];
    var arrayAmbientMaterial = [];
    var arrayDiffuseMaterial = [];
    var arraySpecularMaterial = [];
    var arrayShininnesMaterial = [];

    for (var i = 0; i < materiais.length; i++) {
        this.idmaterial = this.reader.getString(materiais[i], "id", true);
        arrayMaterials.push(this.idmaterial);

        /*************************** emisiion material ***************************/

        var emissions = materiais[i].getElementsByTagName('emission');
        if (emissions == null) {
            return "emissions' element in materials is missing.";
        }
        var emissions2 = emissions[0];
        this.remission = this.reader.getFloat(emissions2, "r", true);
        this.gemission = this.reader.getFloat(emissions2, "g", true);
        this.bemission = this.reader.getFloat(emissions2, "b", true);
        this.aemission = this.reader.getFloat(emissions2, "a", true);
        arrayEmissionMaterial.push([this.remission, this.gemission, this.bemission, this.aemission]);


        /*************************** ambiente material ***************************/

        var ambemi = materiais[i].getElementsByTagName('ambient');
        if (ambemi == null) {
            return "ambient' element in materials is missing.";
        }
        var ambemi2 = ambemi[0];
        this.rambemi = this.reader.getFloat(ambemi2, "r", true);
        this.gambemi = this.reader.getFloat(ambemi2, "g", true);
        this.bambemi = this.reader.getFloat(ambemi2, "b", true);
        this.aambemi = this.reader.getFloat(ambemi2, "a", true);
        arrayAmbientMaterial.push([this.rambemi, this.gambemi, this.bambemi, this.aambemi]);

        /*************************** diffuse material ***************************/

        var diffemi = materiais[i].getElementsByTagName('diffuse');
        if (diffemi == null) {
            return "diffuse' element in materials is missing.";
        }
        var diffemi2 = diffemi[0];
        this.rdiffemi = this.reader.getFloat(diffemi2, "r", true);
        this.gdiffemii = this.reader.getFloat(diffemi2, "g", true);
        this.bdiffemi = this.reader.getFloat(diffemi2, "b", true);
        this.adiffemi = this.reader.getFloat(diffemi2, "a", true);
        arrayDiffuseMaterial.push([this.rdiffemi, this.gdiffemii, this.bdiffemi, this.adiffemi]);

        /*************************** specular material ***************************/

        var specemi = materiais[i].getElementsByTagName('specular');
        if (specemi == null) {
            return "specular' element in materials is missing."
        }
        var specemi2 = specemi[0];
        this.rspecemi = this.reader.getFloat(specemi2, "r", true);
        this.gspecemi = this.reader.getFloat(specemi2, "g", true);
        this.bspecemi = this.reader.getFloat(specemi2, "b", true);
        this.aspecemi = this.reader.getFloat(specemi2, "a", true);
        arraySpecularMaterial.push([this.rspecemi, this.gspecemi, this.bspecemi, this.aspecemi]);

        /*************************** shininess material ***************************/

        var shinemi = materiais[i].getElementsByTagName('shininess');
        if (shinemi == null) {
            return "shininess' element in materials is missing."
        }
        var shinemi2 = shinemi[0];
        this.rshinemi = this.reader.getFloat(shinemi2, "value", true);
        arrayShininnesMaterial.push(this.rshinemi);
    }
};

/******************************************* transformations **************************************/


MySceneGraph.prototype.parseTransformations = function(rootElement) {


    var trans = rootElement.getElementsByTagName('transformations');
    if (trans == null) {
        return "'transformations' element is missing."
    }
    var trans2 = trans[0];
    var trans3 = trans2.getElementsByTagName('transformation');
    if (trans3 == null) {
        return "'transformation' element in transformations is missing.";
    }
    var arrayTransformations = [];
    var arrayTranslateTransformations = [];
    var arrayRotateTransformations = [];
    var arrayScaleTransformations = [];

    for (var i = 0; i < trans3.length; i++) {
        this.idtrans = this.reader.getString(trans3[i], "id", true);
        arrayTransformations.push(this.idtrans);

        var transla = trans3[i].getElementsByTagName('translate');
        var rota = trans3[i].getElementsByTagName('rotate');
        var sca = trans3[i].getElementsByTagName('scale');
        if (transla == null) {
            if (rota == null) {
                if (sca == null) {
                    console.log(" Translate, rotate or scale need to be declared in tranformation tag");
                }
            }
        }

        /*************************** translate ***************************/

        if (transla) {

            var translation = transla[0];
            this.xtransl = this.reader.getFloat(translation, "x", true);
            this.ytransl = this.reader.getFloat(translation, "y", true);
            this.ztransl = this.reader.getFloat(translation, "z", true);
            arrayTranslateTransformations.push([this.xtransl, this.ytransl, this.ztransl]);
        }

        /*************************** rotate ***************************/

        if (rota) {
            var rotation = rota[0];
            this.rotaxis = this.reader.getString(rotation, "axis", true);
            this.rotangle = this.reader.getFloat(rotation, "angle", true);
            arrayRotateTransformations.push([this.rotaxis, this.rotangle]);
        }

        /*************************** scale ***************************/

        if (sca) {
            var scale = sca[0];
            this.xscale = this.reader.getFloat(scale, "x", true);
            this.yscale = this.reader.getFloat(scale, "y", true);
            this.zscale = this.reader.getFloat(scale, "z", true);
            arrayScaleTransformations.push([this.xscale, this.yscale, this.zscale]);
        }
    }
};

/************************************** primitives *********************************************/


MySceneGraph.prototype.parsePrimitives = function(rootElement) {

    var prims = rootElement.getElementsByTagName('primitives');
    if (prims == null) {
        return "'primitives' element is missing."
    }
    var prims2 = prims[0];
    var prims3 = prims2.getElementsByTagName('primitive');
    if (prims3 == null) {
        return "'primitive' element in primitives is missing.";
    }
    var arrayPrimitives = [];
    var arrayRectanglePrimitives = [];
    var arrayTrianglePrimitives = [];
    var arrayCylinderPrimitives = [];
    var arraySpherePrimitives = [];
    var arrayTorusPrimitives = [];

    for (var i = 0; i < prims3.length; i++) {
        if (i == 0) {
            this.idprims = this.reader.getString(prims3[i], "id", true);
            arrayPrimitives.push(this.idprims);
        }
        if (i > 0) {
            for (var j = 0; j < arrayPrimitives.length; j++) {
                var result = [];
                this.secondid = this.idprims = this.reader.getString(prims3[i], "id", true);
                var resultado = arrayPrimitives[j].localeCompare(this.secondid);
                result.push(resultado);
            }
            for (var y = 0; y < result.length; y++) {
                if (result[y] == 0) {
                    console.log("id of primite tag: " + this.secondid + " equals to another primite id. not allowed");
                    break;
                } else {
                    arrayPrimitives.push(this.idprims);
                }
            }
        }
        var rect = prims3[i].getElementsByTagName('rectangle');
        var tri = prims3[i].getElementsByTagName('triangle');
        var cyl = prims3[i].getElementsByTagName('cylinder');
        var sphe = prims3[i].getElementsByTagName('sphere');
        var tor = prims3[i].getElementsByTagName('torus');

        if (rect.length > 1) {
            console.log("rectangle defined more than once in primitive tag");
        }
        if (tri.length > 1) {
            console.log("triangle defined more than once in primitive tag");
        }
        if (cyl.length > 1) {
            console.log("cylinder defined more than once in primitive tag");
        }
        if (sphe.length > 1) {
            console.log("sphere defined more than once in primitive tag");
        }
        if (tor.length > 1) {
            console.log("torus defined more than once in primitive tag");
        }


        // if( (rect.length && tri.length && cyl.length && sphe.length && tor.length) == 0 ){         //porque e que aqui nao faz o pedido caso haja alguma primitiva declarada
        // console.log("no primitive defined in primitive:" + this.idprims + ".");
        // }


        /*************************** rectangle ***************************/

        if (( (tri.length && cyl.length && sphe.length && tor.length) == 0) && rect.length == 1) {
            var rect2 = rect[0];
            this.x1rect = this.reader.getFloat(rect2, "x1", true);
            this.ylrect = this.reader.getFloat(rect2, "y1", true);
            this.x2rect = this.reader.getFloat(rect2, "x2", true);
            this.y2rect = this.reader.getFloat(rect2, "y2", true);
            arrayRectanglePrimitives.push([this.x1rect, this.ylrect, this.x2rect, this.y2rect]);
        }

        /*************************** triangle ***************************/

        if (( (rect.length && cyl.length && sphe.length && tor.length) == 0) && tri.length == 1) {
            var tri2 = tri[0];
            this.x1tri = this.reader.getFloat(tri2, "x1", true);
            this.yltri = this.reader.getFloat(tri2, "y1", true);
            this.zltri = this.reader.getFloat(tri2, "z1", true);
            this.x2tri = this.reader.getFloat(tri2, "x2", true);
            this.y2tri = this.reader.getFloat(tri2, "y2", true);
            this.z2tri = this.reader.getFloat(tri2, "z2", true);
            this.x3tri = this.reader.getFloat(tri2, "x3", true);
            this.y3tri = this.reader.getFloat(tri2, "y3", true);
            this.z3tri = this.reader.getFloat(tri2, "z3", true);

            arrayTrianglePrimitives.push([this.x1tri, this.yltri, this.zltri, this.x2tri, this.y2tri, this.z2tri, this.x3tri, this.y3tri, this.z3tri]);
        }
        /*************************** cylinder ***************************/

        if (( (tri.length && rect.length && sphe.length && tor.length) == 0) && cyl.length == 1) {
            var cyl2 = cyl[0];
            this.cylbase = this.reader.getFloat(cyl2, "base", true);
            this.cyltop = this.reader.getFloat(cyl2, "top", true);
            this.cylheight = this.reader.getFloat(cyl2, "height", true);
            this.cylslices = this.reader.getInteger(cyl2, "slices", true);
            this.cylstacks = this.reader.getInteger(cyl2, "stacks", true);

            arrayCylinderPrimitives.push([this.cylbase, this.cyltop, this.cylheight, this.cylslices, this.cylstacks]);
        }
        /*************************** sphere ***************************/

        if (( (tri.length && cyl.length && cyl.length && tor.length) == 0) && sphe.length == 1) {
            var sphe2 = sphe[0];
            this.spheradius = this.reader.getFloat(sphe2, "radius", true);
            this.spheslices = this.reader.getInteger(sphe2, "slices", true);
            this.sphestacks = this.reader.getInteger(sphe2, "stacks", true);
            arraySpherePrimitives.push([this.spheradius, this.spheslices, this.sphestacks]);
        }
        /*************************** torus ***************************/

        if (( (tri.length && cyl.length && sphe.length && sphe.length) == 0) && tor.length == 1) {
            var tor2 = tor[0];
            this.torinner = this.reader.getFloat(tor2, "inner", true);
            this.torouter = this.reader.getFloat(tor2, "outer", true);
            this.torslices = this.reader.getInteger(tor2, "slices", true);
            this.torloops = this.reader.getInteger(tor2, "loops", true);
            arrayTorusPrimitives.push([this.torinner, this.torouter, this.torslices, this.torloops]);
        }
        if ((tri.length || cyl.length || sphe.length || sphe.length || tor.length) > 1) {
            console.log("more than one primitive defined in primitive tag. not allowed");
        }
    }
};

/**************************************** components ***************************************/


MySceneGraph.prototype.parseComponents = function(rootElement) {

    var comps = rootElement.getElementsByTagName('components');
    if (comps == null || comps.length == 0) {
        return "'components' element is missing."
    }
    if (comps.length != 1) {
        return "either zero or more than one 'components' element found.";
    }
    var comps2 = comps[0];
    var comps3 = comps2.getElementsByTagName('component');
    if (comps3 == null || comps3.length == 0) {
        return "'component' element in components is missing.";
    }
    var arrayComponentComponents = [];
    var arrayTransformationRefComponents = [];
    var arrayTransformationTranslateComponents = [];
    var arrayTransformationRotateComponents = [];
    var arrayTransformationScaleComponents = [];
    var arrayMaterialsComponents = [];
    var arrayTextureComponents = [];
    var arraychildrenComponentrefComponents = [];
    var arraychildrenPrimitiverefComponents = [];

    for (var i = 0; i < comps3.length; i++) {
        this.idcomps = this.reader.getString(comps3[i], "id", true);
        arrayComponentComponents.push(this.idcomps);

        /*************************** transformation ***************************/

        var tran = comps3[i].getElementsByTagName('transformation');
        if (tran == null || tran.length == 0) {
            return "'transformation' element in component is missing."
        }
        if (tran.length != 1) {
            return "either zero or more than one 'transformations' element found in component declaration.";
        }
        var variableTranformation = tran[0];
        var transformationRef = variableTranformation.getElementsByTagName('transformationref');
        var transl = variableTranformation.getElementsByTagName('translate');
        var rot = variableTranformation.getElementsByTagName('rotate');
        var scal2 = variableTranformation.getElementsByTagName('scale');

        if (transformationRef.length !== 0) // caso haja transformationref
        {
            if ((transl.length && rot.length & scal2.length) == 0) {
                var tran4 = transformationRef[0];
                this.idtran = this.reader.getString(tran4, "id", true);
                arrayTransformationRefComponents.push(this.idtran);
            }
            else {
                console.log("is allowed only one type of tranformation in component: " + this.idcomps + ". choose one  ");
            }
        }
        if (transformationRef.length == 0) {
            if ((transl.length && rot.length & scal2.length) == 0) {
                console.warn("in transformation tag inside component :" + this.idcomps + " you need to put one type of transformation.  "
                    +"the default transformation will be applied: translate x = 0 , y = 0 , z = 0");
                this.xtranslate2 = 0;
                this.ytranslate2 = 0;
                this.ztranslate2 = 0;
                arrayTransformationTranslateComponents.push([this.xtranslate2, this.ytranslate2, this.ztranslate2]);
            } else {

                /*************************** translate ***************************/

                var transl2 = transl[0];
                this.xtranslate2 = this.reader.getFloat(transl2, "x", true);
                this.ytranslate2 = this.reader.getFloat(transl2, "y", true);
                this.ztranslate2 = this.reader.getFloat(transl2, "z", true);
                arrayTransformationTranslateComponents.push([this.xtranslate2, this.ytranslate2, this.ztranslate2]);

                /*************************** rotate ***************************/

                var rot2 = rot[0];
                this.rotaxis2 = this.reader.getString(rot2, "axis", true);
                this.rotangle2 = this.reader.getFloat(rot2, "angle", true);
                arrayTransformationRotateComponents.push([this.rotaxis2, this.rotangle2]);

                /*************************** scale ***************************/

                var scal3 = scal2[0];
                this.xscale2 = this.reader.getFloat(scal3, "x", true);
                this.yscale2 = this.reader.getFloat(scal3, "y", true);
                this.zscale2 = this.reader.getFloat(scal3, "z", true);
                arrayTransformationScaleComponents.push([this.xtranslate2, this.ytranslate2, this.ztranslate2]);
            }
        }

        /*************************** materials ***************************/

        var mat = comps3[i].getElementsByTagName('materials');
        if (mat == null || mat.length == 0) {
            return "'materials' element in component is missing."
        }
        var mat2 = mat[0];
        var mat3 = mat2.getElementsByTagName('material');
        if (mat3 == null || mat3.length == 0) {
            console.warn("you need to declare at least one material in component: " + this.idcomps + "" +
                " default material will be applied: inherit");
            this.idmat = "inherit";
            arrayMaterialsComponents.push(this.idmat);
        }

        for (var j = 0; j < mat3.length; j++) {
            this.idmat = this.reader.getString(mat3[j], "id", true);
            arrayMaterialsComponents.push(this.idmat);
        }


        /*************************** texture ***************************/

        var tex = comps3[i].getElementsByTagName('texture');
        if (tex == null) {
            return "'texture' element in component is missing."
        }
        if (tex.length != 1) {
            return "either zero or more than one 'texture' element found in component declaration.";
        }
        var tex2 = tex[0];
        this.idtex = this.reader.getString(tex2, "id", true);
        arrayTextureComponents.push(this.idtex);


        /*************************** children ***************************/


        var child = comps3[i].getElementsByTagName('children');
        if (child.length == 0) {
            console.log("'children' element in component: " + this.idcomps + " is missing in component. NOT ALLWOED.");
        }
        var child2 = child[0];
        var componentrefChildren = child2.getElementsByTagName('componentref');
        if (componentrefChildren.length == 0) {
            console.log("'componentref' element in children(component:" + this.idcomps + ") is missing.");
        }
        if (componentrefChildren.length !== 0) {
            for (var k = 0; k < componentrefChildren.length; k++) {
                this.componentrefidchildren = this.reader.getString(componentrefChildren[k], "id", true);
                arraychildrenComponentrefComponents.push(this.componentrefidchildren);
            }
        }

        var primitiverefCholdren = child2.getElementsByTagName('primitiveref');
        if (primitiverefCholdren.length == 0) {
            console.log("'primitiveref' element in children(component:" + this.idcomps + ") is missing.");
        }
        if (primitiverefCholdren.length !== 0) {
            for (var l = 0; l < primitiverefCholdren.length; l++) {
                this.primitiverefidchildren = this.reader.getString(primitiverefCholdren[l], "id", true);
                arraychildrenPrimitiverefComponents.push(this.primitiverefidchildren);
            }
        }
    }



};

/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError=function (message) {
    console.error("XML Loading Error: "+message);
    this.loadedOk=false;
};


