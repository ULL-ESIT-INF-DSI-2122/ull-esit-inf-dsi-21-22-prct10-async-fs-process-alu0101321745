import { FilePipe } from './FilePipe';
import { FileNoPipe } from './FileNoPipe';
import * as yargs from 'yargs';
/**
 * Comando para trabajar sobre el archivo que
 * realizaremos el grep -o y wc -l con la palabra
 * indicada por consola.
 * Usage:
 * ```sh
 * node dist/Ej2/app.js file --file='hola.txt' --word="hola" --pipe=true
 * node dist/Ej2/app.js file --file='hola.txt' --word="hola" --pipe=false
 * ```
 */
yargs.command({
    command: 'file',
    describe: 'Make a pipe or not pipe callout',
    builder: {
        file: {
            describe: 'File to work',
            demandOption: true,
            type: 'string',
        },
        word: {
            describe: 'Word to count',
            demandOption: true,
            type: 'string',
        },
        pipe: {
            describe: 'Use or not pipes',
            demandOption: true,
            type: 'boolean',
        },
    },
    handler(argv) {
        if (typeof argv.file === 'string' && typeof argv.word === 'string' && typeof argv.pipe === 'boolean') {
            if (argv.pipe === true) {
                const file = new FilePipe(argv.file, argv.word);
                file.management();
            } else {
                const file = new FileNoPipe(argv.file, argv.word);
                file.management();
            }
        } else {
            console.log('Bad usage of the this.command.');
        }
    },
});

yargs.argv;
