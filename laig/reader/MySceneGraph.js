
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
    this.scene.root["id"] = this.reader.getString(scene, "root", true);
    this.scene.root["axis"] = this.reader.getFloat(scene, "axis_length", true);


    /**************************************** views *************************************/


    var vistas = rootElement.getElementsByTagName('views');
    if (vistas == null || vistas.length == 0) {
        return "views element is missing.";
    }
    this.arrayPerspectiveViews = [];

    // various examples of different types of access

    for (var i = 0; i < 1; i++) {

        this.default = this.reader.getString(vistas[i], "default", true);

        /*********** perspectives   **********/

        var perspectives = vistas[i].getElementsByTagName('perspective');
        if (perspectives == null) {
            return "perspectives element is missing.";
        }

        for (var j = 0; j < perspectives.length; j++) {
            this.arrayFromPerspectiveViews = [];
            this.arrayToPerspectiveViews = [];
            this.id = this.reader.getString(perspectives[j], "id", true);
            this.near = this.reader.getFloat(perspectives[j], "near", true);
            this.far = this.reader.getFloat(perspectives[j], "far", true);
            this.angle = this.reader.getFloat(perspectives[j], "angle", true);

            if(j == 0) {
                var resultados = this.default.localeCompare(this.id);
                if (resultados == 0) {
                    this.arrayPerspectiveViews.push([this.id, this.near, this.far, this.angle]);
                } else {
                    console.warn(" The default view does not have the same name as the first view declared. " +
                        "the name os the first perspective cam is now the default");
                    this.arrayPerspectiveViews.push([this.default, this.near, this.far, this.angle]);
                }
            }else{
                this.arrayPerspectiveViews.push([this.id, this.near, this.far, this.angle]);
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

            this.arrayFromPerspectiveViews.push(this.xfrom, this.yfrom, this.zfrom);
            this.arrayPerspectiveViews[j].push(this.arrayFromPerspectiveViews);

            /************** to   *******************/

            var tos = perspectives[j].getElementsByTagName('to');
            if (tos == null) {
                return "perspectives element is missing.";
            }
            var tos2 = tos[0];
            this.xto = this.reader.getFloat(tos2, "x", true);
            this.yto = this.reader.getFloat(tos2, "y", true);
            this.zto = this.reader.getFloat(tos2, "z", true);

            this.arrayToPerspectiveViews.push(this.xto, this.yto, this.zto);
            this.arrayPerspectiveViews[j].push(this.arrayToPerspectiveViews);

        }
    }
};


/***************************************  ilumination    *********************************************/
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

    this.arrayAmbient = [];
    this.arrayBackground = [];
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
    this.arrayAmbient.push(this.ramb,this.gamb,this.bamb,this.aamb);
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
    this.arrayBackground.push(this.rback,this.gback,this.bback,this.aback);
};


