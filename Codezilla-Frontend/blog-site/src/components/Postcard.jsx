import React from "react";
import "./Postcard.css";
import { Link } from "react-router-dom";

function Postcard({ post }) {
  return (
    <Link to={`/posts/${post._id}`} className="card-link">
      <div className="card">

       
        <div className="profile">
          <div className="avatar">
            {post.author?.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.username}
              />
            ) : (
              <span className="avatar-alt">
                {post.author?.username?.charAt(0).toUpperCase() || "?"}
              </span>
            )}
          </div>

          <div className="user-name">
            {post.author?.username || "Anonymous"}
          </div>
        </div>

        {/* POST BODY */}
        <div className="post-container">
          <div className="post-details">
            <div className="title">{post.title}</div>
            <div className="subtitle">{post.subtitle}</div>
            <div className="date">
              {new Date(post.createdAt).toDateString()}
            </div>

          </div>
          <div>
            {post.imageUrl && (
            <div className="post-image">
              <img src={post.imageUrl} alt={post.title} />
            </div>
          )}


          </div>

          
         
        </div>
      </div>
    </Link>
  );
}

export default Postcard;
