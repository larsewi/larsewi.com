import { Post } from "./components/Post";
import { Footer } from "./components/Footer";
import { posts } from "./posts";

function App() {
  return (
    <div className="content">
      {posts.map((post) => (
        <Post key={post.slug} title={post.title} body={post.body} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
