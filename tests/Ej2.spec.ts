import 'mocha';
import {expect} from 'chai';
import { FileManagement } from "../src/Ej2/FileManagement";
import { FilePipe } from "../src/Ej2/FilePipe";
import { FileNoPipe } from "../src/Ej2/FileNoPipe";

describe('Pruebas del ejercicio 2:', () => {
    const filePipe = new FilePipe('hola.txt', 'hola');
    const fileNoPipe = new FileNoPipe('hola.txt', 'hola');
    it('Los ficheros son instancias de File Management:', () => {
        expect(filePipe).to.be.instanceOf(FileManagement);
        expect(fileNoPipe).to.be.instanceOf(FileManagement);
    });
    it('FilePipe es instancia de su clase:', () => {
        expect(filePipe).to.be.instanceOf(FilePipe);
    });
    it('FileNoPipe es instancia de su clase:', () => {
        expect(fileNoPipe).to.be.instanceOf(FileNoPipe);
    });
    it('Ambas clases cuentan 4 holas en el fichero de texto.:', () => {
        expect(filePipe.management()).to.be.eql(undefined);
        expect(fileNoPipe.management()).to.be.eql(undefined);
    });
});
