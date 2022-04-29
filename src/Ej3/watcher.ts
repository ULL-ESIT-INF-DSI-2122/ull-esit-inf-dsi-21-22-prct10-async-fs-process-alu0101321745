import * as fs from 'fs';
/**
 * Clase watcher que notificará los cambios sobre las notas de un usuario.
 * @param name : Nombre del usuario.
 * @method watchDir : Se encargará de gesitonar todo lo referente a los eventos del watcher correspondiente.
 * @method checkDir : Cada vez que se llame esta función se encargará de comprobar que existe el directorio del usuario.
 */
export class Watcher {
    constructor(private name: string) {
        this.watchDir();
    }
    watchDir() {
        let check = this.checkDir(this.name);
        if (check) {
            console.log(`Esperando por un evento`);
            const watcher = fs.watch(`/home/usuario/Informes practicas/P10/src/Ej3/usuarios/${this.name}`);
            watcher.on('change', (eventType, filename) => {
                switch (eventType) {
                    case 'rename':
                        check = this.checkDir(filename.toString());
                        if (check) {
                            console.log(`Nota ${filename} añadida.`);
                        } else {
                            console.log(`Nota ${filename} borrada.`);
                        }
                        break;
                    case 'change':
                        console.log(`Nota ${filename} modificada.`);
                        break;
                }
                console.log(`Esperando por un evento`);
            });
            return;
        } else {
            console.log('Error no existe el usuario especificado');
            return -1;
        }
    }
    checkDir(name: string): boolean {
        try {
            fs.accessSync(`/home/usuario/Informes practicas/P10/src/Ej3/usuarios/${name}`, fs.constants.F_OK);
            return true;
        } catch {
            return false;
        }
    }
}
