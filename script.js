// script.js

class NotesApp {
  constructor() {
    this.notes = this.loadNotes();
    this.currentNoteId = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showHomePage();
    this.renderNotes();
  }

  // Local Storage
  loadNotes() {
    const savedNotes = localStorage.getItem('thinkboard-notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  }

  saveNotes() {
    localStorage.setItem('thinkboard-notes', JSON.stringify(this.notes));
  }

  // Utility functions
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Toast Notifications
  showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';

    toast.innerHTML = `
      <div class="toast-content">
        <i class="toast-icon ${icon}"></i>
        <span class="toast-message">${message}</span>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // CRUD Operations
  createNote(title, content) {
    const newNote = {
      id: this.generateId(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.notes.unshift(newNote);
    this.saveNotes();
    this.showToast("Note created successfully!");
    this.showHomePage();
  }

  updateNote(noteId, title, content) {
    const noteIndex = this.notes.findIndex(n => n.id === noteId);

    if (noteIndex !== -1) {
      this.notes[noteIndex] = {
        ...this.notes[noteIndex],
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date().toISOString()
      };

      this.saveNotes();
      this.showToast("Note updated successfully!");
      this.showHomePage();
    }
  }

  deleteNote(noteId) {
    if (confirm("Are you sure you want to delete this note?")) {
      this.notes = this.notes.filter(n => n.id !== noteId);
      this.saveNotes();
      this.showToast("Note deleted successfully!");
      this.showHomePage();
    }
  }

  // Page Navigation
  showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
  }

  showHomePage() {
    this.showPage('homePage');
    this.renderNotes();
  }

  showCreatePage() {
    this.showPage('createPage');
    this.clearCreateForm();
  }

  showNoteDetailPage(noteId) {
    this.currentNoteId = noteId;
    const note = this.notes.find(n => n.id === noteId);

    if (note) {
      document.getElementById('editNoteTitle').value = note.title;
      document.getElementById('editNoteContent').value = note.content;
      this.showPage('noteDetailPage');
    }
  }

  // Form Handling
  clearCreateForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
  }

  // Event Listeners
  setupEventListeners() {
    document.getElementById('createNoteForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleCreateNote();
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
      this.handleSaveNote();
    });
  }

  // Form Submission Handlers
  handleCreateNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (!title.trim() || !content.trim()) {
      this.showToast("Please fill in all fields!", "error");
      return;
    }

    this.createNote(title, content);
  }

  handleSaveNote() {
    if (!this.currentNoteId) return;

    const title = document.getElementById('editNoteTitle').value;
    const content = document.getElementById('editNoteContent').value;

    if (!title.trim() || !content.trim()) {
      this.showToast("Please enter a title and content!", "error");
      return;
    }

    this.updateNote(this.currentNoteId, title, content);
  }

  deleteCurrentNote() {
    if (this.currentNoteId) {
      this.deleteNote(this.currentNoteId);
    }
  }

  // Note rendering will be added in the next step
}

// Global functions
function showHomePage() {
  app.showHomePage();
}

function showCreatePage() {
  app.showCreatePage();
}

function deleteCurrentNote() {
  app.deleteCurrentNote();
}

let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new NotesApp();
});
