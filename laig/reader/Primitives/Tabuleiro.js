/**
 * Created by Joel Carneiro on 12/11/2016.
 */
function Tabuleiro(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.arrayTiles = [];

    for (var i = 0; i < 5; i++) {
        this.arrayTiles.push([]);
        for (var j = 0; j < 5; j++) {
            this.arrayTiles[i].push(new Tile(this.scene, this.tabuleiro));
        }
    }

    this.dadoexp = new Peca(this.scene);


    this.um = new MyRectangle(scene, 0, 8, 8, 0);

    this.appearancedado1 = new CGFappearance(this.scene);
    this.n1 = new CGFtexture(this.scene, "./texturas/numero1.png");
    this.n2 = new CGFtexture(this.scene, "./texturas/numero2.png");
    this.n3 = new CGFtexture(this.scene, "./texturas/numero3.png");
    this.n4 = new CGFtexture(this.scene, "./texturas/numero4.png");
    this.n5 = new CGFtexture(this.scene, "./texturas/numero5.png");
    this.n6 = new CGFtexture(this.scene, "./texturas/numero6.png");

    this.esquerdo = new Cubo(scene);
    this.direito = new Cubo(scene);
    this.frente = new Cubo(scene);
    this.tras = new Cubo(scene);
    this.baixo = new Cubo(scene);

    this.recEsq = new MyRectangle(scene, 0, 1, 1, 0);
    this.recDir = new MyRectangle(scene, 0, 1, 1, 0);

    this.ladosAppearance = new CGFappearance(this.scene);
    this.ladosAppearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.ladosAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.ladosAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.ladosAppearance.setShininess(8.8);
    this.ladosAppearance.setEmission(0, 0, 0.0, 1);
    this.ladosAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.ladosAppearance.loadTexture("./texturas/madeiracena.png");

    this.pecaappearance = new CGFappearance(this.scene);
    this.pecaappearance.setAmbient(0.9, 0.5, 0.0, 1);
    this.pecaappearance.setDiffuse(0.6, 0.4, 0.0, 1);
    this.pecaappearance.setSpecular(0.6, 0.4, 0.0, 1);
    this.pecaappearance.setShininess(0.9);
    this.pecaappearance.setEmission(0, 0, 0.0, 1);

    this.pecaappearance2 = new CGFappearance(this.scene);
    this.pecaappearance2.setAmbient(0.0, 0.2, 1, 1);
    this.pecaappearance2.setDiffuse(0.0, 0.2, 0.6, 1);
    this.pecaappearance2.setSpecular(0.0, 0.2, 0.6, 1);
    this.pecaappearance2.setShininess(0.8);
    this.pecaappearance2.setEmission(0, 0, 0.0, 1);

    this.initBuffers();
}

Tabuleiro.prototype = Object.create(CGFobject.prototype);
Tabuleiro.prototype.constructor = Tabuleiro;

Tabuleiro.prototype.initBuffers = function () {
};

Tabuleiro.prototype.updateTexCoords = function (length_S, length_T) {
};

Tabuleiro.prototype.verificaDado = function (i, j, k) {

    if (this.scene.escolhido == k && this.scene.dadoescolhido == 51) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 1, 1);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 52) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 1, 2);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 53) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 1, 3);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 54) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 1, 4);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 55) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 1, 5);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 56) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 1, 6);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 57) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 2, 1);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 58) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 2, 2);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 59) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 2, 3);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 60) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 2, 4);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 61) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 2, 5);
    }
    if (this.scene.escolhido == k && this.scene.dadoescolhido == 62) {
        this.arrayTiles[i][j].setTilePeca(this.dadoexp, 2, 6);
    }


};


