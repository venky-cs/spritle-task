import { useState } from "react";
import { db } from "../firebaseConfig";

const Blog = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  return (
    <div className="blog">
      <h1 className="title">Create Blog</h1>
      <form>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Title"
        />
        <br />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          cols="30"
          rows="5"
        ></textarea>
        <br />

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />

        <button disabled={!text || !message} onClick={createPost}>
          Post
        </button>
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
