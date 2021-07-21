import { useState } from "react";
import { db } from "../firebaseConfig";
import Button from './Button'
import { storage } from '../firebaseConfig'

const Blog = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");

  const [link, setLink] = useState("");

  return (

      <form>
      <h1 className="title"> Create Blog </h1>{" "}
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
          rows="15"
        ></textarea>{" "}
        <br />
        {/* <iframe src="https://venky-cs.github.io/imageUpload/" title="description"></iframe> */}
        <input type="file" onChange={getLink} />
        <p> {link} </p> 
        <div></div>
        <br />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <Button disabled={!text || !message} onClick={createPost}>
          Post
        </Button>
      </form>
 
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

  function getLink(e) {
    e.preventDefault();
    const uploadData = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0])
    uploadData.on("state_changed", snapshot => {},error => {console.log(error)},() => {
      storage.ref("images").child(e.target.files[0].name).getDownloadURL().then(url => setLink(url))
    })
  }
 
};

export default Blog;
