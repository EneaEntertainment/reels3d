import { Assets, Container, Sprite } from '@pixijs';

import { Reel } from './reel';
import { symbolSize } from './main';

export class Slots extends Container
{
    reels: Array<Reel> = [];

    constructor()
    {
        super();

        this.init();
        this.initGradient();
    }

    init()
    {
        for (let i = 0; i < 5; i++)
        {
            const reel = new Reel();

            reel.x = i * symbolSize;

            this.reels.push(reel);

            this.addChild(reel);
        }
    }

    initGradient()
    {
        const gradientHeight = 1.5;

        const gradientTop = Sprite.from(Assets.get('gradient.png'));

        gradientTop.width = symbolSize * 5;
        gradientTop.height = symbolSize * gradientHeight;
        gradientTop.y = symbolSize * 0.5;

        this.addChild(gradientTop);

        const gradientBottom = Sprite.from(Assets.get('gradient.png'));

        gradientBottom.width = symbolSize * 5;
        gradientBottom.height = symbolSize * gradientHeight;
        gradientBottom.anchor.x = 0.5;
        gradientBottom.x = symbolSize * 2.5;
        gradientBottom.y = symbolSize * 4.5;
        gradientBottom.rotation = Math.PI;

        this.addChild(gradientBottom);
    }

    start()
    {
        this.reels.forEach((reel, index) => { reel.start(index * 0.2); });
    }
}
