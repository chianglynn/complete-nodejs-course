const yargs = require('yargs');
const notes = require('./notes');

// custom yargs version
yargs.version('1.1.0');

// create add, remove, list, read commands
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    },
});

yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        notes.removeNote(argv.title);
    },
});

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes();
    },
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        notes.readNote(argv.title);
    },
});

yargs.parse(); // = console.log(yargs.argv);
// termianl command: node app.js --help
// termianl command: node app.js add --title="t" --body="b"