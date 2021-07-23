import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import ReactMarkdown from "react-markdown";
import ContentLoader from "react-content-loader";
import { db } from "../firebaseConfig";
import Button from './Button'

function BlogPost() {
    const [blog, setBlog] = useState([]);
    const [select, setSelect] = useState();


    let { slug } = useParams();
    slug = JSON.stringify(slug.slice(1))


    useEffect(() => {
        db.collection("post")
            .onSnapshot((snapshot) => {
                let datas = [];
                snapshot.forEach((doc) => {
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
                <div key={index} className="select">

                    <div key={index} className="card full">
                        <h2>{data.title}</h2>

                        <p>
                            <ReactMarkdown>{data.message}</ReactMarkdown>
                        </p>
                        {!data.isSaved ? <Button variant="google" className="save-btn" onClick={() => saveBlog(data)}>Save</Button>
                            : <Button variant="google" className="save-btn" onClick={() => saveBlog(data)}>Remove</Button>
                        }
                    </div>
                </div>
            )
            ))}
    </div>;

    function saveBlog(data) {
        db.collection("post").doc(data.id).update({ isSaved: !data.isSaved })
    }
}

export default BlogPost