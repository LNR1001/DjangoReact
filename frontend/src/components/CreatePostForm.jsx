import React, { useState } from 'react';
import api from '../api';

function CreatePostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [community, setCommunity] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/createpost/', {
        title,
        description,
        community,
      });
      console.log('Post created successfully:', response.data);
      // Call the parent component's callback
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="create-post-form">
      <h3>Create a New Post</h3>
      <form onSubmit={handleCreatePost}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Community (optional)</label>
          <input
            type="text"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;
