import { useState } from "react";
import { db } from "../firebaseConfig";
import Button from './Button'

// let cors = 'https://cors-anywhere-venky.herokuapp.com/';
let key = "f7222436d420fd8"
// let keyOne = "9cf5644e3337d40"
// let keyTwo = "9fcf76aa5f77fa3"

// let imgur = "https://imgur.com/upload"


const Blog = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");

  // const [link, setLink] = useState("");

  return (
    <div className="blog">
      <h1 className="title"> Create Blog </h1>{" "}
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
          rows="15"
        ></textarea>{" "}
        <br />
        <iframe src="https://venky-cs.github.io/imageUpload/" title="description"></iframe>
        {/* <input type="file" onChange={getLink} /> */}
        {/* <p> {link} </p>  */}
        <div></div>
        <br />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <Button disabled={!text || !message} onClick={createPost}>
          Post{" "}
        </Button>{" "}
      </form>{" "}
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

  function getLink(e) {
    e.preventDefault();
    let a = e.target.files[0];
    const formData = new FormData();
    formData.append("image", a)
    fetch(`https://api.imgur.com/3/image`, {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${key}`,
        "content-type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => {
        console.log(res)
        let img= res.data
        console.log(img)
      })
      .catch((err) => console.log(err));

 
  }
 
};

export default Blog;
