import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


export const yarg = yargs(hideBin(process.argv))
    .options('b',{
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Es la base de la tabla de multiplicar'
    })
    .options('l',{
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Límite de la tabla de multiplicar'
    })
    .options('s',{
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Muestra la tabla de multiplicar en consola'
    })
    .options('n', {
        alias: 'name',
        type: 'string',
        describe: 'Nombre del archivo',
        default: 'table'
    })
    .options('d', {
        alias: 'destination',
        type: 'string',
        describe: 'Ruta de destino del archivo',
        default: './outputs'
    })
    .check((argv, options) => {

        // Base
        // Check if the base is a number 
        if (isNaN(argv.b))  throw 'La base tiene que ser un número positivo';
        if (argv.b < 1) throw 'La base tiene que ser un número positivo';

        // Limit
        // Check if the limit is a number
        if ( argv.l < 1) throw 'El límite tiene que ser un número positivo';
        if (isNaN(argv.l))  throw 'La base tiene que ser un número positivo';
        
        return true;
    })
    .parseSync()