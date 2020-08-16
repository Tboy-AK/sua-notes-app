const yargs = require('yargs');
const { listNotes, addNote, removeNote, readNote } = require('./notes');

// ADD command
yargs.command({
  command: 'add',
  description: 'Add a new note',
  builder: {
    title: {
      description: 'Note title',
      required: true,
      type: 'string',
    },
    body: {
      description: 'Note content',
      required: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    addNote(argv.title, argv.body)
  }
});

// REMOVE command
yargs.command({
  command: 'remove',
  description: 'Remove a note',
  builder: {
    title: {
      description: 'Note title',
      required: true,
      type: 'string'
    },
  },
  handler: (argv) => removeNote(argv.title)
});

// READ command
yargs.command({
  command: 'read',
  description: 'Read the content of a note',
  builder: {
    title: {
      description: 'Note title',
      required: true,
      type: 'string',
    },
  },
  handler: (argv) => readNote(argv.title)
});

// LIST command
yargs.command({
  command: 'list',
  description: 'list all notes',
  handler: () => listNotes()
});

yargs.parse()
