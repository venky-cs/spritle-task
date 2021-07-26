import { useState,useEffect } from "react";
import { db } from "../firebaseConfig";
import { useParams,useHistory} from 'react-router-dom'
import Button from './Button'
require('dotenv').config();


const Edit = () => {
    const [blog, setBlog] = useState([]);
    const [select, setSelect] = useState();
    const [text, setText] = useState("");
    const [post, setPost] = useState("");

    let { slug } = useParams();
    slug = JSON.stringify(slug.slice(1))

    const history = useHistory();
    const goToHome = () => history.push(`/home`);

    useEffect(() => {
        db.collection("post")
            .get()
            .then((snap) => {
                let datas = [];
                snap.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id
                    datas.push({ ...data, id: id });
                });
                setBlog(datas);
            }, (error) => {
                console.log(error)
            });
    }, []);

    useEffect(() => {
        setSelect(blog.filter(data => data.id === JSON.parse(slug)))
    }, [blog, slug])
    
    useEffect(() =>{
        setText(select && select.length > 0 && select[0].title)
        setPost(select && select.length > 0 && select[0].message)
    },[select])

    return (
        <form>
            {select && select.map(select => (
                <>
            <h1 className="title"> Edit Blog </h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Title"
            />
            <br />
            <textarea
                value={post}
                onChange={(e) => setPost(e.target.value)}
                placeholder="Message"
                cols="30"
                rows="15"
            ></textarea>
            <br />

            <center>
                <Button  onClick={updatePost}>
                    Update Post
                </Button>
            </center>
            </>
        ))
    }
        </form>
    )

    function updatePost(e) {
        e.preventDefault();
        let id = JSON.parse(slug)
        let Heading = select && select.map(data => data.title)
        let Blog = select && select.map(data => data.message)
      
        if (text !== Heading){
        db.collection("post").doc(id).update({
             title: text,
        });
        }
        if (post !== Blog){
            db.collection("post").doc(id).update({
                message: post,
            });
        }
        setText("");
        setPost("");
        goToHome();
    }
}

export default Edit
