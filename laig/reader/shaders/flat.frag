#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];
uniform vec4 cor1;
uniform vec4 cor2;
uniform vec4 cor3;
uniform vec2 dims;
uniform vec2 dimscs;
varying vec2 vTextureCoord;


void main() {

vec2 currentPosition = vec2(vTextureCoord[0] * dims[0], vTextureCoord[1] * dims[1]);
currentPosition = ceil(currentPosition);
        if( mod(currentPosition[0] + currentPosition[1],2.0) < 0.1 ){
        gl_FragColor = cor1 ;
        }else{
        gl_FragColor =  cor2 ;
        }
        if((currentPosition[0] == dimscs[0]) && (currentPosition[1] == dimscs[1]) ){
        gl_FragColor =  cor3 ;
        }



}