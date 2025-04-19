const form = document.getElementById('noteForm');
const notesContainer = document.getElementById('notesContainer');
const titleInput = document.getElementById('noteTitle');
const contentInput = document.getElementById('noteContent');

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function renderNotes() {
    notesContainer.innerHTML = '';
    const notes = getNotes();
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        noteDiv.innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mb-0">${note.title}</h5>
            <small class="note-date">${note.date}</small>
            <button class="btn btn-sm btn-danger ms-2" onclick="deleteNote(${index})">X</button>
          </div>
          <div>${note.content}</div>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) return;

    const notes = getNotes();
    notes.push({
        title,
        content,
        date: new Date().toLocaleString()
    });
    saveNotes(notes);
    renderNotes();
    form.reset();
});

// Load notes on page load
document.addEventListener('DOMContentLoaded', renderNotes);