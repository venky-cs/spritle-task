import { useState } from "react";
import { db } from "../firebaseConfig";


let cors = 'https://cors-anywhere-venky.herokuapp.com/';
let key = "f7222436d420fd8"
let keyOne = "9cf5644e3337d40"
let keyTwo = "9fcf76aa5f77fa3"


const Blog = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");

  const [link, setLink] = useState("");

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
        <input type="file" onChange={getLink} />
        <p> {link} </p> <br />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <button disabled={!text || !message} onClick={createPost}>
          Post{" "}
        </button>{" "}
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
    console.log(a)
    const formData = new FormData();
    // formData.append('type', 'file')
    formData.append("image", a,a.name)
    fetch(`https://api.imgur.com/3/image`, {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${key}`,
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => {
        console.log(res)
        let img= res.data
        console.log(img)
      })
      .catch((err) => console.log(err));

    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", `https://api.imgur.com/3/upload.json`);
    // // Send authentication headers.
    // xhr.setRequestHeader("Authorization", "Client-ID 9fcf76aa5f77fa3");
    // // Send form data
    // xhr.send(formData);
  }
 
};

export default Blog;
