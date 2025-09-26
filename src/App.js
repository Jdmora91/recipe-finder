import React, { useState } from 'react';
import './App.css';
import { searchRecipes } from './recipeAPI.js';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    console.log('Searching for:', searchTerm);
    
    setLoading(true);
    const results = await searchRecipes(searchTerm);
    setRecipes(results);
    setLoading(false);
    console.log('Found recipes:', results);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Recipe Finder</h1>
        <p>Find delicious recipes with ingredients you have!</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search recipes (e.g., chicken, pasta, vegetables)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'searching...' : 'Search Recipes'}
          </button>
        </form>
      </header>

      <main className="results-container">
        {recipes.length > 0 && (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img src={recipe.image} alt={recipe.title}
                onError={(e) => { e.currentTarget.src = '/error img.webp'; }} />
                <h3>{recipe.title}</h3>
                <p>Ready in {recipe.readyInMinutes} minutes</p>
                </div>
            ))}
          </div>
        )}
        </main>
    </div>
  );
}

export default App;