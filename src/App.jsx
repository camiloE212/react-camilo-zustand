import PostList from "./components/PostList"
import PostForm from "./components/PostForm"
import { usePostsStore } from "./store/postsStore"

function App() {
  const { loading } = usePostsStore()

  return (
    <div className="app">
      <header>
        <h1>Gestor camilo espinosa</h1>
      </header>
      <main>
        <PostForm />
          {loading && <div className="loading-indicator">Procesando...</div>}
        <PostList />
      </main>
    </div>
  )
}

export default App
