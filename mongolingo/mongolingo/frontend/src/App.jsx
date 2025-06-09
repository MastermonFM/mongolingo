import React, { useState } from 'react';
import Quiz from './components/Quiz';
import ImportExport from './components/ImportExport';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('quiz');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Mongolingo - Apprenez MongoDB</h1>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'quiz' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'import-export' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('import-export')}
        >
          Import/Export
        </button>
      </div>
      {activeTab === 'quiz' ? <Quiz /> : <ImportExport />}
    </div>
  );
};

export default App;
