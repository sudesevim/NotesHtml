// script.js

// Notes Management Application
class NotesApp {
  constructor() {
    this.notes = this.loadNotes();
    this.currentNoteId = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showHomePage();
  }

  // Local Storage Management
  loadNotes() {
    const savedNotes = localStorage.getItem('thinkboard-notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  }

  saveNotes() {
    localStorage.setItem('thinkboard-notes', JSON.stringify(this.notes));
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Format date for display
  formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
  }

  showCreatePage() {
    this.showPage('createPage');
    this.clearCreateForm();
  }

  // Form Management
  clearCreateForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
  }

  // Event Listeners (placeholders for now)
  setupEventListeners() {
    // Create note form
    document.getElementById('createNoteForm').addEventListener('submit', (e) => {
      e.preventDefault();
      console.log("Attempting to create a new note...");
    });

    // Save note button
    document.getElementById('saveBtn')?.addEventListener('click', () => {
      console.log("Attempting to save a note...");
    });
  }
}

// Global functions for HTML onclick events
function showHomePage() {
  app.showHomePage();
}

function showCreatePage() {
  app.showCreatePage();
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new NotesApp();
});
