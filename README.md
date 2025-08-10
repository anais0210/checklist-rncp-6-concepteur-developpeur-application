# Checklist RNCP6 CDA

Ce projet est une checklist pour le RNCP6 CDA. Il permet de suivre et valider les différentes étapes du parcours.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/anais0210/checklist-rncp6-cda.git
   cd checklist-rncp6-cda
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

## Utilisation

Pour lancer les linters :
```bash
npm run lint
```

## Linting

Le projet utilise :
- **HTMLHint** pour le linting HTML
- **Stylelint** pour le linting CSS

Les règles de linting sont configurées dans les fichiers `.htmlhintrc` et `.stylelintrc`.

## GitHub Actions

Les linters sont automatiquement exécutés à chaque push et pull request sur la branche `main` via GitHub Actions.
