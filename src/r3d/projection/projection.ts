import { DEG_TO_RAD } from '@pixijs';
import type { IProjectionParams } from './projection-types';
import { mat4 } from 'gl-matrix';
import { projection } from './uniforms';

export class Projection
{
    fov: number;
    aspect: number;
    near: number;
    far: number;

    constructor(params: IProjectionParams)
    {
        Object.assign(this, params);

        this.update();
    }

    update()
    {
        const { fov, aspect, near, far } = this;

        mat4.perspective(projection.pMatrix, fov * DEG_TO_RAD, aspect, near, far);
    }
}
