attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform vec4 cor1;
uniform vec4 cor2;
uniform vec4 cor3;
uniform vec2 dims;
uniform vec2 dimscs;

varying vec2 vTextureCoord;



void main() {
vec2 currentPosition = vec2(aTextureCoord[0] * dims[0], aTextureCoord[1] * dims[1]);
currentPosition = ceil(currentPosition);

 if( (currentPosition[0] == dimscs[0]) && (currentPosition[1] == dimscs[1]) ){
 gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition[0],aVertexPosition[1],aVertexPosition[2] + 0.1 , 1.0);

        }else{

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
	vTextureCoord = aTextureCoord;

}

