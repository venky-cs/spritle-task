import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';
import { db } from "../firebaseConfig";
import Masonry from 'react-masonry-css'

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

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 2,
        500: 1
    };

    return (
        <div className="save">
            <h2 className="title">My Blog</h2>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                {filtered &&
                    filtered.map((data, index) => (
                        <div key={index} className="card">
                            <Link to={"/blog/:" + data.title}>
                                <h2>{data.title}</h2>
                                <p>
                                    <ReactMarkdown>{data.message.substring(0, 450)}</ReactMarkdown>
                                </p>
                            </Link>
                        </div>
                    ))
                }
                </Masonry>
        </div>
    )

}

export default MyBlog
