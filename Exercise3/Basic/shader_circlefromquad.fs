precision mediump float;

// TODO 3.3)	Define a constant variable (uniform) to 
//              "send" the canvas size to all fragments.

uniform vec2 canvasSize;

void main(void)
{ 
	float smoothMargin = 0.01;  
	float r = 0.8;         
	 
	// TODO 3.3)	Map the fragment's coordinate (gl_FragCoord.xy) into 
	//				the range of [-1,1]. Discard all fragments outside the circle 
	//				with the radius r. Smooth the circle's edge within 
	//				[r-smoothMargin, r] by computing an appropriate alpha value.

	// gl_FragColor = vec4(1.0, 85.0 / 255.0, 0.0, 1.0);

	
	vec2 uv = 2.0 * gl_FragCoord.xy/canvasSize.xy - 1.0;

	float distence = sqrt((uv[0]) * (uv[0]) + (uv[1]) * (uv[1]));

	if (distence < r - smoothMargin){
		gl_FragColor = vec4(1.0, 85.0 / 255.0, 0.0, 1.0);
	}
	if(distence <= r && distence >= r-smoothMargin){
		gl_FragColor.a = (distence-(r-smoothMargin)) / smoothMargin;
		gl_FragColor.a = 1.0-gl_FragColor.a;
		gl_FragColor = vec4(1.0, 85.0 / 255.0, 0.0, gl_FragColor.a);
	}
	if (distence > r){
		discard;
	 }

	
}