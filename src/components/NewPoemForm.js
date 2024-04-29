import React, { useState } from 'react';

// API endpoint for poems
const poemAPI = "http://localhost:8004/poems";

function NewPoemForm({ addPoem }) {
  // State variables to store form inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Send POST request to API with poem data
    fetch(poemAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        author,
      }),
    })
      .then((r) => r.json())
      .then((newPoem) => addPoem(newPoem)) // Call addPoem function with new poem data
      .catch(error => console.error('Error adding poem:', error));

    // Reset form inputs after submission
    setTitle("");
    setContent("");
    setAuthor("");
  }

  return (
    <form className="new-poem-form" onSubmit={handleSubmit}>
      {/* Input field for poem title */}
      <input 
        placeholder="Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Input field for poem author */}
      <input 
        placeholder="Author" 
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      {/* Textarea for poem content */}
      <textarea 
        placeholder="Write your masterpiece here..." 
        rows={10} 
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      {/* Submit button */}
      <input 
        type="submit" 
        value="Share your masterpiece" 
      />
    </form>
  );
}

export default NewPoemForm;
