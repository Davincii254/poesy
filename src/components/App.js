import React, { useState, useEffect } from 'react';
import PoemsContainer from "./PoemsContainer";
import NewPoemForm from "./NewPoemForm";

// API endpoint for poems
const poemAPI = "http://localhost:8004/poems";

function App() {
  // State variables
  const [poems, setPoems] = useState([]); // Array to store poems
  const [formVisible, setFormVisible] = useState(true); // Controls visibility of new poem form
  const [favoriteVisible, setFavoriteVisible] = useState(true); // Controls visibility of favorite poems

  // Filtered list of poems to display based on favorites visibility
  const poemsToDisplay = poems.filter((poem) => favoriteVisible || poem.isFavorite);

  // Fetch poems from API on component mount
  useEffect(() => {
    fetch(poemAPI)
      .then(res => res.json())
      .then(data => setPoems(data))
      .catch(error => console.error('Error fetching poems:', error));
  }, []);

  // Function to add a new poem
  function addPoem(newPoem) {
    setPoems([...poems, newPoem]);
  }

  // Function to remove a poem
  function removePoem(poemToRemove) {
    setPoems(poems.filter(poem => poem.id !== poemToRemove.id));
  }

  // Function to toggle poem favorite status
  function addToFavorites(favPoem) {
    setPoems(poems.map(poem => {
      return poem.id === favPoem.id ? { ...favPoem, isFavorite: !favPoem.isFavorite } : poem;
    }));
  }

  // Function to render the PoemsContainer component based on poemsToDisplay
  function renderPoemView() {
    if (poemsToDisplay.length === 0 && !favoriteVisible) {
      return (<h1>You have no favorites added</h1>);
    } else {
      return (
        <PoemsContainer 
          poems={poemsToDisplay} 
          removePoem={removePoem} 
          addToFavorites={addToFavorites}
        />
      );
    }
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Button to toggle visibility of new poem form */}
        <button onClick={() => setFormVisible(!formVisible)} >
          {formVisible ? 'Hide' : 'Show'} New Poem Form
        </button>
        {/* New poem form */}
        {formVisible && <NewPoemForm addPoem={addPoem} />}

        {/* Button to toggle visibility of favorite poems */}
        <button onClick={() => setFavoriteVisible(!favoriteVisible)} >
          {favoriteVisible ? 'Hide' : 'Show'} Favorite Poems
        </button>
      </div>

      {/* Render PoemsContainer */}
      {renderPoemView()}
    </div>
  );
}

export default App;
