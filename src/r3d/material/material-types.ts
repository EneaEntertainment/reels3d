import type { Texture } from '@pixijs';

export interface IMaterialParams
{
    map: Texture
}

export type Dict<T> =
{
    [key: string]: T;
};
