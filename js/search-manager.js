export class SearchManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        const clearBtn = document.getElementById('clear-search');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.performSearch(e.target.value));
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearSearch());
        }
    }

    performSearch(query) {
        const items = document.querySelectorAll('.checklist li');
        const normalizedQuery = query.toLowerCase().trim();

        items.forEach(item => {
            const description = item.querySelector('span:not(.demo-badge)');
            const notes = item.querySelector('label textarea');
            
            if (description) {
                const descriptionText = description.textContent.toLowerCase();
                const notesText = notes ? notes.value.toLowerCase() : '';
                const hasMatch = descriptionText.includes(normalizedQuery) || 
                                notesText.includes(normalizedQuery);

                if (normalizedQuery === '' || hasMatch) {
                    item.classList.remove('search-hidden');
                    if (hasMatch && normalizedQuery !== '') {
                        item.classList.add('search-highlight');
                    } else {
                        item.classList.remove('search-highlight');
                    }
                } else {
                    item.classList.add('search-hidden');
                    item.classList.remove('search-highlight');
                }
            }
        });

        this.updateSearchResults(query);
    }

    clearSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
            this.performSearch('');
        }
    }

    updateSearchResults(query) {
        const visibleItems = document.querySelectorAll('.checklist li:not(.search-hidden)');
        const totalItems = document.querySelectorAll('.checklist li').length;
        
        console.log(`Recherche "${query}" : ${visibleItems.length}/${totalItems} résultats`);
    }
} 