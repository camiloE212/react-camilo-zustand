import { useEffect } from 'react';
import { usePostsStore } from '../store/postsStore';

const PostForm = () => {
  const { 
    editingPost, 
    updatePost, 
    cancelEditing 
  } = usePostsStore();

  // No usamos useState local para el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      const formData = new FormData(e.target);
      const updatedPost = {
        title: formData.get('title'),
        body: formData.get('body')
      };
      updatePost(editingPost.id, updatedPost);
    }
  };

  if (!editingPost) return null;

  return (
    <div className="post-form">
      <h2>Editar Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={editingPost.title}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Contenido:</label>
          <textarea
            id="body"
            name="body"
            defaultValue={editingPost.body}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button">
            Guardar Cambios
          </button>
          <button 
            type="button" 
            onClick={cancelEditing}
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;