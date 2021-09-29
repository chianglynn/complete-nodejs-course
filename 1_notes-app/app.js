const yargs = require('yargs');
const notes = require('./notes');

// custom yargs version
yargs.version('1.1.0');

// create add commands
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

yargs.parse(); // = console.log(yargs.argv);
// termianl command: node app.js --help
// termianl command: node app.js add/remove/list/read
// termianl command: node app.js add --title="Shopping list"
