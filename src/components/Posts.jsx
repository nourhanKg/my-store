// src/components/Posts.jsx
import React, { useState } from 'react';


function PostsList({ initialPosts, initialTotal}) {
  const [posts, setPosts] = useState(initialPosts);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(initialTotal / 8);

  const fetchPosts = async (newSkip) => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/posts?limit=${8}&skip=${newSkip}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.posts);
      setSkip(newSkip);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (skip + 8 < initialTotal) {
      fetchPosts(skip + 8);
    }
  };

  const handlePrevPage = () => {
    if (skip > 0) {
      fetchPosts(skip - 8);
    }
  };

  const currentPage = Math.floor(skip / 8) + 1;

  return (
    <div className="posts-container">
      {loading ? (
        <p className="text-center text-xl">Loading posts...</p>
      ) : (
        <div className="container post-grid" id="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-price">{post.body}</p>
              <div className="reactions">
                <span><span>Likes:</span> {post.reactions.likes}</span>
                <span><span>Dislikes:</span> {post.reactions.dislikes}</span>
                {/* <button className="small-button">Read More</button> */}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={skip === 0 || loading}>
          Previous
        </button>
        <span className="text-lg">Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={skip + 8 >= initialTotal || loading}>
          Next
        </button>
      </div>

    </div>
  );
}

export default PostsList;