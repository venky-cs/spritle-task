import { useState } from "react";
import { db } from "../firebaseConfig";


const Blog = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  return (
    <div className="blog">
      <h1>Blog</h1>
      <form>
        <h3>Title :</h3>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="title"
        />
        <br />
        <h3>Message :</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <h3>Author :</h3>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="title"
        />

        <button onClick={createPost}>Post</button>
      </form>
    </div>
  );

  function createPost(e) {
    e.preventDefault();
    db.collection("post").add({
      title: text,
      author: author,
      message: message,
    });
    setText("");
    setMessage("");
    setAuthor("");
  }
};

export default Blog;
