function LinearAnimation(scene, span, control_points) {

	Animation.call(this, scene, span);
	
	this.control_points = control_points; // vetor de movimento
	
	this.comprimento_segmentos = [];
	this.direcao_segmentos = [];
	this.tempo_segmentos = [];
	this.velocidade_segmentos = [];
	
	this.distancia_percorrida = 0;
	this.distancia_total = 0;
	this.tempo_decorrido = 0;
	
	this.velocidade_animacao = this.distancia_total / span;
	
	// calcula-se todas as variaveis de cada segmento
	for(var i=0; i < control_points.length-1; i++) {
		this.comprimento_segmentos[i] = this.calculaComprimentoSegmento(control_points[i], control_points[i+1]);
		this.tempo_segmentos[i] = this.comprimento_segmentos[i] / this.velocidade_animacao;
		this.velocidade_segmentos[i] = this.calculaVelocidadeSegmento(control_points[i], control_points[i+1], this.tempo_segmentos[i]);
		this.direcao_segmentos[i] = this.calculaDirecaoSegmento(control_points[i], control_points[i+1]);
	}
	
	// calcular a distancia total da animaçao, ou seja, o somatorio dos comprimentos de cada segmento
	for(var i=0; i < comprimento_segmentos.length; i++) {
		this.distancia_total += this.comprimento_segmentos[i];
	}
	
	
	/*****Colocar o objeto na posicao inicial*****/
	this.current_point = 1;
	this.current_direction = this.direcao_segmentos[0];
	this.tempo_do_segmento = 0;
	
	mat4.identify(this.matrix);
	mat4.translate(this.matrix, this.matrix, control_points(this.current_point-1));
	
	// direcionar o objeto apropriadamento segundo a direcao do movimento
	// roda-se sobre o eixo y para ficar paralelo ao 'chao'
    mat4.rotate(this.matrix,this.matrix,this.current_direction,[0,1,0]);
    
    this.dist_perc_x = control_point[this.current_point-1][0];
    this.dist_perc_y = control_point[this.current_point-1][1];
    this.dist_perc_z = control_point[this.current_point-1][2];
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

/************************funcoes de calculo de variaveis de segmentos*********************************/

LinearAnimation.prototype.calculaComprimentoSegmento = function(start, end) {
	var vetor = [];
	vetor[0] = end[0]-start[0];
	vetor[1] = end[1]-start[1];
	vetor[2] = end[2]-start[2];
	
	return Math.sqrt(Math.pow(vetor[0],2) + Math.pow(vetor[1],2), Math.pow(vetor[2],2))
};

LinearAnimation.prototype.calculaDirecaoSegmento = function(start, end) {
	return -Math.atan2((end[2]-start[2]),(end[0]-start[0]));
};

LinearAnimation.prototype.calculaVelocidadeSegmento = function(start, end, seg_time) {
	var vel_x = (end[0] - start[0]) / seg_time;
	var vel_y = (end[1] - start[1]) / seg_time;
	var vel_z = (end[2] - start[2]) / seg_time;
	
	return [vel_x, vel_y, vel_z];
};

