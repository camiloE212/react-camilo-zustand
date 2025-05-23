import { useEffect } from 'react';
import { usePostsStore } from '../store/postsStore';

const PostList = () => {
  const { 
    posts, 
    loading, 
    error, 
    fetchPosts, 
    deletePost, 
    setEditingPost 
  } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading && posts.length === 0) return <div className="loading">Cargando posts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="post-list">
      <h2> Publicaciones</h2>
      {posts.length === 0 && !loading ? (
        <p>No hay publicaciones disponibles</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div className="post-actions">
                <button 
                  onClick={() => setEditingPost(post)}
                  className="edit-button"
                >
                  Editar
                </button>
                <button 
                  onClick={() => deletePost(post.id)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;