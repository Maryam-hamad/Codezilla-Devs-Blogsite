import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../api/Api";
import "./Createblog.css";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    imageUrl: null,
  });

  const [contentLength, setContentLength] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Load existing post
  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await getPostById(id);

        setForm({
          title: res.data.title,
          subtitle: res.data.subtitle,
          content: res.data.content,
          imageUrl: null, // keep null unless new file selected
        });

        setContentLength(res.data.content.length);
        setImagePreview(res.data.image); // existing image
      } catch (err) {
        alert("Failed to load post");
      }
    };

    loadPost();
  }, [id]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "content") setContentLength(value.length);
  };

  // 🔹 Handle image change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({ ...form, imageUrl: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const hidePreview = () => {
    setImagePreview(null);
    setForm({ ...form, imageUrl: null });
  };

  // 🔹 Handle update submit
  const updateHandler = async (e) => {
    e.preventDefault();

    if (form.content.length < 500) {
      alert("Content must be at least 500 characters");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("content", form.content);

      if (form.imageUrl) {
        formData.append("image", form.imageUrl);
      }

      await updatePost(id, formData);

      alert("Post updated successfully!");
      navigate("/library");

    } catch (err) {
      alert("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-post-container">
      <div className="blogpost-form">
        <form onSubmit={updateHandler}>
          <h1>Edit Post</h1>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
          />

          <textarea
            name="content"
            rows={10}
            minLength={500}
            maxLength={10000}
            value={form.content}
            onChange={handleChange}
            required
          />

          <p className="text-sm text-gray-500">
            {contentLength} / 10000 characters
          </p>

          <label htmlFor="imageUpload" className="file-label">
            Change picture
          </label>

          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />

          {imagePreview && (
            <div className="preview-container">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "200px", marginTop: "10px" }}
              />
              <button
                type="button"
                className="cancel-button"
                onClick={hidePreview}
              >
                x
              </button>
            </div>
          )}

          <div>
            <button type="submit">
              {loading ? "Updating..." : "UPDATE POST"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditPost;
