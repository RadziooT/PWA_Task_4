const notesObjectStoreKey = 'notes'
let db;

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

const DBRequest = window.indexedDB.open('notes');

DBRequest.onerror = (event) => {
    console.log('Error loading database')
};

DBRequest.onsuccess = (event) => {
    console.log('Database initialised')
    db = DBRequest.result;
    renderNotes();
};

DBRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(notesObjectStoreKey)) {
        db.createObjectStore(notesObjectStoreKey, { keyPath: 'noteId', autoIncrement: true });
    }
};

function saveNote(note) {
    const transaction = db.transaction(notesObjectStoreKey, 'readwrite');
    const objectStore = transaction.objectStore(notesObjectStoreKey);
    objectStore.add(note)
}

function removeNote(noteId) {
    const transaction = db.transaction(notesObjectStoreKey, 'readwrite');
    const objectStore = transaction.objectStore(notesObjectStoreKey);
    objectStore.delete(noteId);
    transaction.oncomplete = () => {
        renderNotes();
    };
}

function renderNotes() {
    document.getElementById('notesContainer').innerHTML = '';

    const transaction = db.transaction(notesObjectStoreKey, 'readonly');
    const objectStore = transaction.objectStore(notesObjectStoreKey);
    const request = objectStore.getAll();

    request.onsuccess = ()=> {
        const notes = request.result;

        notes.forEach((note, index) => {
            console.log(note)
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';

            if (note.type === 'insight') {
                noteDiv.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <h5 class="mb-0">${note.title}</h5>
                      <small class="note-date">${note.date}</small>
                      <button class="btn btn-sm btn-danger ms-2" onclick="removeNote(${note.noteId})">X</button>
                    </div>
                    <div>${note.content}</div>`;
            } else {
                noteDiv.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <h5 class="mb-0">${note.title}</h5>
                      <small class="note-date">${note.date}</small>
                      <button class="btn btn-sm btn-danger ms-2" onclick="removeNote(${note.noteId})">X</button>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <h5 class="mb-2">${note.amount} BTC</h5>
                      <h5 class="mb-2">${note.action}</h5>
                    </div>
                    <div>${note.content}</div>`;
            }

            document.getElementById('notesContainer').appendChild(noteDiv);
        });
    }
}

function addNote() {
    const type = document.querySelector('input[name="noteType"]:checked').value;
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    const amount = document.getElementById('noteAmount').value;
    const action = document.getElementById('noteAction').value;

    if (!title || !content) return;

    const note = {
        type,
        title,
        content,
        amount,
        action,
        date: new Date().toLocaleString()
    };

    onTypeChange()
    saveNote(note);
    renderNotes();
}

document.addEventListener('DOMContentLoaded', onTypeChange);