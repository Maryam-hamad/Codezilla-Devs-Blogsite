import React, { useState } from "react";
import { createPost } from "../api/Api";
import './Createblog.css'

function CreateBlog() {

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    imageUrl: null,
  });

  const [contentLength, setContentLength] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle form submit
  const postHandler = async (e) => {
    e.preventDefault();

    if (form.content.length < 500) {
      alert("Content must be at least 500 characters");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("content", form.content);
      if (form.imageUrl) formData.append("image", form.imageUrl);

      const res = await createPost(formData); 
      alert("Post created successfully!");
      

      // Reset form fields
      setForm({ title: "", subtitle: "", content: "", imageUrl: null });
      setContentLength(0);
      setImagePreview(null);

    } catch (err) {
     alert("Failed to create post");
    }
  };

  // Handle post input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "content") setContentLength(value.length);
  };

  // Handle image file input change
  const handleFileChange = (e) => {
    
    const file = e.target.files[0];
    setForm({ ...form, imageUrl: file });
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const hidePreview = () => {
    setImagePreview(false)
  }

  return (
    <div className="main-post-container">
      <div className="blogpost-form">
        <form onSubmit={postHandler}>
          <h1>Create Post</h1>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder="Share your ideas..."
            value={form.content}
            rows={10}
            minLength={500}
            maxLength={10000}
            onChange={handleChange}
            required
          />

          <p className="text-sm text-gray-500">
            {contentLength} / 10000 characters
          </p>

          <label htmlFor="imageUpload" className="file-label">
           Upload picture
         
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
              <button className="cancel-button" onClick={hidePreview}>x</button>
            </div>
         

          )}

         <div>
          <button type="submit">PUBLISH POST</button>

         </div>

          
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
