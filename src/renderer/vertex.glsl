#version 300 es

in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 aaPosition;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

out vec4 outputFrame;
out vec4 aaInputSize;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    aaPosition = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    vTextureCoord = filterTextureCoord();
    outputFrame = uOutputFrame;
    aaInputSize = uInputSize;
}