Tabuleiro.prototype.isValidPositionForSelection = function (i, j) {
    if (this.arrayTiles[i][j].getTilePeca() != 0) {
        if (this.scene.state == 1) {//quando escolheu a casa
            if (this.i + 1 == i && this.j == j || this.i + 1 == i && this.j + 1 == j || this.i + 1 == i && this.j - 1 == j
                || this.i == i && this.j + 1 == j || this.i == i && this.j - 1 == j
                || this.i - 1 == i && this.j == j || this.i - 1 == i && this.j + 1 == j || this.i - 1 == i && this.j - 1 == j) {
                if (0 < i < 4 && j == 0) {
                    console.log(i + "----------" + j);

                    if (this.somaDadoFundo(i, j) < 7)
                        return 2;
                }
                // else if (0 < i < 4 && j == 4) {
                //     console.log(i + "----------" + j);
                //
                //     if (this.somaDadoTopo(i, j) < 7)
                //         return 2;
                // }
                // else if (0 < i < 4 && j == 4) {
                //     console.log(i + "----------" + j);
                //
                //     if (this.somaDadoDireita(i, j) < 7)
                //         return 2;
                // }
                // else if (0 < j < 4 && i == 0) {
                //     console.log(i + "----------" + j);
                //     if (this.somaDadoEsquerda(i, j) < 7)
                //         return 2;
                // }
                // else if (j == 0 && i == 4) {
                //     if (this.somaCasaFundoEsquerdo(i, j) < 7)
                //         return 2;
                // }
                // else if (j == 0 && i == 0) {
                //     if (this.somaCasaTopoEsquerdo(i, j) < 7)
                //         return 2;
                // }
                // else if (j == 4 && i == 4) {
                //     if (this.somaCasaFundoDireito(i, j) < 7)
                //         return 2;
                // }
                // else if (j == 4 && i == 0) {
                //     if (this.somaCasaTopoDireito(i, j) < 7)
                //         return 2;
                // }
                // else {
               // else if (this.somaDado(i, j) < 7)
               //      return 2;
                // }
            }

            if ((this.i + 2 == i && this.j == j || this.i + 2 == i && this.j + 2 == j || this.i + 2 == i && this.j + 1 == j || this.i + 2 == i && this.j - 2 == j || this.i + 2 == i && this.j - 1 == j
                || this.i - 2 == i && this.j == j || this.i - 2 == i && this.j + 2 == j || this.i - 2 == i && this.j + 1 == j || this.i - 2 == i && this.j - 2 == j || this.i - 2 == i && this.j - 1 == j)) {

                if (0 < i < 4 && j == 0) {
                    console.log(i + "----------" + j);

                    if (this.somaDadoFundo(i, j) < 7)
                        return 2;
                }
                // else if (this.somaDado(i, j) < 7)
                //     return 2;
                // }
            }

        } else if (this.scene.state == -1) {//quando ja escolheu o dado

            if (this.i + 2 == i && this.j == j || this.i + 2 == i && this.j + 2 == j || this.i + 2 == i && this.j + 1 == j || this.i + 2 == i && this.j - 2 == j || this.i + 2 == i && this.j - 1 == j
                || this.i == i && this.j + 2 == j || this.i == i && this.j - 2 == j || this.i + 1 == i && this.j + 2 == j || this.i + 1 == i && this.j - 2 == j || this.i - 1 == i && this.j + 2 == j || this.i - 1 == i && this.j - 2 == j
                || this.i - 2 == i && this.j == j || this.i - 2 == i && this.j + 2 == j || this.i - 2 == i && this.j + 1 == j || this.i - 2 == i && this.j - 2 == j || this.i - 2 == i && this.j - 1 == j) {
                if (this.somaDado(i, j) < 7) {
                    if (this.somaDado(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
                        this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j + 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j + 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j + 1].setTilePeca(null, this.scene.player, 0);
                    }
                }

            }
			
            else if (0 < i < 4 && j == 0) { 
				if(this.deleteDadosEsquerda(i, j)) 
                if (this.somaDadoEsquerda(i, j) < 7)
                    if (this.somaDadoEsquerda(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
                        this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j + 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j + 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j + 1].setTilePeca(null, this.scene.player, 0);
                    }
            }
			
            else if (0 < i < 4 && j == 4 )  { 
				if(this.deleteDadosDireita(i, j)) 
                if (this.somaDadoDireita(i, j) < 7)
                    if (this.somaDadoDireita(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
                        this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j - 1].setTilePeca(null, this.scene.player, 0);
                    }
            }
			
            else if  (0 < i < 4 && j == 0  ) {
				if(this.deleteDadosFundo(i, j))
                if (this.somaDadoFundo(i, j) < 7)
                    if (this.somaDadoFundo(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
                        this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j + 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j + 1].setTilePeca(null, this.scene.player, 0);
                    }
            }
            else if ( 0 < j < 4 && i == 4 ) {
				if(this.deleteDadosTopo(i, j))
                if (this.somaDadoTopo(i, j) < 7)
                    if (this.somaDadoTopo(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
                        this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j + 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j + 1].setTilePeca(null, this.scene.player, 0);
                    }
            }
            else if (j == 0 && i == 4 ) {
				if(this.deleteFundoEsquerdo(i, j))
                if (this.somaCasaFundoEsquerdo(i, j) < 7)
                    if (this.somaCasaFundoEsquerdo(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
                        this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j + 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j + 1].setTilePeca(null, this.scene.player, 0);
                    }
            }
            else if (j == 0 && i == 0) {
				if(this.deleteTopoEsquerdo(i, j))
                if (this.somaCasaTopoEsquerdo(i, j) < 7)
                    if (this.somaCasaTopoEsquerdo(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
                        this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j + 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j + 1].setTilePeca(null, this.scene.player, 0);
                    }
            }
            else if (j == 4 && i == 4) {
				if(this.deleteFundoDireito(i, j))
                if (this.somaCasaFundoDireito(i, j) < 7)
                    if (this.somaCasaFundoDireito(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
                        this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i + 1][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j - 1].setTilePeca(null, this.scene.player, 0);
                    }
            }
            else if (j == 4 && i == 0) {
				if(this.deleteTopoDireito(i, j))
                if (this.somaCasaTopoDireito(i, j) < 7)
                    if (this.somaCasaTopoDireito(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
                        this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i - 1][j - 1].setTilePeca(null, this.scene.player, 0);
                        this.arrayTiles[i][j - 1].setTilePeca(null, this.scene.player, 0);
                    }
            }
            // else if (( this.arrayTiles[i - 1][j].getTilePeca() && this.arrayTiles[i - 1][j + 1].getTilePeca() || this.arrayTiles[i - 1][j + 1].getTilePeca() && this.arrayTiles[i][j + 1].getTilePeca()
            //     || this.arrayTiles[i][j + 1].getTilePeca() && this.arrayTiles[i + 1][j + 1].getTilePeca() || this.arrayTiles[i + 1][j + 1].getTilePeca() && this.arrayTiles[i + 1][j].getTilePeca()
            //     || this.arrayTiles[i + 1][j].getTilePeca() && this.arrayTiles[i + 1][j - 1].getTilePeca() || this.arrayTiles[i + 1][j - 1].getTilePeca() && this.arrayTiles[i][j - 1].getTilePeca()
            //     || this.arrayTiles[i][j - 1].getTilePeca() && this.arrayTiles[i - 1][j - 1].getTilePeca() || this.arrayTiles[i - 1][j - 1].getTilePeca() && this.arrayTiles[i - 1][j].getTilePeca() ) != 0
            // ) {
            //
            //     if (this.somaDado(i, j) < 7) {
            //         if (this.somaDado(i, j) == this.arrayTiles[this.i][this.j].getTilePeca()) {
            //             if (this.scene.player == 1) {
            //                 this.scene.scorep1 += this.arrayTiles[this.i][this.j].getTilePeca() * 100;
            //             } else if (this.scene.player == 2) {
            //                 this.scene.scorep2 += this.arrayTiles[this.i][this.j].getTilePeca() * 100;
            //             }
            //             this.arrayTiles[i][j].setTilePeca(null, this.scene.player, 0);
            //             this.arrayTiles[i - 1][j].setTilePeca(null, this.scene.player, 0);
            //             this.arrayTiles[i + 1][j].setTilePeca(null, this.scene.player, 0);
            //             this.arrayTiles[i][j + 1].setTilePeca(null, this.scene.player, 0);
            //             this.arrayTiles[i][j - 1].setTilePeca(null, this.scene.player, 0);
            //             this.arrayTiles[i - 1][j + 1].setTilePeca(null, this.scene.player, 0);
            //             this.arrayTiles[i - 1][j - 1].setTilePeca(null, this.scene.player, 0);
            //             this.arrayTiles[i + 1][j - 1].setTilePeca(null, this.scene.player, 0);
            //             this.arrayTiles[i + 1][j + 1].setTilePeca(null, this.scene.player, 0);
            //
            //         }
            //         console.log("player 1 score");
            //         console.log(this.scene.scorep1);
            //         console.log("player 2 score");
            //         console.log(this.scene.scorep2);
            //     }
            //
            // }
        }
    } else
        return false;
};

