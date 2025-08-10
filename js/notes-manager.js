export class NotesManager {
    constructor() {
        this.setupEventListeners();
        this.loadNotes();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('notes-toggle')) {
                this.toggleNotes(e.target);
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'TEXTAREA' && e.target.closest('label')) {
                this.saveNotes();
            }
        });
    }

    toggleNotes(button) {
        const targetId = button.dataset.target;
        const notesContent = document.getElementById(targetId);
        
        if (notesContent) {
            notesContent.classList.toggle('active');
            button.textContent = notesContent.classList.contains('active') ? '📝 Masquer' : '📝 Notes';
        }
    }

    saveNotes() {
        const notes = {};
        document.querySelectorAll('.checklist li label textarea').forEach(textarea => {
            const checkbox = textarea.closest('label').querySelector('input[type="checkbox"]');
            if (checkbox) {
                notes[checkbox.id] = textarea.value;
            }
        });
        localStorage.setItem('checklist-notes', JSON.stringify(notes));
    }

    loadNotes() {
        const savedNotes = localStorage.getItem('checklist-notes');
        if (savedNotes) {
            const notes = JSON.parse(savedNotes);
            Object.entries(notes).forEach(([id, content]) => {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    const textarea = checkbox.closest('label').querySelector('textarea');
                    if (textarea) {
                        textarea.value = content;
                    }
                }
            });
        }
    }
} 