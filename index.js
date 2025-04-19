if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(function() {
            console.log('Service Worker zarejestrowany poprawnie.');
        })
        .catch(function(error) {
            console.error('Błąd podczas rejestracji Service Workera:', error);
        });
}

// Auth logic
const isLoggedIn = () => {
    return localStorage.getItem('loggedIn') === 'true';
};

const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // For the purpose of the task assuming only 2 users were created
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userId', '1');
        showDashboard();
    } else if (username === 'firstUser' && password === 'firstUser') {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userId', '2');
        showDashboard();
    } else {
        alert('Incorrect username or password');
    }
};

const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
    showLoginPage();
};

const showLoginPage = () => {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
};

const showDashboard = () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    renderNotes()
};

window.onload = () => {
    if (isLoggedIn()) {
        showDashboard();
    } else {
        showLoginPage();
    }
};

// Note logic
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    let allNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const currentUser = getCurrentUser();
    return allNotes.filter((note) => note.userId === currentUser)
}

function renderNotes() {
    document.getElementById('notesContainer').innerHTML = '';
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
        document.getElementById('notesContainer').appendChild(noteDiv);
    });
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes();
}

function getCurrentUser() {
    return localStorage.getItem('userId');
}

function addNote() {
    const titleElement = document.getElementById('noteTitle');
    const contentElement= document.getElementById('noteContent');

    const title = titleElement.value.trim();
    const content = contentElement.value.trim();
    if (!title || !content) return;

    const notes = getNotes();
    notes.push({
        title,
        content,
        userId: getCurrentUser(),
        date: new Date().toLocaleString()
    });
    saveNotes(notes);
    renderNotes();
    titleElement.value = ''
    contentElement.value = ''
}

// Load notes on page load
document.addEventListener('DOMContentLoaded', renderNotes);