Tabuleiro.prototype.display = function () {

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            var k = i * 5 + j;
            this.scene.pushMatrix();
            this.scene.registerForPick(k, this.arrayTiles[i][j]);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.translate(12 - 8 * i, -20 + 8 * j, 2);


            this.verificaDado(i, j, k);


            if (this.scene.escolhido == k) {

                this.arrayTiles[i][j].display(true, 1);
                this.i = i;
                this.j = j;
            }
            else if ((i + j) % 2 == 0) {
                this.arrayTiles[i][j].display(true, this.isValidPositionForSelection(i, j));
            } else {
                this.arrayTiles[i][j].display(false, this.isValidPositionForSelection(i, j));
            }
            this.scene.popMatrix();
        }
    }


    this.numerosTabuleiro();
    this.ladosTabuleiro();


};

Tabuleiro.prototype.somaDado = function (i, j) {

    return (this.arrayTiles[i][j].getTilePeca() + this.arrayTiles[i - 1][j].getTilePeca() + this.arrayTiles[i + 1][j].getTilePeca() + this.arrayTiles[i][j + 1].getTilePeca() + this.arrayTiles[i][j - 1].getTilePeca()
        + this.arrayTiles[i - 1][j + 1].getTilePeca() + this.arrayTiles[i - 1][j - 1].getTilePeca() + this.arrayTiles[i + 1][j + 1].getTilePeca() + this.arrayTiles[i + 1][j - 1].getTilePeca())
        - this.arrayTiles[this.i][this.j].getTilePeca();
};
Tabuleiro.prototype.somaDadoEsquerda = function (i, j) {
    return (this.arrayTiles[i][j].getTilePeca() + this.arrayTiles[i][j+1].getTilePeca() + this.arrayTiles[i + 1][j].getTilePeca() + this.arrayTiles[i +1 ][j + 1].getTilePeca() + this.arrayTiles[i + 1][j - 1].getTilePeca()
        + this.arrayTiles[i][j - 1].getTilePeca())
        - this.arrayTiles[this.i][this.j].getTilePeca();
};
Tabuleiro.prototype.somaDadoDireita = function (i, j) {
    return (this.arrayTiles[i][j].getTilePeca() + this.arrayTiles[i-1][j+1].getTilePeca() + this.arrayTiles[i - 1][j].getTilePeca() + this.arrayTiles[i - 1 ][j - 1].getTilePeca() + this.arrayTiles[i][j - 1].getTilePeca()
        + this.arrayTiles[i][j + 1].getTilePeca())
        - this.arrayTiles[this.i][this.j].getTilePeca();
};
Tabuleiro.prototype.somaDadoTopo = function (i, j) {
    return (this.arrayTiles[i][j].getTilePeca() + this.arrayTiles[i + 1][j].getTilePeca() + this.arrayTiles[i][j - 1].getTilePeca() + this.arrayTiles[i + 1][j - 1].getTilePeca() + this.arrayTiles[i -1][j - 1].getTilePeca()
        + this.arrayTiles[i - 1][j].getTilePeca())
        - this.arrayTiles[this.i][this.j].getTilePeca();
};
Tabuleiro.prototype.somaDadoFundo = function (i, j) {
    return (this.arrayTiles[i][j].getTilePeca() + this.arrayTiles[i + 1][j].getTilePeca() + this.arrayTiles[i][j + 1].getTilePeca() + this.arrayTiles[i + 1][j + 1].getTilePeca() + this.arrayTiles[i - 1][j + 1].getTilePeca()
        + this.arrayTiles[i - 1][j].getTilePeca())
        - this.arrayTiles[this.i][this.j].getTilePeca();
};
Tabuleiro.prototype.somaCasaTopoEsquerdo = function (i, j) {
    return (this.arrayTiles[i][j].getTilePeca() + this.arrayTiles[i + 1][j].getTilePeca() + this.arrayTiles[i + 1][j - 1].getTilePeca() + this.arrayTiles[i][j - 1].getTilePeca() )
        - this.arrayTiles[this.i][this.j].getTilePeca();
};
Tabuleiro.prototype.somaCasaTopoDireito = function (i, j) {
    return (this.arrayTiles[i][j].getTilePeca() + this.arrayTiles[i][j - 1].getTilePeca() + this.arrayTiles[i - 1][j - 1].getTilePeca() + this.arrayTiles[i - 1][j].getTilePeca() )
        - this.arrayTiles[this.i][this.j].getTilePeca();
};
Tabuleiro.prototype.somaCasaFundoDireito = function (i, j) {
    return (this.arrayTiles[i][j].getTilePeca() + this.arrayTiles[i][j + 1].getTilePeca() + this.arrayTiles[i - 1][j + 1].getTilePeca() + this.arrayTiles[i - 1][j].getTilePeca() )
        - this.arrayTiles[this.i][this.j].getTilePeca();
};
Tabuleiro.prototype.somaCasaFundoEsquerdo = function (i, j) {
    return (this.arrayTiles[i][j].getTilePeca() + this.arrayTiles[i][j + 1].getTilePeca() + this.arrayTiles[i + 1][j + 1].getTilePeca() + this.arrayTiles[i + 1][j].getTilePeca() )
        - this.arrayTiles[this.i][this.j].getTilePeca();
};

