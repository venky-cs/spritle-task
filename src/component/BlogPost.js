import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import ReactMarkdown from "react-markdown";
import ContentLoader from "react-content-loader";
import { db } from "../firebaseConfig";
import { Link } from 'react-router-dom'


function BlogPost() {
    const [blog, setBlog] = useState([]);
    const [select, setSelect] = useState();

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
                console.log(blog)
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        console.log(typeof slug)
        setSelect(blog.filter(data => data.title === JSON.parse(slug)))
        console.log(select)
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
                    <Link to="/" className="select-btn">Home</Link>
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