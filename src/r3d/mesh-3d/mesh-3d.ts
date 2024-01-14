import { DRAW_MODES, State } from '@pixijs';
import type { Geometry, Renderer } from '@pixijs';

import type { Material } from '../material/material';
import { Object3D } from '../object-3d/object-3d';

export class Mesh3D extends Object3D
{
    private state: State;

    constructor(private geometry: Geometry, private material: Material)
    {
        super();

        this.material.uniforms.mMatrix = this.mMatrix;

        this.state = new State();

        this.state.culling = true;
        this.state.depthTest = true;
    }

    render(renderer: Renderer)
    {
        renderer.batch.flush();
        renderer.shader.bind(this.material.shader);
        renderer.state.set(this.state);

        renderer.geometry.bind(this.geometry, this.material.shader);
        renderer.geometry.draw(DRAW_MODES.TRIANGLES);

        renderer.gl.clear(renderer.gl.DEPTH_BUFFER_BIT);
    }
}
