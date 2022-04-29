import {Note} from './note';
import * as fs from 'fs';
import chalk from 'chalk';
import { stdout } from 'process';
/**
 * Clase para representar usuarios con sus notas correspondientes.
 * @param notas : Notas del usuario.
 * @param name : Nombre del usuario.
 * @method addNote() : Método para añadir notas al usuario, creando archivos JSON para cada tipo de note.
 * @method list() : Lista todas las notas del usuario.
 * @method read() : Lee una nota del usuario.
 * @method remove() : Elimina una nota del usuario.
* Usages:
 * ```ts
 * const user = new Usuario(nombre);
 * user.addNote(title, body, color);
 * user.list();
 * user.read(title_note);
 * user.remove(title_note);
 * ```
 */
export class Usuario {
  public notes: Note[] = [];
  // Constructor donde se crea y sincroniza o solo sincroniza el directorio del usuario.
  constructor(public name: string) {
    if (fs.existsSync(`src/Ej3/usuarios/${this.name}`)) {
      const files = fs.readdirSync(`src/Ej3/usuarios/${this.name}/`);
      files.forEach((file) => {
        const contenidoNota = fs.readFileSync(`src/Ej3/usuarios/${this.name}/${file}`);
        const noteJSON = JSON.parse(contenidoNota.toString());
        const note = new Note(noteJSON.title, noteJSON.body, noteJSON.color);
        this.notes.push(note);
      });
    } else {
      fs.mkdirSync(`src/Ej3/usuarios/${this.name}`);
    }
  }
  // Añadir notas al usuario.
  public addNote(title: string, body: string, color: string) {
    if (fs.existsSync(`src/Ej3/usuarios/${this.name}/${title}.json`) == false) {
      this.notes.push(new Note(title, body, color));
      fs.writeFile(`src/Ej3/usuarios/${this.name}/${title}.json`, `{\n\t"title": "${title}",\n\t"body": "${body}",\n\t"color": "${color}"\n}`, () => {
        console.log(chalk.green('New note added!'));
      });
    } else {
      console.log(chalk.red("Note title taken!"));
    }
  }
  // Listar las notas del usuario.
  public list(): void {
    console.log('Your notes:');
    if (this.notes.length === 0) {
      console.log(chalk.red('You don`t have any note.'));
      return undefined;
    }
    let count = 1;
    this.notes.forEach( (note) => {
      process.stdout.write(`${count}.- `);
      count = count + 1;
      switch (note.color) {
        case "red":
          console.log(chalk.red(`${note.title}`));
          break;
        case "green":
          console.log(chalk.green(`${note.title}`));
          break;
        case "blue":
          console.log(chalk.blue(`${note.title}`));
          break;
        case "yellow":
          console.log(chalk.yellow(`${note.title}`));
          break;
      }
    });
  }
  // Leer una nota del usuario.
  public read(title: string): void {
    if (fs.existsSync(`src/Ej3/usuarios/${this.name}/${title}.json`)) {
      const contenidoNota = fs.readFileSync(`src/Ej3/usuarios/${this.name}/${title}.json`);
      const noteJSON = JSON.parse(contenidoNota.toString());
      switch (noteJSON.color) {
        case "red":
          console.log(chalk.red(`${noteJSON.title}`));
          console.log(chalk.red(`${noteJSON.body}`));
          break;
        case "green":
          console.log(chalk.green(`${noteJSON.title}`));
          console.log(chalk.green(`${noteJSON.body}`));
          break;
        case "blue":
          console.log(chalk.blue(`${noteJSON.title}`));
          console.log(chalk.blue(`${noteJSON.body}`));
          break;
        case "yellow":
          console.log(chalk.yellow(`${noteJSON.title}`));
          console.log(chalk.yellow(`${noteJSON.body}`));
          break;
      }
    } else {
      console.log(chalk.red(`You don't have any note with title: ${title}.`));
    }
  }
  // Eliminar una nota de la lista.
  public remove(title: string): void {
    if (fs.existsSync(`src/Ej3/usuarios/${this.name}/${title}.json`)) {
      fs.rm(`src/Ej3/usuarios/${this.name}/${title}.json`, () => {
        console.log(chalk.green('Note removed!'));
      });
    } else {
      console.log(chalk.red(`You don't have any note with title: ${title}.`));
    }
  }
  // Modificar una nota.
  public modify(title: string, param: string, newVal: string) {
    if (fs.existsSync(`src/Ej3/usuarios/${this.name}/${title}.json`)) {
      const contenidoNota = fs.readFileSync(`src/Ej3/usuarios/${this.name}/${title}.json`);
      const noteJSON = JSON.parse(contenidoNota.toString());
      const body = noteJSON.body;
      const color = noteJSON.color;
      if (param === "title") {
        fs.renameSync(`src/Ej3/usuarios/${this.name}/${title}.json`, `src/Ej3/usuarios/${this.name}/${newVal}.json`);
        fs.writeFile(`src/Ej3/usuarios/${this.name}/${newVal}.json`, `{\n\t"title": "${newVal}",\n\t"body": "${body}",\n\t"color": "${color}"\n}`, () => {
          console.log(chalk.green('Note modified!'));
        });
      }
      if (param === "body") {
        fs.writeFile(`src/Ej3/usuarios/${this.name}/${title}.json`, `{\n\t"title": "${title}",\n\t"body": "${newVal}",\n\t"color": "${color}"\n}`, () => {
          console.log(chalk.green('Note modified'));
        });
      }
      if (param === "color") {
        fs.writeFile(`src/Ej3/usuarios/${this.name}/${title}.json`, `{\n\t"title": "${title}",\n\t"body": "${body}",\n\t"color": "${newVal}"\n}`, () => {
          console.log(chalk.green('Note modified'));
        });
      }
    } else {
      console.log(chalk.red(`You don't have any note with title: ${title}.`));
    }
  }
}