/************************************** lights ******************************************************/
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
    this.arrayOmni = [];

    for (var i = 0; i < omnis.length; i++) {

        this.arrayLocationOmni = [];
        this.arrayAmbientOmni = [];
        this.arrayDiffuseOmni = [];
        this.arraySpecularOmni = [];

        this.enabledomni = this.reader.getBoolean(omnis[i], "enabled", true);
        if(this.enabledomni == null){
            console.warn(" Enabled value in omni: " + this.idomni +" not declared. default value used (1 == true).");
            this.enabledomni = true;
        }



        if (i == 0) {
            this.idomni = this.reader.getString(omnis[i], "id", true);
            this.arrayOmni.push([this.idomni, this.enabledomni]);
        }

        if (i > 0) {
            for (var j = 0; j < this.arrayOmni.length; j++) {
                var resultOmni = [];
                var secondidOmni = this.reader.getString(omnis[i], "id", true);
                var omniID = this.arrayOmni[j][0].localeCompare(secondidOmni);
                resultOmni.push(omniID);
                if(omniID == 0){
                    break;
                }
            }
            for (var y = 0; y < resultOmni.length; y++) {
                if (resultOmni[y] == 0) {
                    console.log("id of omni light: " + this.idomni + " must be different from the other ones. " +
                        " A new random id will be applied : " + this.idomni + i);
                    this.arrayOmni.push([this.idomni + i, this.enabledomni]);
                    break;
                } else {
                    this.idomni = this.reader.getString(omnis[i], "id", true);
                    this.arrayOmni.push([this.idomni, this.enabledomni]);
                }
            }
        }



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

        this.arrayLocationOmni.push(this.xloc, this.yloc, this.zloc, this.wloc);
        this.arrayOmni[i].push(this.arrayLocationOmni);

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

        this.arrayAmbientOmni.push(this.rao, this.gao, this.bao, this.aao);
        this.arrayOmni[i].push(this.arrayAmbientOmni);

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

        this.arrayDiffuseOmni.push(this.rdo, this.gdo, this.bdo, this.ado);
        this.arrayOmni[i].push(this.arrayDiffuseOmni);

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

        this.arraySpecularOmni.push(this.rso, this.gso, this.bso, this.aso);
        this.arrayOmni[i].push(this.arraySpecularOmni);
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
    this.arraySpot = [];


    for (var i = 0; i < spots.length; i++) {

        this.arrayLocationSpot = [];
        this.arrayTargetSpot = [];
        this.arrayAmbientSpot = [];
        this.arrayDiffuseSpot = [];
        this.arraySpecularSpot = [];


        this.enabledspot = this.reader.getBoolean(spots[i], "enabled", true);
        this.anglespot = this.reader.getFloat(spots[i], "angle", true);
        this.exponentspot = this.reader.getFloat(spots[i], "exponent", true);

        if(this.enabledspot == null){
            console.warn(" Enabled value in spot: " + this.idspot +" not declared. default value used (1 == true).");
            this.enabledspot = true;
        }

        if (i == 0) {
            this.idspot = this.reader.getString(spots[i], "id", true);
            this.arraySpot.push([this.idspot, this.enabledspot, this.anglespot, this.exponentspot]);
        }

        if (i > 0) {
            for (var j = 0; j < this.arraySpot.length; j++) {
                var resultSpot = [];
                var secondidSpot = this.reader.getString(spots[i], "id", true);
                var spotID = this.arraySpot[j][0].localeCompare(secondidSpot);
                resultSpot.push(spotID);
                if(spotID == 0){
                    break;
                }
            }
            for (var y = 0; y < resultSpot.length; y++) {
                if (resultSpot[y] == 0) {
                    console.log("id of spot light: " + this.idspot + " must be different from the other ones. " +
                        " A new random id will be applied : " + this.idspot + i);
                    this.arraySpot.push([this.idspot + i, this.enabledspot, this.anglespot, this.exponentspot]);
                    break;
                } else {
                    this.idspot = this.reader.getString(spots[i], "id", true);
                    this.arraySpot.push([this.idspot, this.enabledspot, this.anglespot, this.exponentspot]);
                }
            }
        }
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

        this.arrayTargetSpot.push(this.xtarspot, this.ytarspot, this.ztarspot);
        this.arraySpot[i].push(this.arrayTargetSpot);

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

        this.arrayLocationSpot.push(this.xlocspot, this.ylocspot, this.zlocspot);
        this.arraySpot[i].push(this.arrayLocationSpot);

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

        this.arrayAmbientSpot.push(this.ral, this.gal, this.bal, this.aal);
        this.arraySpot[i].push(this.arrayAmbientSpot);

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

        this.arrayDiffuseSpot.push(this.rds, this.gds, this.bds, this.ads);
        this.arraySpot[i].push(this.arrayDiffuseSpot);

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

        this.arraySpecularSpot.push(this.rsspot, this.gsspot, this.bsspot, this.asspot);
        this.arraySpot[i].push(this.arraySpecularSpot);
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




    for (var i = 0; i < textures.length; i++) {
        var arrayLength = [];
        var arrayTextures = [];
        this.idtexture = this.reader.getString(textures[i], "id", true);
        this.filetexture = this.reader.getString(textures[i], "file", true);
        this.length_stexture = this.reader.getFloat(textures[i], "length_s", true);
        this.length_ttexture = this.reader.getFloat(textures[i], "length_t", true);
        arrayLength["s"] = this.length_stexture;
        arrayLength["t"] = this.length_ttexture;
        // if (i == 0) {
        this.idtexture = this.reader.getString(textures[i], "id", true);

        arrayTextures["textura"] = new CGFtexture(this.scene, this.filetexture);
        arrayTextures["length_s_t"] = arrayLength;


        this.scene.texturas[this.idtexture] = arrayTextures;


        //}
        // if (i > 0) {
        //     for (var j = 0; j < arrayTextures.length; j++) {
        //         var resultTexture = [];
        //         var secondidText  = this.reader.getString(textures[i], "id", true);
        //         var texturasID = this.scene.texturas[j].localeCompare(secondidText);
        //         resultTexture.push(texturasID);
        //         if(texturasID == 0){
        //             break;
        //         }
        //     }
        //     for (var y = 0; y < resultTexture.length; y++) {
        //         if (resultTexture[y] == 0) {
        //             console.log("id of Texture: " + this.idtexture + " must be different from the other ones");
        //             break;
        //         } else {
        //             arrayTextures["Textura"] = new CGFtexture(this.scene, this.filetexture);
        //             arrayLength["s"] = this.length_stexture;
        //             arrayLength["t"] = this.length_ttexture;
        //             arrayTextures["length "] = arrayLength;
        //             this.scene.texturas[this.idtexture] = arrayTextures;
        //
        //         }
        //     }
        // }
    }
};


/****************************************** materials ***********************************************/
MySceneGraph.prototype.parseMaterials = function(rootElement) {

    var material1 = rootElement.getElementsByTagName('materials');
    if (material1 == null) {
        return "materials' element is missing.";
    }
    var materiais1 = material1[0];
    var materiais = materiais1.getElementsByTagName('material');

    var arrayMaterials = [];

    for (var i = 0; i < materiais.length; i++) {

        // if (i == 0) {

        this.idmaterial = this.reader.getString(materiais[i], "id", true);
        arrayMaterials.push([this.idmaterial]);

        this.scene.materiais[this.idmaterial] = new CGFappearance(this.scene);

        //  }

        // if (i > 0) {
        //     for (var j = 0; j < arrayMaterials.length; j++) {
        //         var resultMaterials = [];
        //         var secondidMaterial = this.reader.getString(materiais[i], "id", true);
        //         var materialID = arrayMaterials[j][0].localeCompare(secondidMaterial);
        //         resultMaterials.push(materialID);
        //         if(materialID == 0){
        //             break;
        //         }
        //     }
        //     for (var y = 0; y < resultMaterials.length; y++) {
        //         if (resultMaterials[y] == 0) {
        //             console.log("id of Material: " + this.idmaterial + " must be different from the other ones. " +
        //                 " A new random id will be applied : " + this.idmaterial + i);
        //             arrayMaterials.push([this.idmaterial + i]);
        //             this.scene.materiais[this.idmaterial + i] = new CGFappearance(this.scene);
        //             break;
        //         } else {
        //             this.idmaterial = this.reader.getString(materiais[i], "id", true);
        //             arrayMaterials.push([this.idmaterial]);
        //             this.scene.materiais[this.idmaterial] = new CGFappearance(this.scene);
        //         }
        //     }
        // }



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

        this.scene.materiais[this.idmaterial].setEmission(this.remission, this.gemission, this.bemission, this.aemission);



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

        this.scene.materiais[this.idmaterial].setAmbient(this.rambemi, this.gambemi, this.bambemi, this.aambemi);



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

        this.scene.materiais[this.idmaterial].setDiffuse(this.rdiffemi, this.gdiffemii, this.bdiffemi, this.adiffemi);



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

        this.scene.materiais[this.idmaterial].setSpecular(this.rspecemi, this.gspecemi, this.bspecemi, this.aspecemi);



        /*************************** shininess material ***************************/

        var shinemi = materiais[i].getElementsByTagName('shininess');
        if (shinemi == null) {
            return "shininess' element in materials is missing."
        }
        var shinemi2 = shinemi[0];
        this.rshinemi = this.reader.getFloat(shinemi2, "value", true);
        this.scene.materiais[this.idmaterial].setShininess(this.rshinemi)

    }
    console.log(this.scene.materiais);
};


/******************************************* transformations ***************************************/
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

    for (var i = 0; i < trans3.length; i++) {

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

        var arrayTranslateTransformations = [];
        var arrayRotateTransformations = [];
        var arrayScaleTransformations = [];
        var no = new Node();

        // if (i == 0) {

        this.idtrans = this.reader.getString(trans3[i], "id", true);
        arrayTransformations.push([this.idtrans]);
        // }
        //
        // if (i > 0) {
        //     for (var j = 0; j < arrayTransformations.length; j++) {
        //         var resultTransformations = [];
        //         var secondidTransf = this.reader.getString(trans3[i], "id", true);
        //         var transformationsID = arrayTransformations[j][0].localeCompare(secondidTransf);
        //         resultTransformations.push(transformationsID);
        //         if(transformationsID == 0){
        //             break;
        //         }
        //     }
        //     for (var y = 0; y < resultTransformations.length; y++) {
        //         if (resultTransformations[y] == 0) {
        //             console.log("id of Transformations: " + secondidTransf + " must be different from the other ones. " +
        //                 " A new random id will be applied : " + secondidTransf + i);
        //             //this.idtrans = this.reader.getString(trans3[i], "id", true);
        //             arrayTransformations.push([this.idtrans + i]);
        //             break;
        //         } else {
        //             this.idtrans = this.reader.getString(trans3[i], "id", true);
        //             arrayTransformations.push([this.idtrans]);
        //         }
        //     }
        // }

        /*************************** translate ***************************/

        if (transla.length !== 0) {
            var matrix = [];
            var translation = transla[0];
            this.xtransl = this.reader.getFloat(translation, "x", true);
            this.ytransl = this.reader.getFloat(translation, "y", true);
            this.ztransl = this.reader.getFloat(translation, "z", true);
            arrayTranslateTransformations.push(1,this.xtransl, this.ytransl, this.ztransl);
            arrayTransformations[i].push(arrayTranslateTransformations);

            matrix.push(this.xtransl, this.ytransl, this.ztransl);
            mat4.translate(no.matrix, no.matrix, matrix);
        }

        /*************************** rotate ***************************/

        if (rota.length !== 0) {
            var rotation = rota[0];
            var matrix12 = [];
            this.rotaxis = this.reader.getString(rotation, "axis", true);
            this.rotangle = this.reader.getFloat(rotation, "angle", true);
            arrayRotateTransformations.push(2,this.rotaxis, this.rotangle);
            arrayTransformations[i].push(arrayRotateTransformations);

            if (this.rotaxis == 'x') {
                matrix12 = [1, 0, 0];
            }
            if (this.rotaxis == 'y') {
                matrix12 = [0, 1, 0];
            }

            if (this.rotaxis == 'z') {
                matrix12 = [0, 0, 1];
            }

            this.rotangle = this.rotangle2 * Math.PI / 180;
            mat4.rotate(no.matrix, no.matrix, this.rotangle, matrix12)

        }

        /*************************** scale ***************************/

        if (sca.length !== 0) {
            var scale = sca[0];
            this.xscale = this.reader.getFloat(scale, "x", true);
            this.yscale = this.reader.getFloat(scale, "y", true);
            this.zscale = this.reader.getFloat(scale, "z", true);
            arrayScaleTransformations.push(3,this.xscale, this.yscale, this.zscale);
            arrayTransformations[i].push(arrayScaleTransformations);
            var matrix1 = [];
            matrix1.push(this.xscale2, this.yscale2, this.zscale2);
            mat4.scale(no.matrix, no.matrix, matrix1)
        }
    }
};


