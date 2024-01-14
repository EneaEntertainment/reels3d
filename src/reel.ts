import { Assets, Container, Sprite } from '@pixijs';

import { anim } from '@enea-entertainment/animjs';
import { symbolSize } from './main';

const textures =
    [
        'symbol-1.png',
        'symbol-2.png',
        'symbol-3.png',
        'symbol-4.png',
        'symbol-5.png',
        'symbol-6.png',
        'symbol-7.png',
        'symbol-8.png',
        'symbol-9.png',
        'symbol-10.png'
    ];

export class Reel extends Container
{
    prevValue = 0;

    constructor()
    {
        super();

        this.init();
    }

    init()
    {
        for (let i = 0; i < 6; i++)
        {
            const symbol = new Sprite(getRandomTexture());

            symbol.y = (i * symbolSize) - symbolSize;

            this.addChild(symbol);
        }
    }

    spinUpdate(target: any)
    {
        const deltaY = target.value - this.prevValue;

        for (let i = 0, j = this.children.length; i < j; i++)
            this.children[i].y += deltaY;

        this.prevValue = target.value;
    }

    spinRepeat()
    {
        this.prevValue = 0;

        let last = this.children[0] as Sprite;

        for (let i = 1; i < this.children.length; i++)
        {
            const current = this.children[i] as Sprite;

            if (current.y > last.y)
                last = current;
        }

        last.y = -symbolSize;

        last.texture = getRandomTexture();
    }

    start(delay: number)
    {
        const timeline = anim.timeline();

        timeline.to({ value: 0 },
            {
                duration : 0.4,
                delay,
                value    : -10,
                ease     : 'sineOut',

                onUpdate   : this.spinUpdate.bind(this),
                onComplete : () => { this.prevValue = 0; }
            }, 'start');

        timeline.to({ value: 0 },
            {
                duration : 0.5,
                value    : symbolSize,
                repeat   : -1,

                onUpdate : this.spinUpdate.bind(this),
                onRepeat : this.spinRepeat.bind(this)
            }, 'loop');
    }
}

const getRandomTexture = () =>
{
    const randomIndex = Math.floor(Math.random() * textures.length);

    return Assets.get(textures[randomIndex]);
};

