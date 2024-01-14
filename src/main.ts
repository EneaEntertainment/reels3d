import { Application, Assets, RenderTexture } from '@pixijs';

import { Projection } from './r3d/projection/projection';
import { Reel3D } from './r3d/reel-3d';
import { Slots } from './slots';
import Stats from 'stats.js';
import { anim } from '@enea-entertainment/animjs';

const stats = new Stats();

let now = Date.now();
let then = Date.now();

export const symbolSize = 160;

export class Main
{
    app: Application;
    slots: Slots;

    constructor()
    {
        this.app = new Application({
            backgroundColor : 0x202020,
            resizeTo        : window
        });

        document.body.appendChild(this.app.view as HTMLCanvasElement);
        document.body.appendChild(stats.dom);

        this.init();
    }

    async init()
    {
        await Assets.load('images/game@1x.{webp,png}.json');

        this.slots = new Slots();

        this.slots.start();

        // eslint-disable-next-line no-new
        new Projection({
            fov    : 60,
            aspect : window.innerWidth / window.innerHeight,
            near   : 0.1,
            far    : 5
        });

        const reel3D = new Reel3D();

        this.app.stage.addChild(reel3D);

        const renderTexture = RenderTexture.create({ width: symbolSize * 5, height: symbolSize * 5 });

        this.app.ticker.add(() =>
        {
            stats.begin();

            now = Date.now();

            this.app.renderer.render(this.slots, { renderTexture });

            reel3D.texture = renderTexture;

            anim.tick((now - then) / 1000);

            then = now;

            stats.end();
        });
    }
}
