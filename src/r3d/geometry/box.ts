import { indicesData, positionsData, uvsData } from './box-data';

import { Geometry } from '@pixijs';
import type { IBoxParams } from './box-types';
import { mergeCommon } from '../utils/merge-common';

export class BoxGeometry extends Geometry
{
    static DefaultParams: IBoxParams =
        {
            width  : 1,
            height : 1,
            depth  : 1,
            tileX  : 1,
            tileY  : 1
        };

    constructor(passedParams: Partial<IBoxParams> = {})
    {
        super();

        const params = mergeCommon(BoxGeometry.DefaultParams, passedParams) as IBoxParams;

        const halfWidth = params.width / 2;
        const halfHeight = params.height / 2;
        const halfDepth = params.depth / 2;

        const resizedPositionsData = [];

        for (let i = 0; i < positionsData.length; i += 3)
        {
            resizedPositionsData.push(positionsData[i + 0] * halfWidth);
            resizedPositionsData.push(positionsData[i + 1] * halfHeight);
            resizedPositionsData.push(positionsData[i + 2] * halfDepth);
        }

        this.addAttribute('aPosition', resizedPositionsData, 3);

        const tiledUvsData = [];

        for (let i = 0; i < uvsData.length; i += 2)
        {
            tiledUvsData.push(uvsData[i + 0] * params.tileX);
            tiledUvsData.push(uvsData[i + 1] * params.tileY);
        }

        this.addAttribute('aUv', tiledUvsData, 2);

        this.addIndex(indicesData);
    }
}

