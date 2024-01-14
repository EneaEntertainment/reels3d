import { Main } from './main';

whenReady(() =>
{
    // eslint-disable-next-line no-new
    new Main();
});

function whenReady(callback: ()=> void)
{
    if (document.readyState === 'complete' || document.readyState === 'interactive')
    {
        callback();

        return;
    }

    const check = () =>
    {
        document.removeEventListener('deviceready', check, true);
        document.removeEventListener('DOMContentLoaded', check, true);
        window.removeEventListener('load', check, true);

        callback();
    };

    if (!document.body)
        window.setTimeout(check, 20);
    else
    {
        document.addEventListener('DOMContentLoaded', check, true);
        window.addEventListener('load', check, true);
    }
}
