import fs from 'fs';


export interface SaveFileUseCase {
    saveFile(options: SaveFileOptions): boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}


export class SaveFile implements SaveFileUseCase {

    constructor() {}

    saveFile({ 
        fileContent, 
        fileDestination = 'outputs',
        fileName= 'tabla' 
    }: SaveFileOptions): boolean {

       try {
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            return true;
       } catch (error) {
            console.log(error)
            return false
       }
    }

}