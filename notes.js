const fs = require('fs');
const chalk = require('chalk');

// Function to save notes 
const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', notesJSON);
}

// Function to import stored data from permanent storage
const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync('notes.json');
    const jsonData = bufferData.toString();
    const data = JSON.parse(jsonData);
    return data;
  } catch (err) {
    return [];
  }
}

// LIST
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse('Your Notes'));
  notes.forEach(note => {
    console.log(note.title)
  }
  )
}

// ADD
const addNote = (title, body) => {
  const notes = loadNotes();

  // check that specified note does not exist
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes)
    console.log(chalk.green.inverse('Note added successfully'));
  } else {
    console.log(chalk.red.inverse('Note title has been taken'));
  }
}

// REMOVE
const removeNote = (title) => {
  const notes = loadNotes();

  const filteredNotes = notes.filter(note => note.title !== title);

  // check that specified note was removed
  if (notes.length > filteredNotes.length) {
    console.log(chalk.green.inverse(`Note with title: '${title}' deleted successfully`))
    // save remaining notes
    saveNotes(filteredNotes);
  } else {
    console.log(
      chalk.red.inverse(`Note with title: '${title}' doesn't exist`)
    );
  }
}

// READ
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(`Title: ${chalk.green(note.title)}`);
    console.log(`Body: ${chalk.green(note.body)}`);
  } else {
    console.log(chalk.red('Error: Not Found!'));
  }
}

module.exports = { listNotes, addNote, removeNote, readNote }