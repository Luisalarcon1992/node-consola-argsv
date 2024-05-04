

const runCommand = async ( args: string[] ) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./args.plugin');

    return yarg;
}

describe('src/config/plugins/args.plugin.test.ts',  () => {


    test('should return default values', async () => {

        const argv = await runCommand(['-b', '5']);
        console.log(argv)

        expect(argv).toEqual( expect.objectContaining({
            "b": 5,
            "d": "./outputs",
            "l": 10,
            "n": "table",
            "s": false,
        }));
    });
});