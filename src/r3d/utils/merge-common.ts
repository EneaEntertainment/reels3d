import { clone } from './clone';

export function mergeCommon<T>(input1: T, input2: T): T
{
    const result = clone(input1);

    for (const i in input1)
    {
        for (const j in input2)
        {
            if (i === j && (input2[j] !== null || typeof input2[j] !== 'undefined'))
            {
                if (typeof input2[j] === 'object' && (input2[j] as any).constructor === Object)
                    result[i] = mergeCommon(input1[i], input2[j]);
                else
                    result[i] = input2[j];
            }
        }
    }

    return result;
}
