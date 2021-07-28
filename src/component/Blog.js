import { useState} from "react";
import { db } from "../firebaseConfig";
import Button from './Button'
import axios from 'axios'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
require('dotenv').config();
const Blog = ({ user, pic }) => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const [load, setLoad] = useState(false)
  const [status, setStatus] = useState("")

  const [link, setLink] = useState("");

  const history = useHistory();
  const goToHome = () => history.push(`/home`);


  return (

    <form>
      <Toaster position="top-right"
        reverseOrder={false} />
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
      <h3> Image Uploader</h3>
      <br />
      <div className="img-upload">
        <div className="Neon Neon-theme-dragdropbox">
          <input type="file" onChange={getLink} accept="image/*" />
          <div className="Neon-input-dragDrop">
            <div className="Neon-input-inner">
              <div className="Neon-input-icon">
                <i className="fa fa-file-image-o"></i>
              </div>
              <div className="Neon-input-text">
                <h3>Drag&amp;Drop files here</h3>
                <span style={{ display: "inline-block", margin: "15px 0" }}>or</span>
              </div>
              <p className="Neon-input-choose-btn blue">Browse Files</p>
            </div>
          </div>
        </div>
        {link && <img src={link} alt="preview" />}
      </div>
      <center>
        {load ? <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        /> :
          <>
            {link && <>
              <input className="copy-input" value={link} readOnly />
              <button className="copy-btn" onClick={copy}><i className="far fa-copy"></i></button>
              <p>{status}</p>
            </>}
          </>
        }
      </center>
      <div></div>
      <br />
      <center>

        <Button onClick={createPost}>
          Post
        </Button>
      </center>
    </form>

  );

  function createPost(e) {
    e.preventDefault();
    if (text && message) {
      db.collection("post").add({
        title: text,
        author: user,
        message: message,
        isSaved: false,
        isSelect: false,
        created: Math.floor(Date.now() / 1000),
        profile: pic,
      });
      toast.success("Done")
      setText("");
      setMessage("");
      goToHome()
    } else {
      toast.error("Can't add empty Post")
    }
  }

  function getLink(e) {
    e.preventDefault();
    setLoad(true)
    setStatus("")
    setLink("")

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
        setLoad(false)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function copy(e) {
    e.preventDefault()
    let copy = link
    navigator.clipboard.writeText(copy)
    const successful = document.execCommand('copy');
    if (successful) {
      setStatus("Copied!")
    } else {
      setStatus("Unable to copy!")
    }
    console.log(status)
  }

};

export default Blog;
