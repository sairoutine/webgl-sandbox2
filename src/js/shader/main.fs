precision mediump float;
uniform sampler2D uSampler;

uniform float uFighterX;
uniform float uFighterY;
uniform int uTime;
uniform bool uLight;

varying vec2 vTextureCoordinates;
varying vec4 vColor;

const int num = 8;
const int unitAngle = 360 / num;

vec2 getPosition(int unitAngle, int uTime, int i) {
	float ax = abs(mod(float(uTime*2), 240.0) - 120.0);
	float ay = abs(mod(float(uTime*3), 240.0) - 120.0);
	float rad = radians(float(unitAngle * i + uTime*8));
	float x = uFighterX + ax * cos(rad);
	float y = uFighterY + ay * sin(rad);
	return vec2(x, y);
}

void main() {
	vec4 textureColor = texture2D(uSampler, vTextureCoordinates);
	if(uLight) {
		float color = 0.0;
		for(int i = 0; i < num; i++) {
			vec2 pos = getPosition(unitAngle, uTime, i);
			float dist = length(gl_FragCoord.xy - pos) * 1.5;
			color += 5.0 / dist;
		}
		gl_FragColor = textureColor * vColor * vec4(vec3(color), 1.0);
	}
	else {
		gl_FragColor = textureColor * vColor;
	}
}