/************************************** primitives *************************************************/
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


    for (var i = 0; i < prims3.length; i++) {


        if (i == 0) {
            this.idprims = this.reader.getString(prims3[i], "id", true);
            arrayPrimitives.push([this.idprims]);
        }
        if (i > 0) {
            for (var j = 0; j < arrayPrimitives.length; j++) {
                var result = [];
                this.secondid = this.reader.getString(prims3[i], "id", true);
                var resultado = arrayPrimitives[j][0].localeCompare(this.secondid);
                result.push(resultado);
                if(resultado == 0){
                    break;
                }
            }
            for (var y = 0; y < result.length; y++) {
                if (result[y] == 0) {
                    console.log("id of Primitive: " + this.secondid + " must be different from the other ones. " +
                        " A new random id will be applied : " + this.secondid + i);
                    arrayPrimitives.push([this.secondid + i]);
                    break;
                } else {
                    this.idprims = this.reader.getString(prims3[i], "id", true);
                    arrayPrimitives.push([this.idprims]);
                }
            }
        }
        var rect = prims3[i].getElementsByTagName('rectangle');
        var tri = prims3[i].getElementsByTagName('triangle');
        var cyl = prims3[i].getElementsByTagName('cylinder');
        var sphe = prims3[i].getElementsByTagName('sphere');
        var tor = prims3[i].getElementsByTagName('torus');

        var arrayRectanglePrimitives = [];
        var arrayTrianglePrimitives = [];
        var arrayCylinderPrimitives = [];
        var arraySpherePrimitives = [];
        var arrayTorusPrimitives = [];

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
            arrayRectanglePrimitives.push(this.x1rect, this.ylrect, this.x2rect, this.y2rect);
            arrayPrimitives[i].push(arrayRectanglePrimitives);

            this.scene.primitivas[this.idprims] = new MyRectangle(this.scene, this.x1rect, this.ylrect, this.x2rect, this.y2rect);
            this.scene.grafo[this.idprims] = new Node();
            this.scene.grafo[this.idprims].setType("rectangle");
            this.scene.grafo[this.idprims].setArgs(arrayPrimitives[i]);
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

            arrayTrianglePrimitives.push(this.x1tri, this.yltri, this.zltri, this.x2tri, this.y2tri, this.z2tri, this.x3tri, this.y3tri, this.z3tri);
            arrayPrimitives[i].push(arrayTrianglePrimitives);

            this.scene.primitivas[this.idprims] = new MyTriangle(this.scene, this.x1tri, this.yltri, this.zltri, this.x2tri, this.y2tri, this.z2tri, this.x3tri, this.y3tri, this.z3tri);
            this.scene.grafo[this.idprims] = new Node();
            this.scene.grafo[this.idprims].setType("triangle");
            this.scene.grafo[this.idprims].setArgs(arrayPrimitives[i]);
        }

        /*************************** cylinder ***************************/

        if (( (tri.length && rect.length && sphe.length && tor.length) == 0) && cyl.length == 1) {
            var cyl2 = cyl[0];
            this.cylbase = this.reader.getFloat(cyl2, "base", true);
            this.cyltop = this.reader.getFloat(cyl2, "top", true);
            this.cylheight = this.reader.getFloat(cyl2, "height", true);
            this.cylslices = this.reader.getInteger(cyl2, "slices", true);
            this.cylstacks = this.reader.getInteger(cyl2, "stacks", true);

            arrayCylinderPrimitives.push(this.cylbase, this.cyltop, this.cylheight, this.cylslices, this.cylstacks);
            arrayPrimitives[i].push(arrayCylinderPrimitives);

            this.scene.primitivas[this.idprims] = new MyCylinder(this.scene, this.cylheight, this.cylbase, this.cyltop, this.cylstacks, this.cylslices);
            this.scene.grafo[this.idprims] = new Node();
            this.scene.grafo[this.idprims].setType("cylinder");
            this.scene.grafo[this.idprims].setArgs(arrayPrimitives[i]);
        }

        /*************************** sphere ***************************/

        if (( (tri.length && cyl.length && rect.length && tor.length) == 0) && sphe.length == 1) {
            var sphe2 = sphe[0];
            this.spheradius = this.reader.getFloat(sphe2, "radius", true);
            this.spheslices = this.reader.getInteger(sphe2, "slices", true);
            this.sphestacks = this.reader.getInteger(sphe2, "stacks", true);
            arraySpherePrimitives.push(this.spheradius, this.spheslices, this.sphestacks);
            arrayPrimitives[i].push(arraySpherePrimitives);

            this.scene.primitivas[this.idprims] = new MySphere(this.scene, this.spheradius, this.sphestacks, this.spheslices);
            this.scene.grafo[this.idprims] = new Node();
            this.scene.grafo[this.idprims].setType("sphere");
            this.scene.grafo[this.idprims].setArgs(arrayPrimitives[i]);
        }

        /*************************** torus ***************************/

        if (( (tri.length && cyl.length && sphe.length && rect.length) == 0) && tor.length == 1) {
            var tor2 = tor[0];
            this.torinner = this.reader.getFloat(tor2, "inner", true);
            this.torouter = this.reader.getFloat(tor2, "outer", true);
            this.torslices = this.reader.getInteger(tor2, "slices", true);
            this.torloops = this.reader.getInteger(tor2, "loops", true);
            arrayTorusPrimitives.push(this.torinner, this.torouter, this.torslices, this.torloops);
            arrayPrimitives[i].push(arrayTorusPrimitives);

            this.scene.primitivas[this.idprims] = new MyTorus(this.scene, this.torinner, this.torouter, this.torslices, this.torloops);
            this.scene.grafo[this.idprims] = new Node();
            this.scene.grafo[this.idprims].setType("torus");
            this.scene.grafo[this.idprims].setArgs(arrayPrimitives[i]);
        }

        if ((tri.length || cyl.length || sphe.length || sphe.length || tor.length) > 1) {
            console.log("more than one primitive defined in primitive tag. not allowed");
        }
    }
};


