/*
	recebe a posição inicial do dado e a posiçao final, e faz o movimento em volta do centro das duas posições
	o movimento é uma rotação que ocorre ao longo do eixo dos Zs
*/

function DadosAnimation(scene, initial_pos, chessboard_pos) {

	this.span = 3;
	Animation.call(this, scene, this.span);


	this.centre = chessboard_pos - initial_pos;
	this.radius = chessboard_pos - centre;
	this.start_angle = 0 * Math.PI/180;		//conversao para radianos
	this.rot_angle = Math.PI;

	this.final_angle = this.start_angle + this.rot_angle;
	this.delta_angle = this.final_angle / this.span;
	this.delta_x = Math.sin(this.start_angle)*this.radius;
	this.delta_z = Math.cos(this.start_angle)*this.radius;
	this.delta_time = 0;

	this.finished = 0;
	this.prevTime = -1;

	mat4.identity(this.matrix);
	mat4.translate(this.matrix, this.matrix, [this.centre[0] + this.delta_x, this.centre[1], this.centre[2] + this.delta_z]);
	mat4.rotate(this.matrix, this.matrix, this.start_angle, [0,0,1]);

	this.rotation = this.start_angle;
};
	
DadosAnimation.prototype = Object.create(Animation.prototype);
DadosAnimation.prototype.constructor = CircularAnimation;

/***********************************update das animaçoes*********************************/

DadosAnimation.prototype.update= function(currTime){

	if(this.prevTime < 0) {
		this.prevTime = currTime;
	}
	else {
		if(Math.abs(this.rotation) < Math.abs(this.final_angle)) {
			this.delta_time = (currTime - this.prevTime) / 1000; // tempo em milisegundos

			this.rotation += this.delta_angle * this.delta_time;
			
			this.delta_x = Math.sin(this.rotation)*this.radius;
			this.delta_z = Math.cos(this.rotation)*this.radius;

			mat4.identity(this.matrix);
			mat4.translate(this.matrix, this.matrix, [this.centre[0]+this.delta_x, this.centre[1], this.centre[2]+this.delta_z]);
			mat4.rotate(this.matrix, this.matrix, this.rotation, [0,0,1]);

			this.prevTime = currTime;
		}
		
		else {
			this.finished=1;
			return;
		}
		
	}
};




