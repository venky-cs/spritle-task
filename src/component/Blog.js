import { useState } from "react";
import { db } from "../firebaseConfig";
import Button from './Button'
import axios from 'axios'
require('dotenv').config();
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

      <input type="file" onChange={getLink} accept="image/*" />
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

    let formData = new FormData()
    let image = e.target.files[0]
    formData.append("image", image)


    axios({
      method: "post",
      url: `https://cors-anywhere-venky.herokuapp.com/https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGDD}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })

      .then(res => {
        setLink(res.data.data.url);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

};

export default Blog;
