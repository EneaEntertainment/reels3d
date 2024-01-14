uniform mat4 pMatrix;
uniform mat4 mMatrix;

attribute vec3 aPosition;
attribute vec2 aUv;

varying vec2 vUv;

void main()
{
    vUv = aUv;

    gl_Position = pMatrix * mMatrix * vec4(aPosition, 1.0);
}