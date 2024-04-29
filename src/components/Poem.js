import React, { useState } from 'react';

// API endpoint for poems
const poemAPI = "http://localhost:8004/poems";

function Poem({ poem, removePoem, addToFavorites }) {
  // Destructure poem object to extract title, content, and author
  const { title, content, author } = poem;
  // State variable to track whether the poem is read
  const [isRead, setIsRead] = useState(false);

  // Function to handle deletion of poem
  function onDeleteClick(e) {
    e.preventDefault();
    // Send DELETE request to API to remove poem
    fetch(`${poemAPI}/${poem.id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Call removePoem function to remove poem from state
        removePoem(poem);
      })
      .catch(error => console.error('Error deleting poem:', error));
  }

  return (
    <div>
      {/* Display poem title */}
      <h3>{title}</h3>
      {/* Display poem content */}
      <p>{content}</p>
      {/* Display poem author */}
      <p>
        <strong>- By {author}</strong>
      </p>
      {/* Button to mark the poem as read/unread */}
      <button onClick={() => setIsRead(!isRead)}>
        Mark as {isRead ? "unread" : "read"}
      </button>
      {/* Button to delete the poem */}
      <button onClick={onDeleteClick}>
        Delete
      </button>
      {/* Button to add/remove poem from favorites */}
      <button onClick={() => addToFavorites(poem)}>
        {poem.isFavorite ? "Unfavorite" : "♥ Favorite"}
      </button>
    </div>
  );
}

export default Poem;
