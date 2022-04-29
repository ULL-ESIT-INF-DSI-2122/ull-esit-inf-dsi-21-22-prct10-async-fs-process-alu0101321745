# **Práctica 10 - Sistema de ficheros y creación de procesos en Node.js**

## **Badges.**

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101321745/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101321745?branch=main)


## **Algunas tareas previas.**
1. Repositorio: [click aquí](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101321745)

2. Api de callbacks proporcionada por Node.js: [click aquí](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#callback-api)

## **Ejercicio 1:**

Considerando el siguiente código:

```ts
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
- ¿Qué hace la función access?: Es usada para probar los permisos de un fichero o directorio dado. Los permisos a ser comprobados son especificados por parámetro usando constantes de acceso.
- ¿Para qué sirve el objeto constants?: Proporciona las constantes de acceso a ser comprobadas anteriormente mencionadas.

Decir paso a paso el contenido de la pila de llamadas, el registro de eventos de la API, la cola de manejadores de Node.js y la salida por consola:

* Paso 1: Se inicializa nuestro programa y se empaqueta en un main dentro de nuestra pila de llamadas:
  
  1. Pila de llamadas: main.
  2. Eventos API: -
  3. Cola de manejadores: -
  4. Consola: - 

* Paso 2: Entra access a la pila de llamdas
  
  1. Pila de llamadas: main, access
  2. Eventos API: -
  3. Cola de manejadores: -
  4. Consola: - 

* Paso 3: Sale acces de la pila de llamdas y entra el callback de acccess dentro de los eventos API.
  
  1. Pila de llamadas: main.
  2. Eventos API: callback access
  3. Cola de manejadores: -
  4. Consola: - 

* Paso 4: Como la llamda no tiene retrasos va directamente a la cola de manejadores.
  
  1. Pila de llamadas: main.
  2. Eventos API: -
  3. Cola de manejadores: access.
  4. Consola: - 

* Paso 5: Ahora entra el callback de acess dentro de la pila de llamdas y sale main.
  
  1. Pila de llamadas: callback access.
  2. Eventos API: -
  3. Cola de manejadores: -
  4. Consola: - 

* Paso 6: Se ejecuta el callback de access:
  
  1. Pila de llamadas: watch on, access callback, access callback
  2. Eventos API: -
  3. Cola de manejadores: -
  4. Consola: -, Starting to watch file helloworld.txt, File helloworld.txt is no longer watched 

* Paso 7: La pila de llamadas se vacía manteniendo el proceso watch.on sobre el fichero helloworld.txt en busca de modificaciones
  
  1. Pila de llamadas: -
  2. Eventos API: watch.on
  3. Cola de manejadores: -
  4. Consola: -

* Paso 8: Con cualquier modificacion, el watch.on es procesado en la cola de manejadores y se vuelve a llenar la pila de llamadas con el mensaje por consola.

  1. Pila de llamadas: watch.on callback
  2. Eventos API: watch.on
  3. Cola de manejadores: -
  4. Consola: File helloworld.txt has been modified somehow

## **Ejercicio 2:**

Debemos realizar un programa que devuelva el número de ocurrencias de una palabra en un fichero de texto.

Para esto vamos a desarrollar un comando yarg y 3 clases.

Comando yarg:

Recibe como parámetro el nombre del fichero con la extensión y la palabra a buscar, el código es el siguiente:

```ts
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
```

Clases:

- Clase FileManagement: Será una clase abstracta de la que herederán las siguientes clases con el uso de pipe y sin el.
- Clase FilePipe: Clase que usará pipes para contar la palabra.
- Clase FileNoPipe: Clase que no usará pipes para contar la palabra.

```ts
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
```

```ts
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
```

```ts
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
```

## **Ejercicio 3:**
