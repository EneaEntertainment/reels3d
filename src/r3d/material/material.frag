uniform sampler2D uMap;

varying vec2 vUv;

void main()
{
    vec2 uv = vec2(1.0) - vUv; 

    vec4 sample = texture2D(uMap, uv);

    gl_FragColor = sample;
}