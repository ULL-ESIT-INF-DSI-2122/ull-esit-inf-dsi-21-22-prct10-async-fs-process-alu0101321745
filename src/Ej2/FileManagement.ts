/**
 * Clase abstracta que gestionará las peticiones sobre el fichero.
 * @param name : Nombre del fichero con la extensión.
 * @param word : Palabra a contar dentro del fichero name.
 * @method management() : Método a implementar en las clases correspondientes con y sin pipes.
 */
export abstract class FileManagement {
    constructor(protected name:string, protected word: string) { }
    getName() {return this.name;}
    getWord() {return this.word;}
    abstract management(): void;
}
