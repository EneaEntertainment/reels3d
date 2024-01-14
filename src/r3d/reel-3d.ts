import { Container, Texture } from '@pixijs';

import type { BoxGeometry } from './geometry/box';
import { CylinderGeometry } from './geometry/cylinder';
import { Material } from './material/material';
import { Mesh3D } from './mesh-3d/mesh-3d';
import type { Renderer } from '@pixijs';

export class Reel3D extends Container
{
    private geometry: BoxGeometry;
    private material: Material;
    private mesh: Mesh3D;

    constructor()
    {
        super();

        this.geometry = new CylinderGeometry({
            radius         : 1,
            height         : 3,
            radialSegments : 32,
            thetaStart     : 0,
            thetaLength    : Math.PI
        });

        this.material = new Material({ map: Texture.EMPTY });

        this.mesh = new Mesh3D(this.geometry, this.material);

        this.mesh.setPosition(0, 0, -3);
        this.mesh.setRotation(0, -90, 90);

        this.mesh.updateTransform();
    }

    render(renderer: Renderer)
    {
        this.mesh.render(renderer);
    }

    get texture(): Texture
    {
        return this.material.map;
    }

    set texture(value: Texture)
    {
        this.material.map = value;
    }
}
