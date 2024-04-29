import React from "react";
import Poem from "./Poem";

// Component responsible for rendering a list of poems
function PoemsContainer({ poems, removePoem, addToFavorites }) {
  return (
    <div className="poems-container">
      {/* Iterate over each poem in the 'poems' array */}
      {poems.map((poem) => {
        return (
          // Render the Poem component for each poem
          <Poem
            key={poem.id} // Unique key required for each list item
            poem={poem} // Pass the current poem object as a prop
            removePoem={removePoem} // Pass the removePoem function as a prop
            addToFavorites={addToFavorites} // Pass the addToFavorites function as a prop
          />
        );
      })}
    </div>
  );
}

export default PoemsContainer;
