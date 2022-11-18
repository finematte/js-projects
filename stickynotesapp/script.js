const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

let uniqueID = []

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();

  let id = Math.floor(Math.random() * 1000);

  if (uniqueID.length < 1000) {
      while (uniqueID.includes(id, 0)) {
        id = Math.floor(Math.random() * 1000);
    }

    uniqueID.push(id);

    const noteObject = {
      id: id,
      content: "",
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
  
    notes.push(noteObject);
    saveNotes(notes);
  } else {
    confirm("You've created too many notes! Delete one in order to create another.")
  }
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  uniqueID = uniqueID.filter(e => e !== id)

  saveNotes(notes);
  notesContainer.removeChild(element);
}
