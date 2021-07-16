import { useState, useEffect,useContext } from "react"
import { useParams } from 'react-router-dom'
import ReactMarkdown from "react-markdown";
import ContentLoader from "react-content-loader";
import { db } from "../firebaseConfig";
import { Link } from 'react-router-dom'
import {saveContext} from '../context/SaveContext'


function BlogPost() {
    const [blog, setBlog] = useState([]);
    const [select, setSelect] = useState();

    const value = useContext(saveContext)
    const [,setSave] = value

    let { slug } = useParams();
    slug = JSON.stringify(slug.slice(1))


    useEffect(() => {
        db.collection("post")
            .get()
            .then((snap) => {
                let datas = [];
                snap.forEach((doc) => {
                    const data = doc.data();
                    datas.push(data);
                });
                setBlog(datas);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        // console.log(slug)
        setSelect(blog.filter(data => data.title === JSON.parse(slug)))
    }, [blog, slug])

    return <div>
        {!select ? (
            <ContentLoader viewBox="0 0 820 450" height={450} width={820}>
                <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
                <rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
                <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
                <rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
                <rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
                <rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
            </ContentLoader>
        ) : (
            select.map((data, index) => (
                <div className="select">
                    <div className="btn">
                    <Link to="/" className="select-btn">Home</Link>
                        {/* <button className="save-btn" onClick={() => setSave(localStorage.setItem("store", [localStorage.getItem('store'),data.title,data.message]))}>Save</button> */}
                        <button className="save-btn" onClick={() => setSave(prevState => [...prevState,{title:data.title,message:data.message}])}>Save</button>
                        {/* <button className="save-btn" onClick={(prevState) => setSave(localStorage.setItem("store", JSON.stringify([{title:data.title,message:data.message}])))}>Save</button> */}
                    </div>
                    <div key={index} className="card full">
                        <h2>{data.title}</h2>
                        <p>
                            <ReactMarkdown>{data.message}</ReactMarkdown>
                        </p>
                    </div>
                </div>
            )
            ))}
    </div>;
}

export default BlogPost