export class FilterManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => this.filterItems(button.dataset.filter));
        });
    }

    filterItems(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        document.querySelectorAll('.checklist li').forEach(item => {
            const badge = item.querySelector('.demo-badge');
            if (filter === 'all') {
                item.classList.remove('hidden');
            } else {
                const badgeText = badge ? badge.textContent.trim() : '';
                const badgeCat = badge ? (badge.dataset.category || '').toLowerCase() : '';
                let isVisible = false;

                if (['bc01','bc02','bc03','dossier','optionnel'].includes(filter)) {
                    isVisible = badgeCat === filter;
                } else {
                    isVisible = badgeText.toLowerCase() === filter.toLowerCase();
                }

                item.classList.toggle('hidden', !isVisible);
            }
        });
    }
} 