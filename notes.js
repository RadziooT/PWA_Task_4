function onTypeChange() {
    const type = document.querySelector('input[name="noteType"]:checked').value;

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteAmount').value = '';
    document.getElementById('noteAction').value = '';

    if (type === 'insight') {
        setInsightType()
    } else {
        setTransactionType()
    }
}

function setInsightType() {
    document.getElementById('noteAmount').style.display = 'none';
    document.getElementById('noteAction').style.display = 'none';

    const title = document.getElementById('noteTitle');
    title.value = 'My note';
}

function setTransactionType() {
    document.getElementById('noteAmount').style.display = 'block';
    document.getElementById('noteAction').style.display = 'block';

    const title = document.getElementById('noteTitle');
    title.value = 'Bitcoin transaction title';
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function renderNotes() {
    document.getElementById('notesContainer').innerHTML = '';
    const notes = getNotes();
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        if (note.type === 'insight') {
            noteDiv.innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mb-0">${note.title}</h5>
            <small class="note-date">${note.date}</small>
            <button class="btn btn-sm btn-danger ms-2" onclick="deleteNote(${index})">X</button>
          </div>
          <div>${note.content}</div>
        `;
        } else {
            noteDiv.innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mb-0">${note.title}</h5>
            <small class="note-date">${note.date}</small>
            <button class="btn btn-sm btn-danger ms-2" onclick="deleteNote(${index})">X</button>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mb-2">${note.amount} BTC</h5>
            <h5 class="mb-2">${note.action}</h5>
          </div>
          <div>${note.content}</div>
        `;
        }

        document.getElementById('notesContainer').appendChild(noteDiv);
    });
}

function deleteNote(index) {
    const notes = getNotes()
    notes.splice(index, 1)
    saveNotes(notes);
    renderNotes();
}

function addNote() {
    const type = document.querySelector('input[name="noteType"]:checked').value;
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    const amount = document.getElementById('noteAmount').value;
    const action = document.getElementById('noteAction').value;

    if (!title || !content) return;

    const notes = getNotes();
    notes.push({
        type,
        title,
        content,
        amount,
        action,
        date: new Date().toLocaleString()
    });

    onTypeChange()
    saveNotes(notes);
    renderNotes();
}

document.addEventListener('DOMContentLoaded', onTypeChange);
document.addEventListener('DOMContentLoaded', renderNotes);
