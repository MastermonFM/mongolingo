const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');
const execPromise = util.promisify(exec);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/tournoi', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion MongoDB :'));
db.once('open', () => console.log('Connecté à MongoDB'));

// Exécuter une requête MongoDB
app.post('/api/query', async (req, res) => {
  try {
    const { query } = req.body;
    const client = new MongoClient('mongodb://localhost/tournoi');
    await client.connect();
    const database = client.db('tournoi');
    const result = await eval(`(async () => { return await db.${query}; })()`);
    await client.close();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export JSON
app.get('/api/export/json/:collection', async (req, res) => {
  const { collection } = req.params;
  try {
    await execPromise(`mongoexport --db tournoi --collection ${collection} --out ./data/${collection}.json --jsonArray`);
    res.download(`./data/${collection}.json`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Import JSON
app.post('/api/import/json/:collection', async (req, res) => {
  const { collection } = req.params;
  try {
    await execPromise(`mongoimport --db tournoi --collection ${collection} --file ./data/${collection}.json --jsonArray`);
    res.json({ message: `Collection ${collection} importée avec succès` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export BSON
app.get('/api/export/bson/:collection', async (req, res) => {
  const { collection } = req.params;
  try {
    await execPromise(`mongodump --db tournoi --collection ${collection} --out ./backup`);
    res.download(`./backup/tournoi/${collection}.bson`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Import BSON
app.post('/api/import/bson/:collection', async (req, res) => {
  const { collection } = req.params;
  try {
    await execPromise(`mongorestore --db tournoi --collection ${collection} ./backup/tournoi/${collection}.bson`);
    res.json({ message: `Collection ${collection} importée avec succès` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Serveur backend démarré sur http://localhost:5000'));
