import { Geometry } from '@pixijs';
import type { ICylinderParams } from './cylinder-types';
import { mergeCommon } from '../utils/merge-common';
import { vec3 } from 'gl-matrix';

export class CylinderGeometry extends Geometry
{
    static DefaultParams: ICylinderParams =
        {
            radius         : 1,
            height         : 1,
            radialSegments : 32,
            thetaStart     : 0,
            thetaLength    : Math.PI * 2
        };

    constructor(passedParams: Partial<ICylinderParams> = {})
    {
        super();

        const params = mergeCommon(CylinderGeometry.DefaultParams, passedParams) as ICylinderParams;

        const indicesData: Array<number> = [];
        const verticesData: Array<number> = [];
        const uvsData: Array<number> = [];

        let index = 0;
        const indexArray: Array<Array<number>> = [];
        const halfHeight = params.height / 2;

        generateTorso();

        this.addAttribute('aPosition', verticesData, 3);
        this.addAttribute('aUv', uvsData, 2);

        this.addIndex(indicesData);

        function generateTorso()
        {
            const vertex = vec3.create();

            for (let y = 0; y <= 1; y++)
            {
                const indexRow = [];

                const v = y / 1;

                for (let x = 0; x <= params.radialSegments; x++)
                {
                    const u = x / params.radialSegments;

                    const theta = (u * params.thetaLength) + params.thetaStart;

                    const sinTheta = Math.sin(theta);
                    const cosTheta = Math.cos(theta);

                    vertex[0] = params.radius * sinTheta;
                    vertex[1] = (-v * params.height) + halfHeight;
                    vertex[2] = params.radius * cosTheta;

                    verticesData.push(vertex[0], vertex[1], vertex[2]);

                    uvsData.push(1 - v, u);

                    indexRow.push(index++);
                }

                indexArray.push(indexRow);
            }

            for (let x = 0; x < params.radialSegments; x++)
            {
                for (let y = 0; y < 1; y++)
                {
                    const a = indexArray[y][x];
                    const b = indexArray[y + 1][x];
                    const c = indexArray[y + 1][x + 1];
                    const d = indexArray[y][x + 1];

                    indicesData.push(a, b, d);
                    indicesData.push(b, c, d);
                }
            }
        }
    }
}