/**************************************** components **********************************************/

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
        console.warn( "'component' element in components is missing." + "  NOT ALLOWED");
    }

    //falta aqui dar erro


    var arrayComponentComponents = [];


    for (var i = 0; i < comps3.length; i++) {

        var no = new Node();

        this.idcomps = this.reader.getString(comps3[i], "id", true);
        arrayComponentComponents.push([this.idcomps]);

        var arrayTransformationRefComponents = [];
        var arrayTransformationTranslateComponents = [];
        var arrayTransformationRotateComponents = [];
        var arrayTransformationScaleComponents = [];
        var arrayMaterialsComponents = [];
        var arrayTextureComponents = [];


        /*************************** transformation ***************************/

        var tran = comps3[i].getElementsByTagName('transformation');
        if (tran == null || tran.length == 0) {
            console.warn("'transformation' element in component: " + this.idcomps + " is missing." + "  NOT ALLOWED");
        }
        if (tran.length != 1) {
            return "either zero or more than one 'transformations' element found in component declaration.";
        }
        var variableTranformation = tran[0];
        var transformationRef = variableTranformation.getElementsByTagName('transformationref');
        var transl = variableTranformation.getElementsByTagName('translate');
        var rot = variableTranformation.getElementsByTagName('rotate');
        var scal2 = variableTranformation.getElementsByTagName('scale');

        // se a tranformacao tiver sido referenciada id no array : 1
        // para conjunto de transformacoes na hora id : 2
        //translate : [2,1]
        //rotate : [2,2]
        //scale : [2,3]
        if (transformationRef.length !== 0) // caso haja transformationref
        {
            if ((transl.length && rot.length & scal2.length) == 0) {
                var tran4 = transformationRef[0];
                this.idtran = this.reader.getString(tran4, "id", true);
                arrayTransformationRefComponents.push(1, this.idtran);
                arrayComponentComponents[i].push(arrayTransformationRefComponents);
            }
            else if ( (transformationRef.length !== 0) && (transl.length && rot.length & scal2.length !== 0) ){
                console.log("is allowed only one type of tranformation in component: " + this.idcomps + ". choose one  ");
            }
        }
        if (transformationRef.length == 0 && transl.length == 0 && rot.length == 0 && scal2.length == 0) {
            console.warn("in transformation tag inside component :" + this.idcomps + " you need to put one type of transformation.  "
                + "the default transformation will be applied: translate x = 0 , y = 0 , z = 0");
            this.xtranslate2 = 0;
            this.ytranslate2 = 0;
            this.ztranslate2 = 0;
            var matrix11 = [];
            arrayTransformationTranslateComponents.push(2, 1, this.xtranslate2, this.ytranslate2, this.ztranslate2);
            arrayComponentComponents[i].push(arrayTransformationTranslateComponents);
            matrix11.push(this.xtranslate2, this.ytranslate2, this.ztranslate2);
            mat4.translate(no.matrix, no.matrix, matrix11);
        } else {

            /*************************** translate ***************************/

            var transl2 = transl[0];

            if (transl.length !== 0) {
                var matrix = [];
                this.xtranslate2 = this.reader.getFloat(transl2, "x", true);
                this.ytranslate2 = this.reader.getFloat(transl2, "y", true);
                this.ztranslate2 = this.reader.getFloat(transl2, "z", true);
                arrayTransformationTranslateComponents.push(2, [1, this.xtranslate2, this.ytranslate2, this.ztranslate2]);
                arrayComponentComponents[i].push(arrayTransformationTranslateComponents);

                matrix.push(this.xtranslate2, this.ytranslate2, this.ztranslate2);
                mat4.translate(no.matrix, no.matrix, matrix);

            }

            /*************************** rotate ***************************/

            var rot2 = rot[0];
            if (rot.length !== 0) {

                var matrix12 = [];

                this.rotaxis2 = this.reader.getString(rot2, "axis", true);
                this.rotangle2 = this.reader.getFloat(rot2, "angle", true);
                arrayTransformationRotateComponents.push(2, 2, this.rotaxis2, this.rotangle2);
                arrayComponentComponents[i].push(arrayTransformationRotateComponents);

                if (this.rotaxis2 == 'x') {
                    matrix12 = [1, 0, 0];
                }
                if (this.rotaxis2 == 'y') {
                    matrix12 = [0, 1, 0];
                }

                if (this.rotaxis2 == 'z') {
                    matrix12 = [0, 0, 1];
                }

                this.rotangle2 = this.rotangle2 * Math.PI / 180;
                mat4.rotate(no.matrix, no.matrix, this.rotangle2, matrix12)

            }
            /*************************** scale ***************************/

            var scal3 = scal2[0];
            if (scal2.length !== 0) {
                this.xscale2 = this.reader.getFloat(scal3, "x", true);
                this.yscale2 = this.reader.getFloat(scal3, "y", true);
                this.zscale2 = this.reader.getFloat(scal3, "z", true);
                arrayTransformationScaleComponents.push(2, 3, this.xscale2, this.yscale2, this.zscale2);
                arrayComponentComponents[i].push(arrayTransformationScaleComponents);

                var matrix1 = [];
                matrix1.push(this.xscale2, this.yscale2, this.zscale2);
                mat4.scale(no.matrix, no.matrix, matrix1)

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
            arrayComponentComponents[i].push(arrayMaterialsComponents);
            no.setMaterial(this.idmat);
        } else {
            var arrayMateriaisTodosComponentes = [];

            for (var j = 0; j < mat3.length; j++) {
                this.idmat = this.reader.getString(mat3[j], "id", true);
                arrayMateriaisTodosComponentes.push(this.idmat);

            }
            arrayComponentComponents[i].push(arrayMateriaisTodosComponentes);

            no.setMaterial(this.idmat);
        }

        /*************************** texture ***************************/

        var tex = comps3[i].getElementsByTagName('texture');
        if (tex.length != 1) {
            return "either zero or more than one 'texture' element found in component declaration.";
        }
        if (tex == null || tex.length == 0) {
            console.warn("you need to declare at least one texture in component: " + this.idcomps + "" +
                " default texture will be applied: inherit");
            this.idtex = "inherit";
            arrayTextureComponents.push(this.idtex);
            arrayComponentComponents[i].push(arrayTextureComponents);
            no.setTexture(this.idtex);
        } else {
            var tex2 = tex[0];
            this.idtex = this.reader.getString(tex2, "id", true);
            arrayTextureComponents.push(this.idtex);
            arrayComponentComponents[i].push(arrayTextureComponents);
            no.setTexture(this.idtex);

        }

        /*************************** children ***************************/


        var child = comps3[i].getElementsByTagName('children');
        if (child.length == 0) {
            console.warn("'children' element in component: " + this.idcomps + " is missing in component. NOT ALLWOED.");
        }
        var child2 = child[0];
        var componentrefChildren = child2.getElementsByTagName('componentref');
        if (componentrefChildren.length == 0) {
            console.warn("'componentref' element in children(component:" + this.idcomps + ") is missing.");
        }
        var arrayChildrenRefPrimComp = [];
        var arrayChildrenRefPrimComp2 = [];

        var arrayChildrenRefCompComp2 = [];
        //id : 1
        if (componentrefChildren.length !== 0) {
            for (var k = 0; k < componentrefChildren.length; k++) {
                this.componentrefidchildren = this.reader.getString(componentrefChildren[k], "id", true);
                arrayChildrenRefCompComp2.push(this.componentrefidchildren);
                no.push(this.componentrefidchildren);
            }
        }

        var primitiverefCholdren = child2.getElementsByTagName('primitiveref');
        if (primitiverefCholdren.length == 0) {
            console.warn("'primitiveref' element in children(component:" + this.idcomps + ") is missing.");
        }
        //id : 2
        if (primitiverefCholdren.length !== 0) {
            for (var l = 0; l < primitiverefCholdren.length; l++) {
                this.primitiverefidchildren = this.reader.getString(primitiverefCholdren[l], "id", true);
                arrayChildrenRefPrimComp2.push(this.primitiverefidchildren);
                no.setPrimitives(this.primitiverefidchildren);

            }
            arrayChildrenRefPrimComp.push(2, arrayChildrenRefPrimComp2);
            arrayComponentComponents[i].push(arrayChildrenRefPrimComp);
        }
        this.scene.grafo[this.idcomps] = no;
    }
};

/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError=function (message) {
    console.error("XML Loading Error: "+message);
    this.loadedOk=false;
};