Tabuleiro.prototype.deleteDadosTopo = function (i, j) {

    if ((this.arrayTiles[i + 1][j].getTilePeca() && this.arrayTiles[i + 1][j + 1].getTilePeca() || this.arrayTiles[i + 1][j + 1].getTilePeca() && this.arrayTiles[i][j + 1].getTilePeca()
        || this.arrayTiles[i][j - 1].getTilePeca() && this.arrayTiles[i + 1][j - 1].getTilePeca() || this.arrayTiles[i + 1][j - 1].getTilePeca() && this.arrayTiles[i + 1][j].getTilePeca() ) != 0)
        return true
};
Tabuleiro.prototype.deleteDadosEsquerda = function (i, j) {
    if ((this.arrayTiles[i - 1][j].getTilePeca() && this.arrayTiles[i - 1][j + 1].getTilePeca() || this.arrayTiles[i - 1][j + 1].getTilePeca() && this.arrayTiles[i][j + 1].getTilePeca()
        || this.arrayTiles[i + 1][j + 1].getTilePeca() && this.arrayTiles[i][j + 1].getTilePeca() || this.arrayTiles[i + 1][j + 1].getTilePeca() && this.arrayTiles[i + 1][j].getTilePeca() ) != 0)
        return true
};
Tabuleiro.prototype.deleteDadosDireita = function (i, j) {
    if ((this.arrayTiles[i - 1][j].getTilePeca() && this.arrayTiles[i - 1][j - 1].getTilePeca() || this.arrayTiles[i - 1][j - 1].getTilePeca() && this.arrayTiles[i][j - 1].getTilePeca()
        || this.arrayTiles[i][j - 1].getTilePeca() && this.arrayTiles[i + 1][j - 1].getTilePeca() || this.arrayTiles[i + 1][j - 1].getTilePeca() && this.arrayTiles[i + 1][j].getTilePeca() ) != 0)
        return true
};
Tabuleiro.prototype.deleteDadosFundo = function (i, j) {
    if ((this.arrayTiles[i - 1][j].getTilePeca() && this.arrayTiles[i - 1][j + 1].getTilePeca() || this.arrayTiles[i - 1][j + 1].getTilePeca() && this.arrayTiles[i][j + 1].getTilePeca()
        || this.arrayTiles[i][j - 1].getTilePeca() && this.arrayTiles[i - 1][j - 1].getTilePeca() || this.arrayTiles[i - 1][j - 1].getTilePeca() && this.arrayTiles[i - 1][j].getTilePeca() ) != 0)
        return true
};
Tabuleiro.prototype.deleteFundoEsquerdo = function (i, j) {
    if ((this.arrayTiles[i - 1][j].getTilePeca() && this.arrayTiles[i - 1][j + 1].getTilePeca() || this.arrayTiles[i - 1][j + 1].getTilePeca() && this.arrayTiles[i][j + 1].getTilePeca() ) != 0)
        return true
};
Tabuleiro.prototype.deleteFundoDireito = function (i, j) {
    if ((this.arrayTiles[i - 1][j].getTilePeca() && this.arrayTiles[i - 1][j - 1].getTilePeca() || this.arrayTiles[i - 1][j - 1].getTilePeca() && this.arrayTiles[i][j - 1].getTilePeca() ) != 0)
        return true
};
Tabuleiro.prototype.deleteTopoDireito = function (i, j) {
    if ((this.arrayTiles[i][j - 1].getTilePeca() && this.arrayTiles[i + 1][j - 1].getTilePeca() || this.arrayTiles[i + 1][j - 1].getTilePeca() && this.arrayTiles[i + 1][j].getTilePeca() ) != 0)
        return true
};
Tabuleiro.prototype.deleteTopoEsquerdo = function (i, j) {
    if ((this.arrayTiles[i][j + 1].getTilePeca() && this.arrayTiles[i + 1][j + 1].getTilePeca() || this.arrayTiles[i + 1][j + 1].getTilePeca() && this.arrayTiles[i + 1][j].getTilePeca() ) != 0)
        return true
};

