import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById, updatePost } from '../api/Api'
import './Editpost.css'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const[subtitle,setSubtitle]=useState('')
  const [content,setContent]= useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadPost() {
      const res = await getPostById(id)
      setTitle(res.data.title)
      setSubtitle(res.data.subtitle)
      setContent(res.data.content)
      setPreview(res.data.image)
    }
    loadPost()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('subtitle', subtitle)
    formData.append('content', content)
    if (image) formData.append('image', image)

    try {
      await updatePost(id, formData)
      navigate('/library')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-post-container">
      <form className="blogpost-form" onSubmit={handleSubmit}>
        <h1>Edit Post</h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          value={subtitle}
          onChange={(e) => setTitle(e.target.value)}
        />


        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label className="file-label">
          Change Image
          <input
            type="file"
            hidden
            onChange={(e) => {
              setImage(e.target.files[0])
              setPreview(URL.createObjectURL(e.target.files[0]))
            }}
          />
        </label>

        {preview && <img src={preview} alt="preview" />}

        <button type="submit">
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  )
}

export default EditPost
