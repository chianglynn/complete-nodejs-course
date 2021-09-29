const fs = require('fs');
const chalk = require('chalk');

// Functions
const findNoteByTitle = (title) => {
    const notes = loadNotes();
    return notes.find(note => note.title === title);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const addNote = (title, body) => {
    const note = findNoteByTitle(title);

    if (!note) {
        notes.push({ title, body });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added.'));
    } else {
        console.log(chalk.red.inverse('Note title taken.'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Note removed'));
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse('Your notes'));
    notes.forEach(note => console.log(`Title: ${note.title}`));
};

const readNote = (title) => {
    const note = findNoteByTitle(title);

    if (note) console.log(`Title: ${note.title} Body: ${note.body}`);
    else console.log(chalk.red.inverse('No note found'));
};

module.exports = { addNote, removeNote, listNotes, readNote };