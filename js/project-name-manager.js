export class ProjectNameManager {
    constructor() {
        this.setupEventListeners();
        this.loadProjectName();
    }

    setupEventListeners() {
        const projectNameInput = document.getElementById('project-name');
        if (projectNameInput) {
            projectNameInput.addEventListener('input', () => {
                this.saveProjectName();
            });
        }
    }

    saveProjectName() {
        const projectNameInput = document.getElementById('project-name');
        if (projectNameInput) {
            const projectName = projectNameInput.value.trim();
            localStorage.setItem('checklist-project-name', projectName);
        }
    }

    loadProjectName() {
        const savedProjectName = localStorage.getItem('checklist-project-name');
        const projectNameInput = document.getElementById('project-name');
        if (projectNameInput && savedProjectName) {
            projectNameInput.value = savedProjectName;
        }
    }

    getProjectName() {
        const projectNameInput = document.getElementById('project-name');
        return projectNameInput ? projectNameInput.value.trim() : '';
    }

    getFormattedProjectName() {
        const projectName = this.getProjectName();
        if (!projectName) return '';
        
        return projectName
            .replace(/[<>:"/\\|?*]/g, '') 
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
} 