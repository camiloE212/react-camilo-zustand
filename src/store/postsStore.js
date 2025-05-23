import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const usePostsStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,
  editingPost: null,

  // Obtener todos los posts
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ posts: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Eliminar un post
  deletePost: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        posts: state.posts.filter(post => post.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Actualizar un post
  updatePost: async (id, updatedPost) => {
    set({ loading: true });
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedPost);
      set((state) => ({
        posts: state.posts.map(post => 
          post.id === id ? { ...post, ...response.data } : post
        ),
        loading: false,
        editingPost: null
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Preparar post para edición
  setEditingPost: (post) => set({ editingPost: post }),

  // Cancelar edición
  cancelEditing: () => set({ editingPost: null })
}));