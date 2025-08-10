import { ProgressManager } from './progress.js';
import { ExportManager } from './export.js';
import { FilterManager } from './filters.js';
import { NotesManager } from './notes-manager.js';
import { SearchManager } from './search-manager.js';
import { ResetManager } from './reset-manager.js';
import { ProjectNameManager } from './project-name-manager.js';

class App {
    constructor() {
        console.log('App initialisée');
        this.progressManager = new ProgressManager();
        this.exportManager = new ExportManager();
        this.filterManager = new FilterManager();
        // S'assurer qu'un champ de notes existe pour chaque critère
        this.ensureNotesFields();
        this.notesManager = new NotesManager();
        this.searchManager = new SearchManager();
        this.resetManager = new ResetManager();
        this.projectNameManager = new ProjectNameManager();
        this.normalizeBadgesToRNCP();
        this.loadVersion();
        
        window.app = this;
        
        document.addEventListener('checklist-updated', () => {
            this.progressManager.updateProgress();
        });
    }

    ensureNotesFields() {
        document.querySelectorAll('.checklist li label').forEach(label => {
            if (!label.querySelector('textarea')) {
                const textarea = document.createElement('textarea');
                textarea.placeholder = 'Ajoutez vos notes, liens, références...';
                textarea.setAttribute('aria-label', 'Notes');
                label.appendChild(textarea);
            }
        });
    }

    normalizeBadgesToRNCP() {
        const getRNCPLabelForElement = (el) => {
            const inBlock1 = el.closest('#block1');
            const inBlock2 = el.closest('#block2');
            const inBlock3 = el.closest('#block3');
            if (inBlock1) return 'bc01';
            if (inBlock2) return 'bc02';
            if (inBlock3) return 'bc03';
            return null;
        };

        const readableByKey = {
            bc01: 'BC01 — Développer une application sécurisée',
            bc02: 'BC02 — Concevoir et développer une application sécurisée en couches',
            bc03: 'BC03 — Préparer le déploiement d\'une application sécurisée',
            dossier: 'Dossier projet',
            optionnel: 'Optionnel'
        };

        document.querySelectorAll('.demo-badge').forEach(badge => {
            const current = (badge.textContent || '').trim();
            // Conserver Dossier/Optionnel avec data-category
            if (/^Optionnel$/i.test(current)) {
                badge.dataset.category = 'optionnel';
                badge.textContent = readableByKey.optionnel;
                return;
            }
            if (/^Dossier projet$/i.test(current)) {
                badge.dataset.category = 'dossier';
                badge.textContent = readableByKey.dossier;
                return;
            }

            const rncpKey = getRNCPLabelForElement(badge);
            if (rncpKey) {
                badge.dataset.category = rncpKey;
                badge.textContent = readableByKey[rncpKey];
            } else if (/^Démo\s*\d+$/i.test(current)) {
                // fallback
                badge.dataset.category = 'dossier';
                badge.textContent = readableByKey.dossier;
            }
        });

        // recalcul immédiat
        this.progressManager.updateProgress();
    }

    async loadVersion() {
        try {
            const response = await fetch('config.json');
            const config = await response.json();
            const versionElement = document.getElementById('version-number');
            if (versionElement) {
                versionElement.textContent = `v${config.version}`;
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la version:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, initialisation de l\'app');
    new App();
}); 