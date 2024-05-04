import path from 'path';
import { SaveFile } from './save-file.use-case';
import fs from 'fs';


describe('src/domain/save-file.use-case.test.ts', () => {


    const customOptions = {
        fileContent: ' custom content',
        fileDestination: path.join(process.cwd(), 'outputs', 'files', 'custom-file.txt'),
        fileName: 'custom-file'
    }
    const customFilePath = path.join(customOptions.fileDestination, customOptions.fileName + '.txt'); // Se crea la ruta del archivo

    // Antes de cada test, crear el directorio si no existe
    beforeEach(() => {
        if (!fs.existsSync(customOptions.fileDestination)) {
            fs.mkdirSync(customOptions.fileDestination, { recursive: true });
        }
    });


    // Luego de cada test, se elimina la carpeta outputs
    afterEach( () => {
        const existPath = fs.existsSync('outputs');
        if (existPath) fs.rmSync('outputs', { recursive: true });

        const existCustomPath = fs.existsSync(customOptions.fileDestination);
        if (existCustomPath) fs.rmSync(customOptions.fileDestination, { recursive: true });
    })

    test('should save file with default values', () => {

        // Arrange

        const saveFile = new SaveFile(); // Se crea una instancia de la clase SaveFile  

        const options = {
            fileContent: 'test content',
            
        };// Se crea un objeto con la información necesaria para guardar el archivo
        
        const result = saveFile.saveFile(options); // Se llama al método saveFile con el objeto options

        // Act

        const filePath = 'outputs/tabla.txt'; // Se crea la ruta del archivo 'outputs/tabla.txt'
        
        const checkFile = fs.existsSync(filePath); // Se verifica si el archivo existe
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' }); // Se lee el contenido del archivo
        // Assert

        expect(result).toBeTruthy(); // Se espera que el resultado sea verdadero, es decir, que el archivo se haya guardado correctamente
        expect(content).toContain(options.fileContent); // Se espera que el contenido del archivo sea el mismo que el contenido del objeto options
        expect(checkFile).toBeTruthy(); // Se espera que el archivo exista
    });


    test('should save file with custom values', () => {

        // Arrange        

        const saveFile = new SaveFile(); // Se crea una instancia de la clase SaveFile
        const result = saveFile.saveFile(customOptions); // Se llama al método saveFile con el objeto options
        
        // Act

        const checkFile = fs.existsSync(customFilePath); // Se verifica si el archivo existe
        const content = fs.readFileSync(customFilePath, { encoding: 'utf-8' }); // Se lee el contenido del archivo

        // Assert

        expect(result).toBeTruthy(); // Se espera que el resultado sea verdadero, es decir, que el archivo se haya guardado correctamente
        expect(content).toContain(customOptions.fileContent); // Se espera que el contenido del archivo sea el mismo que el contenido del objeto options
        expect(checkFile).toBeTruthy(); // Se espera que el archivo exista
    });

    test('should return false if directory could not be created', () => {

        // Arrange

        const saveFile = new SaveFile(); // Se crea una instancia de la clase SaveFile

        // Se simula un error al crear el directorio. 
        // Dentro del spyOn se usa el mismo método que en la clase SaveFile, que sería 'mkdirSync'
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync')
            .mockImplementation(() => { throw new Error('This is a custom error message from created file testing') });  // El mockImplementation se encarga de lanzar un error, alterando el comportamiento del método 'mkdirSync'


        const result = saveFile.saveFile(customOptions); // Acá es indifierente enviarle los valores, ya que el mockImplementation altera el comportamiento del método y retornará un error

        // Assert

        expect(result).toBeFalsy(); // Se espera que el resultado sea falso, es decir, que el archivo no se haya guardado correctamente
    
        mkdirSpy.mockRestore(); // Se restaura el método 'mkdirSync' para que no afecte a los demás tests
    });

    test('should return false if file could not be created', () => {

        // Arrange

        const saveFile = new SaveFile(); // Se crea una instancia de la clase SaveFile

        // Se simula un error al crear el directorio. 
        // Dentro del spyOn se usa el mismo método que en la clase SaveFile, que sería 'mkdirSync'
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync')
            .mockImplementation(() => { throw new Error('This is a custom error message from writing testing') });  // El mockImplementation se encarga de lanzar un error, alterando el comportamiento del método 'mkdirSync'


        const result = saveFile.saveFile({ fileContent: 'test content' }); // Acá es indifierente enviarle los valores, ya que el mockImplementation altera el comportamiento del método y retornará un error
        // Assert

        expect(result).toBeFalsy(); // Se espera que el resultado sea falso, es decir, que el archivo no se haya guardado correctamente
        
        writeFileSpy.mockRestore(); // Se restaura el método 'writeFileSync' para que no afecte a los demás tests
    
    });

});