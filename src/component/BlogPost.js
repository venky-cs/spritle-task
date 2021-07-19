import { useState, useEffect, useContext } from "react"
import { useParams } from 'react-router-dom'
import ReactMarkdown from "react-markdown";
import ContentLoader from "react-content-loader";
import { db } from "../firebaseConfig";
import { saveContext } from '../context/SaveContext'
import Button from './Button'

function BlogPost() {
    const [blog, setBlog] = useState([]);
    const [select, setSelect] = useState();

    const value = useContext(saveContext)
    const [save, , setLoad] = value

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

                    <div key={index} className="card full">
                        <h2>{data.title}</h2>

                        <p>
                            <ReactMarkdown>{data.message}</ReactMarkdown>
                        </p>
                        <Button variant="google" className="save-btn" onClick={() => saveData(data)}>Save</Button>
                        <Button variant="google" className="save-btn" onClick={() => removeData(data)}>Remove</Button>
                    </div>
                </div>
            )
            ))}
    </div>;

    function saveData(data) {
        let a = JSON.parse(localStorage.getItem("save"))
        let b = a && a.length > 0 && a.every(a => a.title !== data.title)
        if(a &&a.length >0 &&b=== false){
            alert("Already Saved")
        }else{
        localStorage.setItem(
            'save',
            JSON.stringify([
                ...save,
                { title: data.title, message: data.message, },
            ])
        );
        setLoad(prevState => !prevState)
        }
    }

    function removeData(data) {
        let blog = JSON.parse(localStorage.getItem("save"))
        let a = blog && blog.length > 0 && blog.map(a => a)
        let b =Array(data.title)
        console.log(a)
        console.log(b)
        let remove =a.length > 0 && a.filter(item => !b.includes(item.title))
        console.log(remove)
         localStorage.setItem(
            'save',
            JSON.stringify(
                remove
            )
        );
        setLoad(prevState => !prevState)
    }
}

export default BlogPost