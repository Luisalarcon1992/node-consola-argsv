import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const { b: baseTable, l: limitTable, s: showTable } = yarg;

const headerMessage = `
==================================================
                Tabla del ${baseTable}
==================================================
`;

let content = '';

for (let i = 0; i <= limitTable; i++){
    content += `${baseTable} x ${i} = ${baseTable * i}\n`;
};

const finalContent = headerMessage + content;

if ( showTable ) {
    console.log(finalContent)
}

const outputPath = `outputs`;
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${baseTable}.txt`, finalContent);