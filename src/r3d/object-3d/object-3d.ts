import { mat4, quat, vec3 } from 'gl-matrix';

export class Object3D
{
    readonly position = vec3.create();
    readonly rotation = vec3.create();
    readonly quaternion = quat.create();
    readonly scale = vec3.fromValues(1, 1, 1);

    readonly mMatrix = mat4.create();

    private _quatID = 0;
    private _quatCurrentID = -1;
    private _localID = 0;
    private _localCurrentID = -1;

    updateMatrix()
    {
        if (this._quatID !== this._quatCurrentID)
        {
            const rotation = this.rotation;

            quat.fromEuler(this.quaternion, rotation[0], rotation[1], rotation[2]);

            this._quatCurrentID = this._quatID;
        }

        if (this._localID !== this._localCurrentID)
        {
            mat4.fromRotationTranslationScale(this.mMatrix, this.quaternion, this.position, this.scale);

            this._localCurrentID = this._localID;
        }
    }

    updateTransform()
    {
        const needsUpdate = this._localID !== this._localCurrentID;

        if (needsUpdate)
            this.updateMatrix();

        this._quatCurrentID = this._quatID;
        this._localCurrentID = this._localID;
    }

    get x(): number
    {
        return this.position[0];
    }

    set x(value: number)
    {
        if (this.position[0] === value)
            return;

        this.position[0] = value;

        this._localID++;
    }

    get y(): number
    {
        return this.position[1];
    }

    set y(value: number)
    {
        if (this.position[1] === value)
            return;

        this.position[1] = value;

        this._localID++;
    }

    get z(): number
    {
        return this.position[2];
    }

    set z(value: number)
    {
        if (this.position[2] === value)
            return;

        this.position[2] = value;

        this._localID++;
    }

    get rx(): number
    {
        return this.rotation[0];
    }

    set rx(value: number)
    {
        if (this.rotation[0] === value)

            return;

        this.rotation[0] = value;

        this._quatID++;
        this._localID++;
    }

    get ry(): number
    {
        return this.rotation[1];
    }

    set ry(value: number)
    {
        if (this.rotation[1] === value)
            return;

        this.rotation[1] = value;

        this._quatID++;
        this._localID++;
    }

    get rz(): number
    {
        return this.rotation[2];
    }

    set rz(value: number)
    {
        if (this.rotation[2] === value)
            return;

        this.rotation[2] = value;

        this._quatID++;
        this._localID++;
    }

    get sx(): number
    {
        return this.scale[0];
    }

    set sx(value: number)
    {
        if (this.scale[0] === value)
            return;

        this.scale[0] = value;

        this._localID++;
    }

    get sy(): number
    {
        return this.scale[1];
    }

    set sy(value: number)
    {
        if (this.scale[1] === value)
            return;

        this.scale[1] = value;

        this._localID++;
    }

    get sz(): number
    {
        return this.scale[2];
    }

    set sz(value: number)
    {
        if (this.scale[2] === value)
            return;

        this.scale[2] = value;

        this._localID++;
    }

    setPosition(x: number, y: number, z: number)
    {
        if (this.position[0] === x && this.position[1] === y && this.position[2] === z)
            return;

        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;

        this._localID++;
    }

    setRotation(x: number, y: number, z: number)
    {
        if (this.rotation[0] === x && this.rotation[1] === y && this.rotation[2] === z)
            return;

        this.rotation[0] = x;
        this.rotation[1] = y;
        this.rotation[2] = z;

        this._quatID++;
        this._localID++;
    }

    setScale(x: number, y = x, z = x)
    {
        if (this.scale[0] === x && this.scale[1] === y && this.scale[2] === z)
            return;

        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;

        this._localID++;
    }
}
