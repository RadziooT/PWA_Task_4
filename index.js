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

const apiUrl = 'http://localhost:3000/api/';

const login = async () => {
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch(apiUrl + 'user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const data = await response.json();

        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userId', data.userId);
        showDashboard();

        document.getElementById('usernameRegistration').value = '';
        document.getElementById('passwordRegistration').value = '';
    } catch (error) {
        alert('Incorrect username or password');
        console.error('Error during user registration:', error);
    }

};

const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
    showLoginPage();
};

const register = async () => {
    try {
        const username = document.getElementById('usernameRegistration').value;
        const password = document.getElementById('passwordRegistration').value;

        const response = await fetch(apiUrl + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(errorMessage);
            throw new Error(errorMessage);
        }

        document.getElementById('usernameRegistration').value = '';
        document.getElementById('passwordRegistration').value = '';
        alert('Registration successful, please login');
        showLoginPage()
    } catch (error) {
        console.error('Error during user registration:', error);
    }
};

const showLoginPage = () => {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
};

const showRegisterPage = () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
};

const showDashboard = () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'none';
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
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function getFilteredNotes() {
    let allNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const currentUser = getCurrentUser();
    return allNotes.filter((note) => note.userId === currentUser)
}

function renderNotes() {
    document.getElementById('notesContainer').innerHTML = '';
    const notes = getFilteredNotes();
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mb-0">${note.title}</h5>
            <small class="note-date">${note.date} + ${note.noteId}</small>
            <button class="btn btn-sm btn-danger ms-2" onclick="deleteNote(${index})">X</button>
          </div>
          <div>${note.content}</div>
        `;
        document.getElementById('notesContainer').appendChild(noteDiv);
    });
}

function deleteNote(index) {
    const filteredNotes = getFilteredNotes();
    const noteId = filteredNotes.at(index).noteId
    const notesToSave = getNotes().filter(note => note.noteId !== noteId)
    saveNotes(notesToSave);
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
        noteId: Math.random().toString(36).substring(2, 36),
        date: new Date().toLocaleString()
    });
    saveNotes(notes);
    renderNotes();
    titleElement.value = ''
    contentElement.value = ''
}

// Load notes on page load
document.addEventListener('DOMContentLoaded', renderNotes);