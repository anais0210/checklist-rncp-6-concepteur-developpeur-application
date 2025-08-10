export class ProgressManager {
    constructor() {
        this.loadProgress();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateProgress();
                this.saveProgress();
            });
        });
    }

    calculateProgressByBadge(badgeCategoryKey) {
        const items = document.querySelectorAll(`.checklist li`);
        let total = 0;
        let checked = 0;

        items.forEach(item => {
            const badge = item.querySelector('.demo-badge');
            if (badge && (badge.dataset.category || '').toLowerCase() === badgeCategoryKey.toLowerCase()) {
                total++;
                const checkbox = item.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox.checked) {
                    checked++;
                }
            }
        });

        return total > 0 ? Math.round((checked / total) * 100) : 0;
    }

    updateProgress() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const total = checkboxes.length;
        const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage = Math.round((checked / total) * 100);

        document.getElementById('progress-fill').style.width = `${percentage}%`;
        document.getElementById('progress-text').textContent = `${percentage}%`;

        const bc01 = this.calculateProgressByBadge('bc01');
        const bc02 = this.calculateProgressByBadge('bc02');
        const bc03 = this.calculateProgressByBadge('bc03');
        const dossierPercentage = this.calculateProgressByBadge('dossier');
        const optionnelPercentage = this.calculateProgressByBadge('optionnel');

        document.getElementById('bc01-text').textContent = `${bc01}%`;
        document.getElementById('bc02-text').textContent = `${bc02}%`;
        document.getElementById('bc03-text').textContent = `${bc03}%`;
        document.getElementById('dossier-text').textContent = `${dossierPercentage}%`;
        document.getElementById('optionnel-text').textContent = `${optionnelPercentage}%`;

        document.dispatchEvent(new CustomEvent('checklist-updated'));

        this.updateFilterLabels({ bc01, bc02, bc03, dossier: dossierPercentage, optionnel: optionnelPercentage });

        this.updateProgressSummaryLabels({ bc01, bc02, bc03, dossier: dossierPercentage, optionnel: optionnelPercentage });
    }

    updateFilterLabels(percentages) {
        const labels = {
            bc01: 'BC01 — Développer une application sécurisée',
            bc02: 'BC02 — Concevoir et développer une application sécurisée en couches',
            bc03: 'BC03 — Préparer le déploiement d\'une application sécurisée',
            dossier: 'Dossier projet',
            optionnel: 'Optionnel'
        };

        const setBtn = (key) => {
            const btn = document.querySelector(`.filter-btn[data-filter="${key}"]`);
            if (btn) btn.textContent = `${labels[key]} (${percentages[key]}%)`;
        };

        setBtn('bc01');
        setBtn('bc02');
        setBtn('bc03');
        setBtn('dossier');
        setBtn('optionnel');
    }

    updateProgressSummaryLabels(percentages) {
        const labels = {
            bc01: 'BC01 — Développer une application sécurisée',
            bc02: 'BC02 — Concevoir et développer une application sécurisée en couches',
            bc03: 'BC03 — Préparer le déploiement d\'une application sécurisée',
            dossier: 'Dossier projet',
            optionnel: 'Optionnel'
        };

        const setSummary = (key, id) => {
            const value = percentages[key] ?? 0;
            const span = document.getElementById(id);
            if (span && span.parentElement && span.parentElement.classList.contains('demo-badge-progress')) {
                span.parentElement.innerHTML = `${labels[key]}: <span id="${id}">${value}%</span>`;
            }
        };

        setSummary('bc01', 'bc01-text');
        setSummary('bc02', 'bc02-text');
        setSummary('bc03', 'bc03-text');
        setSummary('dossier', 'dossier-text');
        setSummary('optionnel', 'optionnel-text');
    }

    saveProgress() {
        const progress = {};
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            progress[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem('checklist-progress', JSON.stringify(progress));
    }

    loadProgress() {
        const savedProgress = localStorage.getItem('checklist-progress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            Object.entries(progress).forEach(([id, checked]) => {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    checkbox.checked = checked;
                }
            });
            this.updateProgress();
        }
    }
} 