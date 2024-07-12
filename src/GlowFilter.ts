import { Filter, GlProgram } from "pixi.js";

const basicVertexShader = `
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
    `;

const fragmentShader = `
in vec2 vTextureCoord;
out vec4 finalColor;
in vec2 aaPosition;
in vec4 outputFrame;
in vec4 aaInputSize;

uniform sampler2D uTexture;
uniform float uTolerance;

vec4 convolute(vec2 uv, mat3 kernel)
{
    vec4 color = vec4(0);

    vec3 direction = vec3(-1.0, 0.0, 1.0);    
    for (int x = 0; x < 3; x++)
    {
        for (int y = 0; y < 3; y++)
        {
            vec2 offset = vec2(direction[x], direction[y]) / aaInputSize.xy * 5.0;
            vec4 tryColor = texture(uTexture, vTextureCoord+offset) * kernel[x][y];

            if (tryColor.r != tryColor.b || tryColor.r != tryColor.g || tryColor.g != tryColor.b) {
              color += tryColor;
            } else {
              color += texture(uTexture, vTextureCoord) * kernel[x][y];
            }
        }
    }
    return color;
}



void main(void)
{
    finalColor = convolute(vec2(aaPosition.x, aaPosition.y), mat3(1, 2, 1, 2, 4, 2, 1, 2, 1) * 0.0625);
    
}
    `;

const aFilter = new Filter({
  glProgram: new GlProgram({
    vertex: basicVertexShader,
    fragment: fragmentShader,
  }),
});

export default aFilter;