Tabuleiro.prototype.numerosTabuleiro = function () {

    this.scene.pushMatrix();
    this.pecaappearance.apply();
    this.appearancedado1.setTexture(this.n1);
    this.n1.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(20, -2, -30);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(51, this.um);
    this.um.display();
    this.n1.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n2);
    this.n2.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(10, -2, -30);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(52, this.um);
    this.um.display();
    this.n2.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n3);
    this.n3.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(0, -2, -30);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(53, this.um);
    this.um.display();
    this.n3.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n4);
    this.n4.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-10, -2, -30);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(54, this.um);
    this.um.display();
    this.n4.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n5);
    this.n5.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-20, -2, -30);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(55, this.um);
    this.um.display();
    this.n5.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n6);
    this.n6.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-30, -2, -38);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(56, this.um);
    this.um.display();
    this.n6.unbind();
    this.scene.popMatrix();


    //player 1
    this.scene.pushMatrix();
    this.pecaappearance2.apply();
    this.appearancedado1.setTexture(this.n1);
    this.n1.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(20, -2, 40);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(57, this.um);
    this.um.display();
    this.n1.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n2);
    this.n2.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(10, -2, 40);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(58, this.um);
    this.um.display();
    this.n2.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n3);
    this.n3.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(0, -2, 40);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(59, this.um);
    this.um.display();
    this.n3.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n4);
    this.n4.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-10, -2, 40);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(60, this.um);
    this.um.display();
    this.n4.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n5);
    this.n5.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-20, -2, 40);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(61, this.um);
    this.um.display();
    this.n5.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.appearancedado1.setTexture(this.n6);
    this.n6.bind();
    this.scene.scale(1, 1, 1);
    this.scene.translate(-30, -2, 32);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.registerForPick(62, this.um);
    this.um.display();
    this.n6.unbind();
    this.scene.popMatrix();
};
Tabuleiro.prototype.ladosTabuleiro = function () {

    //lados

//lado esquerdo
    this.scene.pushMatrix();
    this.ladosAppearance.apply();
    this.scene.scale(40, 3, 5);
    this.scene.translate(-0.5, 0, 4);
    this.esquerdo.display();
    this.scene.popMatrix();

//lado direito
    this.scene.pushMatrix();
    this.scene.scale(40, 3, 5);
    this.scene.translate(-0.5, 0, -5);
    this.direito.display();
    this.scene.popMatrix();

//lado tras
    this.scene.pushMatrix();
    this.scene.scale(5, 3, 50);
    this.scene.translate(-5, 0, -0.5);
    this.tras.display();
    this.scene.popMatrix();


//lado frente
    this.scene.pushMatrix();
    this.scene.scale(5, 3, 50);
    this.scene.translate(4, 0, -0.5);
    this.frente.display();
    this.scene.popMatrix();

//lado baixo
    this.scene.pushMatrix();
    this.scene.scale(40, 3, 40);
    this.scene.translate(-0.5, -1, -0.5);
    this.baixo.display();
    this.scene.popMatrix();

// recs

//rec esquerdo
    this.scene.pushMatrix();
    this.ladosAppearance.apply();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.translate(-25, -20, 3.1);
    this.scene.scale(5, 40, 1);
    this.recEsq.display();
    this.scene.popMatrix();

// rec direito
    this.scene.pushMatrix();
    this.ladosAppearance.apply();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.translate(20, -20, 3.1);
    this.scene.scale(5, 40, 1);
    this.recDir.display();
    this.scene.popMatrix();
};