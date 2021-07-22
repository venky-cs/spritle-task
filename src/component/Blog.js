import { useState } from "react";
import { db } from "../firebaseConfig";
import Button from './Button'
import axios from 'axios'
require('dotenv').config();
const Blog = ({user}) => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

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

<div className="img-upload">
      <div className="Neon Neon-theme-dragdropbox">
      <input type="file" onChange={getLink} accept="image/*"  />
       <div className="Neon-input-dragDrop">
         <div className="Neon-input-inner">
           <div className="Neon-input-icon">
             <i className="fa fa-file-image-o"></i>
             </div>
             <div class="Neon-input-text">
               <h3>Drag&amp;Drop files here</h3> 
               <span style={{display:"inline-block",margin: "15px 0"}}>or</span>
               </div>
               <p class="Neon-input-choose-btn blue">Browse Files</p>
               </div>
               </div>
        </div>
        {link &&<img src={link} alt="preview" />}
      </div>
      <p> {link} </p>
      <div></div>
      <br />

      <Button disabled={!text || !message} onClick={createPost}>
        Post
      </Button>
    </form>

  );

  function createPost(e) {
    e.preventDefault();
    db.collection("post").add({
      title: text,
      author: user,
      message: message,
      isSaved:false
    });
    setText("");
    setMessage("");
  }

  function getLink(e) {
    e.preventDefault();

    let formData = new FormData()
    let image = e.target.files[0]
    formData.append("image", image)


    axios({
      method: "post",
      url: `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGDD}`,
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
