export class ResetManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const resetBtn = document.getElementById('reset-all-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.confirmReset());
        }
    }

    confirmReset() {
        const confirmed = confirm(
            ' ATTENTION !\n\n' +
            'Êtes-vous sûr de vouloir tout réinitialiser ?\n\n' +
            'Cette action va :\n' +
            '• Décocher toutes les cases\n' +
            '• Vider toutes les notes\n' +
            '• Supprimer toutes les données sauvegardées\n\n' +
            'Cette action est irréversible !'
        );

        if (confirmed) {
            this.performReset();
        }
    }

    performReset() {
        console.log('Réinitialisation complète de la checklist...');

        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        const textareas = document.querySelectorAll('.checklist textarea');
        textareas.forEach(textarea => {
            textarea.value = '';
        });

        const projectNameInput = document.getElementById('project-name');
        if (projectNameInput) {
            projectNameInput.value = '';
        }

        localStorage.removeItem('checklist-progress');
        localStorage.removeItem('checklist-notes');
        localStorage.removeItem('checklist-project-name');

        this.updateProgress();

        this.showResetConfirmation();

        console.log('Réinitialisation terminée');
    }

    updateProgress() {

        document.dispatchEvent(new CustomEvent('checklist-updated'));
        

        const progressManager = window.app?.progressManager;
        if (progressManager) {
            progressManager.updateProgress();
        }
    }

    showResetConfirmation() {
        const notification = document.createElement('div');
        notification.className = 'reset-notification';
        notification.innerHTML = `
            <div class="reset-notification-content">
                <span>Checklist réinitialisée avec succès !</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
} 