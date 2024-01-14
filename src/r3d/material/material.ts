import type { Dict, IMaterialParams } from './material-types';
import { Program, Shader } from '@pixijs';

import type { Texture } from '@pixijs';
import frag from './material.frag';
import { projection } from '../projection/uniforms';
import vert from './material.vert';

export class Material
{
    uniforms: Dict<any>;
    shader: Shader;

    constructor(params: IMaterialParams)
    {
        this.uniforms =
            {
                pMatrix : projection.pMatrix,
                uMap    : params.map
            };

        this.shader = new Shader(Program.from(vert, frag), this.uniforms);
    }

    get map(): Texture
    {
        return this.uniforms.uMap;
    }

    set map(value: Texture)
    {
        this.uniforms.uMap = value;
    }
}
