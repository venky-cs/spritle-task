import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';
import { db } from "../firebaseConfig";

const MyBlog = ({user}) => {

    const [myBlog, setMyBlog] = useState()
    const [filtered, setFiltered] = useState([])


    useEffect(() => {
        db.collection("post")
            .get()
            .then((snap) => {
                let datas = [];
                snap.forEach((doc) => {
                    const data = doc.data();
                    datas.push(data);
                });
                setMyBlog(datas);
            })
            .catch((err) => console.log(err));

    }, []);

    useEffect(() => {
        myBlog && setFiltered(myBlog.filter((data) => data.author === user))
    }, [myBlog])
    return (
        <div className="save">
            <h2 className="title">My Blog</h2>
            <div className="box">
                {filtered &&
                    filtered.map((data, index) => (
                        <div key={index} className="card">
                            <Link to={"/blog/:" + data.title}>
                                <h2>{data.title}</h2>
                                <p>
                                    <ReactMarkdown>{data.message.substring(0, 250)}</ReactMarkdown>
                                </p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default MyBlog
