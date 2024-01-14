const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * will generate a texture atlas for each .tps file in the 'source' folder
 * and save it to the 'destination' folder
 */

const source = './resources/atlases/';
const destination = './assets/images/';
const formats = ['webp', 'png'];

const files = fs.readdirSync(source)
  .filter(file => path.extname(file) === '.tps')
  .map(file => path.join(source, file));

files.forEach((file) =>
{
    formats.forEach((format) =>
    {
        const fileName = path.basename(file, path.extname(file));
        const command = `TexturePacker ${file} --sheet ${destination}${fileName}@{v}x.${format} --data ${destination}${fileName}@{v}x.${format}.json`;

        exec(command, (error, stdout, stderr) =>
        {
            if (error)
            {
                console.error(`Error: ${error.message}`);

                return;
            }

            if (stderr)
            {
                console.error(`stderr: ${stderr}`);

                return;
            }

            console.log(`stdout: ${stdout}`);
        });
    });
});
