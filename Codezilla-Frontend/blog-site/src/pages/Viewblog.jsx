import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/Api";
import './Viewblog.css'

function ViewBlog() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getPostById(id);
      setPost(res.data);
    }
    load();
  }, [id]);

  if (!post) return <p className="loading">Loading post...</p>;

  return (
    <div className="post-page">
  <article className="post-article">

    <h1 className="post-title">{post.title}</h1>
    <p className="post-subtitle">{post.subtitle}</p>

    <div className="post-meta">
      <div className="author-avatar">
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
      <div>
        <p className="author-name">{post.author?.username}</p>
        <p className="post-date">
          {new Date(post.createdAt).toDateString()}
        </p>
      </div>
    </div>

    {post.imageUrl && (
      <img className="post-hero" src={post.imageUrl} alt="" />
    )}

    <div className="post-content">
      {post.content.split("\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>

  </article>
</div>

  );
}

export default ViewBlog;
