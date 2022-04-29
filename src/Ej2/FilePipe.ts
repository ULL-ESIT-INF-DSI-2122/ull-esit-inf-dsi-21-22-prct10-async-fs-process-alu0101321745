import { FileManagement } from "./FileManagement";
import {spawn} from 'child_process';
import * as fs from "fs";
/**
 * Clase que usará pipes para contar las palabras dentro del fichero.
 * @param nombre : Nombre del fichero.
 * @param palabra : Palabra a contar.
 * @method management() : Metodo para contar las palabras con el uso de pipes.
 */
export class FilePipe extends FileManagement {
    constructor(protected nombre: string, protected palabra: string) {
        super(nombre, palabra);
    }
    management(): void {
        const path = `/home/usuario/Informes practicas/P10/src/Ej2/${this.getName()}`;
        if (!fs.existsSync(path)) {
            console.log("This file doesn`t exist.");
            return undefined;
        }
        const cat = spawn('cat', [path]);
        const grep = spawn('grep', ['-o', this.getWord()]);
        const wc = spawn('wc', ['-l']);

        cat.stdout.pipe(grep.stdin);
        grep.stdout.pipe(wc.stdin);

        let wcOut = '';
        wc.stdout.on('data', (data) => {
            wcOut = data.toString();
        });
        wc.stdout.on("close", () => {
            console.log('Numero de veces que se conto la palabra ' + this.getWord() + ': ' + wcOut);
        });
    }
}

