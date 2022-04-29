import * as yargs from 'yargs';
import { Usuario } from './usuario';
import * as fs from 'fs';
import chalk from 'chalk';

/**
 * Comando yark para añadir una nota.
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color == 'string') {
      const usuario = new Usuario(argv.user);
      usuario.addNote(argv.title, argv.body, argv.color);
    }
  },
});
/**
 * Comando yark para listar todas las notas de un usuario.
 */
yargs.command({
  command: 'list',
  describe: 'list the notes of an user',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const usuario = new Usuario(argv.user);
      usuario.list();
    }
  },
});
/**
 * Comando yark para leer una nota.
 */
yargs.command({
  command: 'read',
  describe: 'read the note of an user',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const usuario = new Usuario(argv.user);
      usuario.read(argv.title);
    }
  },
});
/**
 * Comando yark para eliminar una nota.
 */
 yargs.command({
  command: 'remove',
  describe: 'remove the note of an user',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const usuario = new Usuario(argv.user);
      usuario.remove(argv.title);
    }
  },
});
/**
 * Comando yark para modificar una nota.
 */
 yargs.command({
  command: 'modify',
  describe: 'read the note of an user',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titule',
      demandOption: true,
      type: 'string',
    },
    param: {
      describe: 'Param to modify',
      demandOption: true,
      type: 'string',
    },
    newVal: {
      describe: 'New value',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.param === 'string' && typeof argv.newVal === 'string') {
      const usuario = new Usuario(argv.user);
      usuario.modify(argv.title, argv.param, argv.newVal);
    }
  },
});

yargs.argv;
