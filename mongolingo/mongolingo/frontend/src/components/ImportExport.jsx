import React, { useState } from 'react';

const collections = ['joueurs', 'duos', 'equipes', 'jeux', 'pokemons'];

const ImportExport = () => {
  const [collection, setCollection] = useState(collections[0]);
  const [message, setMessage] = useState('');

  const handleExportJson = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/export/json/${collection}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${collection}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      setMessage(`JSON export of ${collection} successful`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleImportJson = async () => {
    try {
      await fetch(`http://localhost:5000/api/import/json/${collection}`, { method: 'POST' });
      setMessage(`JSON import of ${collection} successful`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleExportBson = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/export/bson/${collection}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${collection}.bson`;
      a.click();
      window.URL.revokeObjectURL(url);
      setMessage(`BSON export of ${collection} successful`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleImportBson = async () => {
    try {
      await fetch(`http://localhost:5000/api/import/bson/${collection}`, { method: 'POST' });
      setMessage(`BSON import of ${collection} successful`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Import/Export Data</h2>
      <select
        className="w-full p-2 border rounded mb-4"
        value={collection}
        onChange={(e) => setCollection(e.target.value)}
      >
        {collections.map((col) => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleExportJson}
        >
          Export JSON
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleImportJson}
        >
          Import JSON
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleExportBson}
        >
          Export BSON
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleImportBson}
        >
          Import BSON
        </button>
      </div>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default ImportExport;
