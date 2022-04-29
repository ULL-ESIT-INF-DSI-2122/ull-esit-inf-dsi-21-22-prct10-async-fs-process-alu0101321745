import { FileManagement } from "./FileManagement";
import {spawn} from 'child_process';


/**
 * Clase que no usará pipes para contar las palabras dentro del fichero.
 * @param nombre : Nombre del fichero.
 * @param palabra : Palabra a contar.
 * @method management() : Metodo para contar las palabras sin el uso de pipes.
 */
export class FileNoPipe extends FileManagement {
    constructor(protected nombre: string, protected palabra: string) {
        super(nombre, palabra);
    }
    management(): void {
        const path = `/home/usuario/Informes practicas/P10/src/Ej2/${this.getName()}`;
        const grep = spawn('grep', ['-o', this.getWord(), path]);
        let grepOut = '';
        grep.stdout.on('data', (data) => {
            grepOut = data.toString();
        });
        grep.stdout.on("close", () => {
            console.log('Numero de veces que se conto la palabra ' + this.getWord() + `: ${grepOut.split(this.getWord()).length - 1}`);
        });
    }
}
