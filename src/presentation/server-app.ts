import { CreateTable } from "../domain/use-case/create-table.use-case";
import { SaveFile } from "../domain/use-case/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}


export class ServerApp {

    static run({ base, limit, showTable, fileDestination, fileName }: RunOptions) {
        console.log('Server is running');

        const createTeble = new CreateTable().execute({ base, limit});

        const wasCreated = new SaveFile().saveFile({fileContent: createTeble, fileName, fileDestination})

        if ( showTable) console.log(createTeble);

        ( wasCreated ) 
            ? console.log('Archivo creado con éxito')
            : console.log('No se pudo crear el archivo');
    }

}