# Mongolingo - Projet NoSQL DUT Info Vannes 2025

## Description
Mongolingo est une application web en React pour apprendre les requêtes MongoDB à travers des quiz interactifs, dans le contexte d’un tournoi VGC Pokémon (2 contre 2).

## Prérequis
- Ubuntu 22.04 ou supérieur
- Node.js (v18 ou supérieur)
- MongoDB (v6 ou supérieur)

## Installation
1. **Installer Node.js et npm** :
   ```
   sudo apt update
   sudo apt install -y nodejs npm
   ```

2. **Installer MongoDB** :
   ```
   sudo apt install -y mongodb
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

3. **Cloner le projet** :
   ```
   git clone <votre-repo-git> mongolingo
   cd mongolingo
   ```

4. **Installer les dépendances du backend** :
   ```
   cd backend
   npm install
   ```

5. **Installer les dépendances du frontend** :
   ```
   cd ../frontend
   npm install
   ```

6. **Importer les données dans MongoDB** :
   ```
   mongoimport --db tournoi --collection joueurs --file Data/joueurs.json --jsonArray
   mongoimport --db tournoi --collection duos --file Data/duos.json --jsonArray
   mongoimport --db tournoi --collection equipes --file Data/equipes.json --jsonArray
   mongoimport --db tournoi --collection jeux --file Data/jeux.json --jsonArray
   mongoimport --db tournoi --collection pokemons --file Data/pokemons.json --jsonArray
   ```

## Exécution
1. **Lancer le backend** :
   ```
   cd backend
   node server.js
   ```

2. **Lancer le frontend** :
   ```
   cd frontend
   npm start
   ```

3. Ouvrir l’application dans un navigateur : `http://localhost:3000`

## Fonctionnalités
- Quiz interactifs avec 30 requêtes MongoDB (simples à complexes).
- Import/export des données en JSON et BSON via l’interface.
- Explications des requêtes pour l’apprentissage.

## Vidéo de démonstration
[Lien vers la vidéo de démonstration de 2 minutes] : 
