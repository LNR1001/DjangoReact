import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import '../styles/Home.css';
import '../styles/Profile.css';

function UserProfile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState([]);
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [community, setCommunity] = useState('');

    // Fetch profile and posts when the component mounts
    useEffect(() => {
        getProfile();
        getPosts();
    }, []);

    // Function to fetch profile data
    const getProfile = () => {
        api
            .get(`/api/profile/`)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setProfile(data);
            })
            .catch((err) => {
                console.error('Error fetching profile:', err);
                alert('Failed to fetch profile data.');
            });
    };

    // Function to fetch posts
    const getPosts = () => {
        api
            .get('/api/posts/') // Assuming this endpoint returns a list of posts
            .then((res) => {
                console.log("Posts fetched:", res.data);
                return res.data;
            })
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => {
                console.error('Error fetching posts:', err);
                alert('Failed to fetch posts.');
            });
    };

    // Function to handle post creation
    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/createpost/', {
                title,
                description,
                community,
            });
            console.log('Post created successfully:', response.data);
            // Add the new post to the posts state
            setPosts([...posts, response.data]);
            // Optionally reset the form
            setShowCreatePostForm(false);
            setTitle('');
            setDescription('');
            setCommunity('');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    // Handle navigation to edit profile
    const handleEdit = () => {
        navigate("/edit-profile");
    };

    // Handle navigation to logout
    const handleLogout = () => {
        navigate("/logout");
    };

    return (
        <div>
            <img className="back-img" src={profile.backgroundImage} alt="Background" />
            <div className="profile-card">
                <div className="card-upper">
                    <img className="pfp" src={profile.profilePicture} alt="Profile" />
                    <div className="names">
                        <p className="display-name">{profile.displayName}</p>
                        <p className="username">{profile.username}</p>
                    </div>
                    <div className="buttons">
                        <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
                        <button className="edit-button" type="button" onClick={handleEdit}>Edit</button>
                        <button className="create-post-button" type="button" onClick={() => setShowCreatePostForm(!showCreatePostForm)}>
                            {showCreatePostForm ? 'Cancel' : 'Create Post'}
                        </button>
                    </div>
                </div>
                <div className="bio">{profile.bio}</div>

                {showCreatePostForm && (
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
                )}

                {/* Display the list of posts */}
                <div className="posts">
                    <h3>Your Posts</h3>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="post">
                                <h4>{post.title}</h4>
                                <p>{post.description}</p>
                                <small>Community: {post.community || 'N/A'}</small>
                            </div>
                        ))
                    ) : (
                        <p>No posts yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;