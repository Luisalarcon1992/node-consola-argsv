import { CreateTable } from './create-table.use-case';



describe('domain/use-case/create-table.use-case.ts', () => {

    test('Should create table with defaultn value', () => {

        const createTable = new CreateTable();

        expect( createTable).toBeInstanceOf(CreateTable);
    });

});